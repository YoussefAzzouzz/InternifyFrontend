import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Stomp } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private stompClient: any;
  private messagesSubject = new Subject<any>();
  private messageUpdatesSubject = new Subject<any>();
  private notificationsSubject = new Subject<any>();
  private userId!: number;

  constructor() {
    this.connect();
  }

  connect() {
    const socket = new SockJS('http://localhost:8089/internify/ws');
    this.stompClient = Stomp.over(() => new SockJS('http://localhost:8089/internify/ws'));
    this.stompClient.connect({}, (frame: any) => {
      this.stompClient.subscribe('/topic/conversations', (message: any) => {
        this.messagesSubject.next(JSON.parse(message.body));
      });
      this.stompClient.subscribe('/topic/messages', (message: any) => {
        this.messageUpdatesSubject.next(JSON.parse(message.body));
      });
      if (this.userId) { // Check if userId is set
        this.stompClient.subscribe('/topic/notifications/' + this.userId, (message: any) => { // Subscribe to notifications
          this.notificationsSubject.next(JSON.parse(message.body));
        });
      }
    });
  }

  getMessages() {
    return this.messagesSubject.asObservable();
  }

  getMessageUpdates() {
    return this.messageUpdatesSubject.asObservable();
  }

  emitMessageUpdate(message: any) {
    this.messageUpdatesSubject.next(message);
  }

  setUserId(userId: number) { // Method to set userId
    this.userId = userId;
  }

  getNotifications() {
    return this.notificationsSubject.asObservable(); // New method to get notifications
  }
}
