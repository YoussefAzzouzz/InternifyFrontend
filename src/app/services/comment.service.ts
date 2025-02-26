import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment } from '../models/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private apiUrl = 'http://localhost:8011/piproj/Comment/';

  constructor(private http: HttpClient) {}

  getComments(): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.apiUrl}/Get-All-Comments`);
  }

  getCommentById(id: number): Observable<Comment> {
    return this.http.get<Comment>(`${this.apiUrl}/GetComment/${id}`);
  }

  addComment(comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(`${this.apiUrl}/Add-Comment`, comment);
  }

  updateComment(comment: Comment): Observable<Comment> {
    return this.http.put<Comment>(`${this.apiUrl}/Edit-Comment`, comment);
  }

  deleteComment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/Delete-Comment/${id}`);
  }

  addCommentToOffer(offerId: number, content: string): Observable<Comment> {
    // Append content as query parameter
    return this.http.put<Comment>(
      `http://localhost:8011/piproj/Comment/Add-Comment-Offer/${offerId}?content=${content}`,
      {}
    );
  }
}
