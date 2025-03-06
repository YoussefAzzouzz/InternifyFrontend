import { Injectable } from '@angular/core';
import {map, Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Offer} from "../models/offer";

@Injectable({
  providedIn: 'root'
})
export class OfferService {

  private apiUrl = 'http://localhost:8011/piproj/offers/Get-All-Offers';

  constructor(private http: HttpClient) { }

  getOffers(): Observable<Offer[]> {
    return this.http.get<Offer[]>(this.apiUrl);
  }
  deleteOffer(id: number): Observable<void> {
    console.log(`Deleting offer with ID: ${id}`); // Debugging
    return this.http.delete<void>(`http://localhost:8011/piproj/offers/Delete-Offer/${id}`);
  }
  addOffer(offer: FormData): Observable<any> {
    return this.http.post<any>('http://localhost:8011/piproj/offers/Add-Offer', offer);
  }

  updateOffer(id: number, offer: FormData): Observable<any> {
    return this.http.put<any>(`http://localhost:8011/piproj/offers/Update-Offer/${id}`, offer);
  }


  getOfferbyId(id: number): Observable<Offer>{
    return this.http.get<Offer>(`http://localhost:8011/piproj/offers/GetOfferById/${id}`);
  }

  getCommentsByOfferId(id: number): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:8011/piproj/offers/GetComments/${id}`);
  }

  getApplicationsByOfferId(id: number): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:8011/piproj/offers/GetAppById/${id}`);
  }
  searchOffers(title: string): Observable<any> {
    return this.http.get<any>(`http://localhost:8011/piproj/offers/search?title=${title}`)
  }
  acceptApplication(applicationId: number): Observable<any> {
    return this.http.put<any>(`http://localhost:8011/piproj/offers/accept/${applicationId}`, {});
  }

  denyApplication(applicationId: number): Observable<any> {
    return this.http.delete<any>(`http://localhost:8011/piproj/offers/deny/${applicationId}`);
  }
  getBestOffers(): Observable<{ offer: Offer, score: number }[]> {
    return this.http.get<{ [key: string]: number }>('http://localhost:8011/piproj/offers/best-offers')
      .pipe(

        map(response => Object.entries(response).map(([key, value]) => ({
          offer: JSON.parse(key), // Convert string key back to Offer object
          score: value
        })))
      );
  }


}
