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
  private messageUpdatesSubject = new Subject<any>(); // Pour les mises à jour de messages

  constructor() {
    this.connect();
  }

  connect() {
    const socket = new SockJS('http://localhost:8089/internify/ws'); // Remplacez par votre URL
    this.stompClient = Stomp.over(() => new SockJS('http://localhost:8089/internify/ws'));
    this.stompClient.connect({}, (frame: any) => {
      this.stompClient.subscribe('/topic/conversations', (message: any) => {
        this.messagesSubject.next(JSON.parse(message.body));
      });
      this.stompClient.subscribe('/topic/messages', (message: any) => { // Souscription pour les messages
        this.messageUpdatesSubject.next(JSON.parse(message.body));
      });
    });
  }

  getMessages() {
    return this.messagesSubject.asObservable();
  }

  getMessageUpdates() {
    return this.messageUpdatesSubject.asObservable(); // Méthode pour obtenir les mises à jour de messages
  }
}
