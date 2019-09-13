import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class MainService {

  //public url = 'http://localhost:3000/api/v1';
  public url = 'http://api.todoish.online/api/v1';

  constructor(public http:HttpClient) { }

  /* ---------------     user api    ------------------ */

  public signupFunction(signupData):Observable<any> {
    return this.http.post(`${this.url}/signup`, signupData)
  }

  public loginFunction(loginData):Observable<any> {
    return this.http.post(`${this.url}/login`, loginData)
  }

  public logout(activeUserData):Observable<any> {
    return this.http.post(`${this.url}/logout`, activeUserData)
  }

  public forgotPassword(userData):Observable<any> {
    return this.http.post(`${this.url}/forgotpassword`, userData)
  }

  public resetPassword(userData):Observable<any> {
    return this.http.post(`${this.url}/resetpassword`, userData)
  }

  /* ---------------     friend api    ------------------ */

  public getAllUsers():Observable<any> {
    return this.http.get(`${this.url}/users/all`)
  }

  public sendFriendRequest(friendRequestData):Observable<any> {
    return this.http.post(`${this.url}/friendrequest`, friendRequestData)
  }

  public getAllFriends(activeUserId):Observable<any> {
    return this.http.get(`${this.url}/friends/all/${activeUserId}`)
  }

  public acceptRequest(friendId):Observable<any> {
    return this.http.get(`${this.url}/friendrequest/accept/${friendId}`)
  }

  public rejectRequest(friendId):Observable<any> {
    return this.http.get(`${this.url}/friendrequest/reject/${friendId}`)
  }

  /* ---------------     todo api    ------------------ */

  public getAllUserPrivateTasks(activeUserId):Observable<any> {
    return this.http.get(`${this.url}/tasks/all/private/${activeUserId}`)
  }

  public getAllUserPublicTasks(activeUserId):Observable<any> {
    return this.http.get(`${this.url}/tasks/all/public/${activeUserId}`)
  }

  public createTask(taskData):Observable<any> {
    return this.http.post(`${this.url}/tasks/create`, taskData)
  }

  public viewTask(taskId):Observable<any> {
    return this.http.get(`${this.url}/tasks/view/${taskId}`)
  }
  
  public createItem(itemData):Observable<any> {
    return this.http.post(`${this.url}/items/create`, itemData)
  }

  public viewItem(taskId):Observable<any> {
    return this.http.get(`${this.url}/items/view/${taskId}`)
  }

  public deleteItem(itemId):Observable<any> {
    return this.http.get(`${this.url}/items/delete/${itemId}`)
  }

  public deleteTask(taskId):Observable<any> {
    return this.http.get(`${this.url}/tasks/delete/${taskId}`)
  }

  /* ---------------     history api    ------------------ */

  public addHistory(historyData):Observable<any> {
    return this.http.post(`${this.url}/history/add`, historyData)
  }

  public getHistory(historyData):Observable<any> {
    return this.http.post(`${this.url}/history/get`, historyData)
  }

  public deleteHistory(historyData):Observable<any> {
    return this.http.post(`${this.url}/history/delete`, historyData)
  }
  
  /* ---------------      misc. api     ------------------ */

  public getCountries(): any {
    return this.http.get('./assets/countryNames.json');
  }

  public getCountryCodes(): any {
    return this.http.get('./assets/countryPhoneCodes.json');
  }

}
