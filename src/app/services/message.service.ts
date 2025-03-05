import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Message } from '../models/message.model';
import {Conversation} from "../models/conversation.model";

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

  updateMessageStatusToRead(messageId: number): Observable<Message> {
    return this.http.put<Message>(`${this.baseUrl}/${messageId}/status`,{});
  }

  sendMessageWithAttachment(message: Message, file: File, conversationId: number): Observable<Message> {
    const formData = new FormData();
    formData.append('message', JSON.stringify(message)); // Convert message to JSON string
    formData.append('conversationId', conversationId.toString()); // Append only the conversation ID
    formData.append('file', file); // Append the file

    return this.http.post<Message>(`${this.baseUrl}/send-with-attachment`, formData);
  }
}
