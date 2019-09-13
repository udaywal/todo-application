import { Component, OnInit } from '@angular/core';
import { Cookie } from 'ng2-cookies';
import { MainService } from 'src/app/main.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { SocketService } from 'src/app/socket.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [SocketService]
})

export class DashboardComponent implements OnInit {

  public authToken: any;
  public activeUserId: any;
  public activeUserName: string;

  public taskName: any;
  public isPrivate: boolean;
  public possibleCategories = ['Yes','No'];

  public userPrivateTasks: any = [];
  public userPublicTasks: any = [];

  public userList: any[] = [];
  public friendList: any[] = [];

  constructor(
    public router:Router, public toastr:ToastrService, 
    public mainService:MainService, public socketService:SocketService,
  ) { }

  ngOnInit() {
    this.authToken = Cookie.get('authToken');
    this.activeUserId = Cookie.get('activeUserId');
    this.activeUserName = Cookie.get('activeUserName');
    this.checkStatus();
  }

  public checkStatus: any = () => {
    if (Cookie.get('authToken') === undefined || Cookie.get('authToken') === '' || Cookie.get('authToken') === null) {
      this.router.navigate(['/login']);
    } else {
      this.getAllUserPrivateTasks();
      this.getAllUserPublicTasks();
      this.getAllUsers();
      this.getAllFriends();
      
      this.verifyUserConfirmation();
      this.getUpdatesFromUser();
    }
  }

  /*---------------------------------------------------------------------------------------------
  # User and Friend Functions (getting friends, users, requests)
  ----------------------------------------------------------------------------------------------*/

  public getAllUsers():any {
    this.mainService.getAllUsers().subscribe(
      (apiResponse) => {
        if(apiResponse.status === 200){
          this.userList = apiResponse.data
          //this.toastr.success(apiResponse.message)
        } else {
          this.toastr.error(apiResponse.message)
        }
      }, (err)=> {
        this.toastr.error('Something went wrong!')
        this.router.navigate(['/500'])
      }
    )
  }

  public getAllFriends():any {
    this.mainService.getAllFriends(this.activeUserId).subscribe(
      (apiResponse) => {
        if(apiResponse.status === 200){
          this.friendList = apiResponse.data
          //this.toastr.success(apiResponse.message)
        } else if (apiResponse.status === 404) {
          setTimeout(()=>{
            this.toastr.info(apiResponse.message)
          }, 4000)
        } else {
          this.toastr.error(apiResponse.message)
        }
      }, (err)=> {
        this.toastr.error('Something went wrong!')
        this.router.navigate(['/500'])
      }
    )
  }

  public sendFriendRequest(user):any {
    let friendRequestData = {
      senderId: this.activeUserId,
      senderName: this.activeUserName,
      receiverId: user.userId,
      receiverName: user.firstName + ' ' + user.lastName,
    }
    this.mainService.sendFriendRequest(friendRequestData).subscribe(
      (apiResponse) => {
        if (apiResponse.status === 200){
          this.toastr.success(apiResponse.message)
          let notificationData = {
            receiverId: apiResponse.data.receiverId,
            message: `${this.activeUserName} wants to be your friend. Accept request now!`
          }
          this.notifyFriendsUpdates(notificationData);
          this.getAllFriends();
        } else {
          this.toastr.error(apiResponse.message)
        }
      }, (err) => {
        this.toastr.error('Something went wrong!')
        this.router.navigate(['/500'])
      }
    )
  }

  public acceptRequest(friend):any {
    this.mainService.acceptRequest(friend.friendId).subscribe(
      (apiResponse) => {
        if (apiResponse.status === 200) {
          this.toastr.success(apiResponse.message)
          let notificationData = {
            receiverId: friend.senderId,
            message: `${this.activeUserName} accepted your friend request!`
          }
          this.notifyFriendsUpdates(notificationData);
          this.getAllFriends();
        } else {
          this.toastr.error(apiResponse.message)
        }
      }, (err) => {
        this.toastr.error('something went wrong!')
        this.router.navigate(['/500'])
      }
    )
  }

  public rejectRequest(friend):any {
    this.mainService.rejectRequest(friend.friendId).subscribe(
      (apiResponse) => {
        if (apiResponse.status === 200) {
          if(friend.senderId !== this.activeUserId){
          let notificationData = {
            receiverId: friend.senderId,
            message: `${this.activeUserName} rejected your friend request!`
          }
          this.notifyFriendsUpdates(notificationData);
        }
          this.toastr.success(apiResponse.message)
          this.getAllFriends()
        } else {
          this.toastr.error(apiResponse.message)
        }
      }, (err) => {
        this.toastr.error('something went wrong!')
        this.router.navigate(['/500'])
      }
    )
  }

  /*---------------------------------------------------------------------------------------------
  # Task Related Functions
  ----------------------------------------------------------------------------------------------*/

  public createTask():any {
    let taskData = {
      taskName: this.taskName,
      isPrivate: this.isPrivate,
      creatorId: this.activeUserId,
      createdBy: this.activeUserName
    }
    this.mainService.createTask(taskData).subscribe(
      (apiResponse) => {
        if (apiResponse.status === 200){
          this.toastr.success(apiResponse.message)
          window.document.getElementById('createTask').click();
          this.taskName = '';
          this.isPrivate = false;
          this.getAllUserPrivateTasks();
          this.getAllUserPublicTasks();
        } else {
          this.toastr.error(apiResponse.message)
        }
      }, (err) => {
        this.toastr.error('something went wrong!')
        this.router.navigate(['/500'])
      }
    )
  }

  public getAllUserPrivateTasks():any {
    this.mainService.getAllUserPrivateTasks(this.activeUserId).subscribe(
      (apiResponse) => {
        if (apiResponse.status === 200){
          //this.toastr.success(apiResponse.message)
          this.userPrivateTasks = apiResponse.data;
        } else {
          this.toastr.error(apiResponse.message)
        }
      }, (err) => {
        this.toastr.error('something went wrong!')
        this.router.navigate(['/500'])
      }
    )
  }

  public getAllUserPublicTasks():any {
    this.mainService.getAllUserPublicTasks(this.activeUserId).subscribe(
      (apiResponse) => {
        if (apiResponse.status === 200){
          //this.toastr.success(apiResponse.message)
          this.userPublicTasks = apiResponse.data;
        } else {
          this.toastr.error(apiResponse.message)
        }
      }, (err) => {
        this.toastr.error('something went wrong!')
        this.router.navigate(['/500'])
      }
    )
  }

  public getPublicTasksByUserId(userId):any {
    this.mainService.getAllUserPublicTasks(userId).subscribe(
      (apiResponse) => {
        if (apiResponse.status === 200){
          this.toastr.success(apiResponse.message)
          this.userPublicTasks = apiResponse.data;
        } else {
          this.toastr.error(apiResponse.message)
        }
      }, (err) => {
        this.toastr.error('something went wrong!')
        this.router.navigate(['/500'])
      }
    )
  }

  /*---------------------------------------------------------------------------------------------
  # Real Time Environment and Notification Functions
  ----------------------------------------------------------------------------------------------*/

  public verifyUserConfirmation = () => {
    this.socketService.verifyUser().subscribe(
      () => {
        this.socketService.setUser(this.authToken)
      }, (err) => {
        this.toastr.error("Some error occured")
      })
  }

  public notifyFriendsUpdates(notificationData) {
    this.socketService.notifyFriendsUpdates(notificationData)
  }

  public getUpdatesFromUser = () => {
    this.socketService.getUpdatesFromUser(this.activeUserId).subscribe(
      (notificationData)=>{
        this.getAllFriends();
        this.toastr.success(notificationData.message)
      }
    )
  }

  /*---------------------------------------------------------------------------------------------
  # Log out Function
  ----------------------------------------------------------------------------------------------*/

  public logout():any {
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
        this.router.navigate(['/500'])      }
    )
  }

}