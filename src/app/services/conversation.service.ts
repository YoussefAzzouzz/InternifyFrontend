import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Conversation } from '../models/conversation.model';
import { Message } from '../models/message.model';

@Injectable({
  providedIn: 'root'
})
export class ConversationService {
  private baseUrl = 'http://localhost:8089/internify/conversations'; // Remplacez par votre URL

  constructor(private http: HttpClient) { }

  getConversations(userId: number): Observable<Conversation[]> {
    return this.http.get<Conversation[]>(`${this.baseUrl}/user/${userId}`);
  }

  createConversation(conversation: Conversation): Observable<Conversation> {
    return this.http.post<Conversation>(this.baseUrl, conversation);
  }

  deleteConversation(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  getMessagesByConversation(conversationId: number): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.baseUrl}/${conversationId}/messages`);
  }

  getConversationById(conversationId: number): Observable<Conversation> {
    return this.http.get<Conversation>(`${this.baseUrl}/${conversationId}`);
  }
}
