import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
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
  addOffer(offer: Offer): Observable<Offer> {
    return this.http.post<Offer>('http://localhost:8011/piproj/offers/Add-Offer', offer);
  }
  updateOffer(id: number , offer: Offer): Observable<Offer>{
    return this.http.put<Offer>(`http://localhost:8011/piproj/offers/Update-Offer/${id}`, offer);
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


}
