import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  //private url = 'http://localhost:3000';
  private url = 'http://api.todoish.online';
  
  private socket;

  constructor (public http:HttpClient) { 
    this.socket = io(this.url);
  }

  public verifyUser = () => {
    return Observable.create((observer)=>{
      this.socket.on('verify-user', (data)=>{
        observer.next(data)
      })
    })
  }

  public setUser = (authToken) => {
    this.socket.emit('set-user', authToken);
  }

  public listenAuthError = () => {
    return Observable.create((observer)=>{
      this.socket.on('auth-error', (data)=>{
        observer.next(data)
      })
    })
  }

  public notifyUpdates = (notificationData) => {
    this.socket.emit('notify-updates', notificationData);
  }

  public getUpdatesFromUser = (activeUserId) => {
    return Observable.create((observer)=>{
      this.socket.on(activeUserId, (notificationData)=>{
        observer.next(notificationData)
      })
    })
  }

  public notifyFriendsUpdates = (notificationData) => {
    this.socket.emit('notify-friends-updates', notificationData);
  }

  /*
  public onlineUserList = () => {
    return Observable.create((observer)=>{
      this.socket.on('online-user-list', (allOnlineUsers)=>{
        observer.next(allOnlineUsers)
      })
    })
  }
  */

  public disconnect = () => {
    return Observable.create((observer)=>{
      this.socket.on('disconnect', ()=>{
        observer.next()
      })
    })
  }

  public exitSocket = () => {
    this.socket.disconnect();
  }

  public disconnectedSocket = () => {
    this.socket.emit("disconnect", "");
  }

}
