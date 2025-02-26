import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Application } from '../models/application';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  private apiUrl = 'http://localhost:8011/piproj/applications';

  constructor(private http: HttpClient) {}

  getApplications(): Observable<Application[]> {
    return this.http.get<Application[]>(`${this.apiUrl}/Get-All-Applications`);
  }

  getApplicationById(id: number): Observable<Application> {
    return this.http.get<Application>(`${this.apiUrl}/GetApplication/${id}`);
  }

  addApplication(application: Application): Observable<Application> {
    return this.http.post<Application>(`${this.apiUrl}/Add-Application`, application);
  }

  updateApplication(application: Application): Observable<Application> {
    return this.http.put<Application>(`${this.apiUrl}/Edit-Application`, application);
  }

  deleteApplication(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/Delete-Application/${id}`);
  }

  applyForOffer(offerId: number, userId: number, cv: string, motivationLetter: string): Observable<Application> {
    return this.http.post<Application>(
      `${this.apiUrl}/ApplyForOffer/${offerId}/${userId}`,
      { cv, motivationLetter }
    );
  }
}
