import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OfferService } from '../../services/offer.service';
import { CommentService } from '../../services/comment.service';
import { Comment } from "../../models/comment";
import { ChangeDetectorRef } from '@angular/core';  // Import ChangeDetectorRef

@Component({
  selector: 'app-offer-details',
  templateUrl: './offer-details.component.html',
  styleUrls: ['./offer-details.component.css']
})
export class OfferDetailsComponent implements OnInit {
  offer: any;
  comments: any[] = []; // To hold comments
  applications: any[] = [];
  newComment: string = ''; // New comment input
  errorMessage: string = ''; // Error message for bad words

  constructor(
    private route: ActivatedRoute,
    private offerService: OfferService,
    private commentService: CommentService,
    private router: Router,
    private cdr: ChangeDetectorRef  // Inject ChangeDetectorRef
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

  // Fetch comments by offer ID
  getComments(id: number): void {
    this.offerService.getCommentsByOfferId(id)
      .subscribe(comments => {
        this.comments = comments;
      });
  }

  // Fetch applications by offer ID
  getApplications(id: number): void {
    this.offerService.getApplicationsByOfferId(id)
      .subscribe(applications => {
        this.applications = applications;
      });
  }

  // Handle deleting an offer
  deleteOffer(id: number): void {
    if (confirm('Are you sure you want to delete this offer?')) {
      this.offerService.deleteOffer(id).subscribe(() => {
        this.router.navigate(['/back-office/offers']);
      });
    }
  }

  // Handle adding a new comment
  addComment(offerId: number): void {
    if (!this.newComment.trim()) {
      alert('Comment cannot be empty');
      return;
    }

    // Check for bad words
    if (this.containsBadWords(this.newComment)) {
      this.errorMessage = 'Your comment contains inappropriate language. Please remove it.';
      this.cdr.detectChanges();  // Ensure UI update
      return; // Don't add comment if bad words found
    }

    const comment: Comment = {
      content: this.newComment,
      creationDate: new Date(),
      offerId: offerId,
      userId: 1 // Replace with the logged-in user ID
    };

    this.commentService.addCommentToOffer(comment.offerId, comment.content).subscribe(() => {
      this.getComments(offerId); // Reload comments
      this.newComment = ''; // Clear input field
      alert('Comment added successfully!');
    });
  }

  // Check if the text contains any bad words
  containsBadWords(text: string): boolean {
    const badWords = ["fuck", "shit", "idiot", "bad word"]; // Example list of bad words
    for (let word of badWords) {
      if (text.toLowerCase().includes(word)) {
        return true;
      }
    }
    return false;
  }

  acceptApplication(applicationId: number): void {
    this.offerService.acceptApplication(applicationId).subscribe(() => {
      alert('Application accepted successfully!');
      this.getApplications(this.offer.id); // Refresh the applications list
    });
  }

  denyApplication(applicationId: number): void {
    if (confirm('Are you sure you want to deny and delete this application?')) {
      this.offerService.denyApplication(applicationId).subscribe(() => {
        alert('Application denied and deleted!');
        this.getApplications(this.offer.id); // Refresh the applications list
      });
    }
  }

  downloadOfferPdf(offerId: number): void {
    const pdfUrl = `http://localhost:8011/piproj/offers/offers/${offerId}/pdf`;
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = `offer_${offerId}.pdf`;
    link.target = '_blank'; // Open in new tab
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
