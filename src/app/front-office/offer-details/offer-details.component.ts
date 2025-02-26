import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OfferService } from '../../services/offer.service';
import { CommentService } from '../../services/comment.service';
import { Comment } from "../../models/comment";

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

  constructor(
    private route: ActivatedRoute,
    private offerService: OfferService,
    private commentService: CommentService,
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
}
