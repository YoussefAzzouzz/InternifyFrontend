import { Component, OnInit } from '@angular/core';
import { Offer } from "../../models/offer";
import { OfferService } from '../../services/offer.service';
import { Subject } from "rxjs";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.css']
})
export class OfferComponent implements OnInit {
  offers: Offer[] = [];
  searchParams = {
    searchText: '',
    startDate: '',
    endDate: ''
  };
  commentsCount: { [key: number]: number } = {};
  applicationsCount: { [key: number]: number } = {};

  private searchSubject = new Subject<string>();

  constructor(private offerService: OfferService) {}

  ngOnInit(): void {
    this.loadOffers();

    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(searchText => {
      this.searchOffers(searchText);
    });
  }

  loadOffers() {
    this.offerService.getOffers().subscribe(data => {
      this.offers = data;
      this.offers.forEach(offer => {
        this.loadCommentsCount(offer.id);
        this.loadApplicationsCount(offer.id);
      });
    });
  }

  loadCommentsCount(offerId: number) {
    this.offerService.getCommentsByOfferId(offerId).subscribe(comments => {
      this.commentsCount[offerId] = comments.length;
    });
  }

  loadApplicationsCount(offerId: number) {
    this.offerService.getApplicationsByOfferId(offerId).subscribe(applications => {
      this.applicationsCount[offerId] = applications.length;
    });
  }

  deleteOffer(id: number) {
    this.offerService.deleteOffer(id).subscribe(() => {
      this.loadOffers();
    });
  }

  onSearchInput(event: any) {
    const searchText = event.target.value;
    this.searchSubject.next(searchText);
  }

  searchOffers(title: string) {
    this.offerService.searchOffers(title).subscribe(data => {
      this.offers = data;
    });
  }
}
