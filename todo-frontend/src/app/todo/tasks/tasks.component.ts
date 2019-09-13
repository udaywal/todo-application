import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MainService } from 'src/app/main.service';
import { Cookie } from 'ng2-cookies';
import { SocketService } from 'src/app/socket.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
  providers: [SocketService]
})
export class TasksComponent implements OnInit {

  public authToken: any;
  public activeUserId: any;
  public activeUserName: string;

  public taskId:any;
  public task:any;
  public taskName:string;
  public creatorId:any;

  public allItems:any = [];
  public itemName:string;

  public currentItemId: any;
  public deleteFromHistory: boolean = false;

  constructor(
    public router: Router, public mainService: MainService,
    public _route: ActivatedRoute, public toastr: ToastrService,
    public socketService:SocketService
  ) { }

  ngOnInit() {
    this.authToken = Cookie.get('authToken');
    this.activeUserId = Cookie.get('activeUserId');
    this.activeUserName = Cookie.get('activeUserName');
    this.taskId = this._route.snapshot.paramMap.get('taskId');
    this.checkStatus();
  }

  public checkStatus: any = () => {
    if (Cookie.get('authToken') === undefined || Cookie.get('authToken') === '' || Cookie.get('authToken') === null) {
      this.router.navigate(['/login']);
    } else {
      this.viewTask();
      this.viewItem();

      this.getUpdatesFromUser()
    }
  }

  /*---------------------------------------------------------------------------------------------
  # Task related Functions
  ----------------------------------------------------------------------------------------------*/

  public viewTask():any  {
    this.mainService.viewTask(this.taskId).subscribe(
      (apiResponse) => {
        if (apiResponse.status === 200){
          //this.toastr.success(apiResponse.message)
          this.task = apiResponse.data;
          this.taskName = apiResponse.data[0].taskName;
          this.creatorId = apiResponse.data[0].creatorId;
        } else {
          this.toastr.error(apiResponse.message)
        }
      }, (err) => {
        this.toastr.error('something went wrong!')
        setTimeout(()=>{
          this.router.navigate(['/dasboard'])
        }, 2000)
      }
    )
  }

  public deleteTask():any  {
    this.mainService.deleteTask(this.taskId).subscribe(
      (apiResponse) => {
        if (apiResponse.status === 200){
          this.toastr.success(apiResponse.message)
          if(this.creatorId !== this.activeUserId){
            let notificationData = {
              creatorId: this.creatorId,
              message: `${this.activeUserName} has deleted your task ${this.taskName}`
            }
            this.notifyCreatorAboutTask(notificationData);
          } else {}
          let historyData = {
            taskId: this.taskId
          }
          this.deleteHistory(historyData)
          setTimeout(()=>{
            this.router.navigate(['/dashboard'])
          }, 2000)
        } else {
          this.toastr.error(apiResponse.message)
        }
      }, (err) => {
        this.toastr.error('something went wrong!')
        setTimeout(()=>{
          this.router.navigate(['/dasboard'])
        }, 2000)
      }
    )
  }

  /*---------------------------------------------------------------------------------------------
  # Item Related Functions
  ----------------------------------------------------------------------------------------------*/

  public viewItem():any {
    this.mainService.viewItem(this.taskId).subscribe(
      (apiResponse) => {
        if (apiResponse.status === 200){
          //this.toastr.success(apiResponse.message)
          this.allItems = apiResponse.data
        } else {
          this.toastr.error(apiResponse.message)
        }
      }, (err) => {
        this.toastr.error('something went wrong!')
        setTimeout(()=>{
          this.router.navigate(['/dasboard'])
        }, 2000)
      }
    )
  }

  public createItem():any {
    let itemData = {
      parentId: this.taskId,
      itemName: this.itemName,
      itemCreatorId: this.activeUserId,
      itemCreatorBy: this.activeUserName
    }
    this.mainService.createItem(itemData).subscribe(
      (apiResponse) => {
        if (apiResponse.status === 200){
          this.toastr.success(apiResponse.message)

          if(this.creatorId !== this.activeUserId){
            let notificationData = {
              creatorId: this.creatorId,
              message: `${this.activeUserName} has added an item into your task ${this.taskName}`
            }
            this.notifyCreatorAboutTask(notificationData);
          } else {}

          let historyData: any = {
            taskId: this.taskId,
            key: 'Item Add',
            itemId: apiResponse.data.itemId
          }
          this.addHistory(historyData) 

          window.document.getElementById('createItem').click();
          this.itemName = '';
          this.viewItem();
        } else {
          this.toastr.error(apiResponse.message)
        }
      }, (err) => {
        this.toastr.error('something went wrong!')
        setTimeout(()=>{
          this.router.navigate(['/dasboard'])
        }, 2000)
      }
    )
  }

  public deleteItem(itemId):any {

    let historyData: any = {
      taskId: this.taskId,
      key: 'Item Delete',
      itemId: itemId
    }
    this.addHistory(historyData)
    
      this.mainService.deleteItem(itemId).subscribe(
        (apiResponse) => {
          if (apiResponse.status === 200){
            this.toastr.success(apiResponse.message)
            this.viewItem();
            if(this.creatorId !== this.activeUserId){
              let notificationData = {
                creatorId: this.creatorId,
                message: `${this.activeUserName} has deleted an item from your task ${this.taskName}`
              }
              this.notifyCreatorAboutTask(notificationData);
            } else {}
 
          } else {
            this.toastr.error(apiResponse.message)
          }
        }, (err) => {
          this.toastr.error('something went wrong!')
          setTimeout(()=>{
            this.router.navigate(['/dasboard'])
          }, 2000)
        }
      )

  }

  /*---------------------------------------------------------------------------------------------
  # History(Undo) Functions
  ----------------------------------------------------------------------------------------------*/

  public undo():any {
    let historyData = {
      taskId: this.taskId
    }
    this.getHistory(historyData)
  }

  public addHistory(historyData) {
    this.mainService.addHistory(historyData).subscribe(
      (apiResponse) => {
      if (apiResponse.status == 200) {
      } else {}
    })
  }

  public getHistory(historyData) {
    this.mainService.getHistory(historyData).subscribe((apiResponse) => {
      if (apiResponse.status == 200) {
        for (let i in apiResponse.data) {
          if (apiResponse.data[i].key == 'Item Delete') {
            this.createItemThroughHistory(apiResponse.data[i].itemValues[0])
          } else if (apiResponse.data[i].key == 'Item Add') {
            this.deleteItemThroughHistory(apiResponse.data[i].itemValues[0].itemId)
          } else {
            this.toastr.error("Something went wrong with undo!")
          }
        }
        let historyData = {
          taskId: this.taskId
        }
        this.deleteHistory(historyData)
        this.viewItem();
      } else if (apiResponse.status == 404) {
        this.toastr.info("Nothing Left to Change!")
      } else {
        this.toastr.error("Something went Wrong!")
      }
    })
  }

  public createItemThroughHistory(itemValues):any {
    let itemData = {
      parentId: itemValues.parentId,
      itemName: itemValues.itemName,
      itemCreatorId: itemValues.itemCreatorId,
      itemCreatorBy: itemValues.itemCreatorBy
    }
    this.mainService.createItem(itemData).subscribe(
      (apiResponse) => {
        if (apiResponse.status === 200){
          this.toastr.success(apiResponse.message)
        } else {
          this.toastr.error(apiResponse.message)
        }
      }, (err) => {
        this.toastr.error('something went wrong!')
        setTimeout(()=>{
          this.router.navigate(['/dasboard'])
        }, 2000)
      }
    )
  }

  public deleteItemThroughHistory(itemId):any {
    this.mainService.deleteItem(itemId).subscribe(
      (apiResponse) => {
        if (apiResponse.status === 200){
          this.toastr.success(apiResponse.message)
        } else {
          this.toastr.error(apiResponse.message)
        }
      }, (err) => {
        this.toastr.error('something went wrong!')
        setTimeout(()=>{
          this.router.navigate(['/dasboard'])
        }, 2000)
      }
    )
  }

  public deleteHistory(historyData):any {
    this.mainService.deleteHistory(historyData).subscribe(
      (apiResponse) => {
        if (apiResponse.status === 200){
          //this.toastr.success(apiResponse.message)
        } else {
          //this.toastr.error(apiResponse.message)
        }
      }, (err) => {
        this.toastr.error("Something went Wrong!")
      }
    )
  }

  /*---------------------------------------------------------------------------------------------
  # Real Time Environment and Notification Functions
  ----------------------------------------------------------------------------------------------*/

  public notifyCreatorAboutTask(notificationData) {
    this.socketService.notifyUpdates(notificationData)
  }

  public getUpdatesFromUser = () => {
    this.socketService.getUpdatesFromUser(this.activeUserId).subscribe(
      (notificationData)=>{
        this.viewTask();
        this.viewItem();
        this.toastr.success(notificationData.message)
      }
    )
  }

  /*---------------------------------------------------------------------------------------------
  # Log out Function
  ----------------------------------------------------------------------------------------------*/

  public logout () {
    let activeUserData = {
      activeUserId: this.activeUserId
    }
    this.mainService.logout(activeUserData).subscribe(
      (apiResponse) => {
        if (apiResponse.status === 200) {
          Cookie.delete('authToken');
          Cookie.delete('activeUserId');
          Cookie.delete('activeUserName');
          this.toastr.success(apiResponse.message)
          this.router.navigate(['/']);
        } else {
          this.toastr.error(apiResponse.message)
        }
      }, (err) => {
        this.toastr.error('something went wrong!')
        this.router.navigate(['/500'])
      }
    )
  }

}
