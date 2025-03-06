import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

export interface StatisticsResponse {

  totalDemands: number;

  demandsByField: number;

  demandsByStatus: number;

}

@Injectable({
  providedIn: 'root'
})
export class DemandService {
  private apiUrl = 'http://localhost:8089/internshipDemands/api/demands';
  private selectedDemand = new BehaviorSubject<any | null>(null);

  constructor(private http: HttpClient) {}

  getDemandById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getDemandById/${id}`);
  }
  getStatistics(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/statistics`);
  }
  getNearbyDemands(lat: number, lng: number, radius: number): Observable<any[]> {

    return this.http.get<any[]>(`${this.apiUrl}/nearby?lat=${lat}&lng=${lng}&radius=${radius}`);

  }

  getDemandStatistics(field?: string | null, status?: string | null): Observable<StatisticsResponse> {

    let params = new HttpParams();

    if (field) {

      params = params.set('field', field);

    }

    if (status) {

      params = params.set('status', status);

    }

    return this.http.get<StatisticsResponse>(`${this.apiUrl}/statistics`, { params });

  }
  // GET All Demands
  getAllDemands(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getAllDemands`);
  }
  searchDemandsByField(field: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/search?field=${field}`);
  }

  // CREATE Demand
  createDemand(demand: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/addDemand`, demand);
  }

  // UPDATE Demand
  updateDemand(id: number, demand: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/updateDemand/${id}`, demand);
  }

  // DELETE Demand
  deleteDemand(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/deleteDemand/${id}`);
  }

  // Manage Selected Demand
  setSelectedDemand(demand: any | null) {
    this.selectedDemand.next(demand);
  }

  getSelectedDemand(): Observable<any | null> {
    return this.selectedDemand.asObservable();
  }
}
