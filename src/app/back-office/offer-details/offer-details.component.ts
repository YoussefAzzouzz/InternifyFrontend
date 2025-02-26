import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OfferService } from 'src/app/services/offer.service';

@Component({
  selector: 'app-offer-details',
  templateUrl: './offer-details.component.html',
  styleUrls: ['./offer-details.component.css']
})
export class OfferDetailsComponent implements OnInit {
  offer: any;
  comments: any[] = []; // To hold comments
  applications: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private offerService: OfferService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const offerId = this.route.snapshot.paramMap.get('id');
    if (offerId) {
      const id = Number(offerId); // Convert the string to a number
      if (!isNaN(id)) {
        // Fetch offer details
        this.offerService.getOfferbyId(id).subscribe((data) => {
          this.offer = data;
          // Fetch comments and applications after offer details are fetched
          this.getComments(id);
          this.getApplications(id);
        });
      } else {
        console.error('Invalid ID format');
      }
    }
  }


  deleteOffer(id: number): void {
    if (confirm('Are you sure you want to delete this offer?')) {
      this.offerService.deleteOffer(id).subscribe(() => {
        this.router.navigate(['/back-office/offers']);
      });
    }
  }
  getComments(id: number): void {
    this.offerService.getCommentsByOfferId(id)
      .subscribe(comments => {
        this.comments = comments;
      });
  }

  getApplications(id: number): void {
    this.offerService.getApplicationsByOfferId(id)
      .subscribe(applications => {
        this.applications = applications;
      });
  }
}
