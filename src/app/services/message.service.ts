import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Message } from '../models/message.model';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private baseUrl = 'http://localhost:8089/internify/messages'; // Remplacez par votre URL

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

  deleteMessage(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
