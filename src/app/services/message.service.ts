import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Message } from '../models/message.model';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private baseUrl = 'http://localhost:8093/internify/messages';

  constructor(private http: HttpClient) { }

  sendMessage(message: Message): Observable<Message> {
    return this.http.post<Message>(this.baseUrl, message);
  }

  getMessageById(id: number): Observable<Message> {
    return this.http.get<Message>(`${this.baseUrl}/${id}`);
  }

  updateMessage(id: number, newContent: string): Observable<Message> {
    return this.http.put<Message>(`${this.baseUrl}/${id}`, newContent);
  }

  deleteMessage(id: number): Observable<Message> {
    return this.http.put<Message>(`${this.baseUrl}/delete/${id}`,{});
  }

  updateMessageStatusToRead(messageId: number): Observable<Message> {
    return this.http.put<Message>(`${this.baseUrl}/${messageId}/status`,{});
  }

  sendMessageWithAttachment(message: Message, file: File, conversationId: number): Observable<Message> {
    const formData = new FormData();
    formData.append('message', JSON.stringify(message));
    formData.append('conversationId', conversationId.toString());
    formData.append('file', file);

    return this.http.post<Message>(`${this.baseUrl}/send-with-attachment`, formData);
  }

  pinMessage(messageId: number): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${messageId}/pin`, {});
  }

  getMessageStats(userId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/user/${userId}/message-stats`);
  }

  getSentMessageStats(userId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/user/${userId}/sent-message-stats`);
  }

  getReceivedMessageStats(userId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/user/${userId}/received-message-stats`);
  }

  getAllMessageStats(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/message-stats`);
  }
}
