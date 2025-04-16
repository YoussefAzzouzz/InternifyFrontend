import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OfferService } from 'src/app/services/offer.service';
import { CommentService } from 'src/app/services/comment.service'; // Import comment service
import { Comment } from 'src/app/models/comment';
import {ApplicationService} from "../../services/application.service";
import {Application} from "../../models/application";
import {TokenStorageService} from "../../front-office/_services/token-storage.service"; // Import the Comment model

@Component({
  selector: 'app-offer-details',
  templateUrl: './offer-details.component.html',
  styleUrls: ['./offer-details.component.css']
})
export class OfferDetailsComponent implements OnInit {
  offer: any;
  comments: any[] = []; // To hold comments
  applications: any[] = [];
  newComment: string = '';
  newApplication: Application = {
    id: 0, cv: '', motivationLetter: '', status: 'Pending', offerId: 0, userId: 1 };// New comment input

  constructor(
    private route: ActivatedRoute,
    private offerService: OfferService,
    private commentService: CommentService,
    private applicationService: ApplicationService, // Inject comment service
    private router: Router,
    private tokenStorage:TokenStorageService
  ) {}

  ngOnInit(): void {
    const offerId = this.route.snapshot.paramMap.get('id');
    if (offerId) {
      const id = Number(offerId);
      if (!isNaN(id)) {
        this.offerService.getOfferbyId(id).subscribe((data) => {
          this.offer = data;
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


  // Add comment method
  addComment(offerId: number): void {
    if (!this.newComment.trim()) {
      alert('Comment cannot be empty');
      return;
    }

    const comment: Comment = {
      content: this.newComment,
      creationDate: new Date(),
      offerId: offerId,
      userId: this.tokenStorage.getUser().id // Replace with actual logged-in user ID
    };

    // Call the comment service to add the comment
    this.commentService.addCommentToOffer(comment.offerId, comment.content,comment.userId).subscribe(() => {
      this.getComments(offerId); // Reload the comments
      this.newComment = ''; // Clear input field
      alert('Comment added successfully!');
    });
  }
  getApplications(id: number): void {
    this.offerService.getApplicationsByOfferId(id).subscribe(applications => {
      this.applications = applications;
    });
  }
  addApplication(): void {
    if (!this.newApplication.cv.trim() || !this.newApplication.motivationLetter.trim()) {
      alert('CV and Motivation Letter cannot be empty');
      return;
    }

    // Assurer que l'offerId est bien défini
    if (!this.offer || !this.offer.id) {
      alert('Offer ID is missing');
      return;
    }

    this.newApplication.offerId = this.offer.id; // Associer l'offre sélectionnée
    this.newApplication.userId = 1; // Remplacer par l'ID réel de l'utilisateur connecté

    this.applicationService.applyForOffer(
      this.newApplication.offerId,
      this.newApplication.userId,
      this.newApplication.cv,
      this.newApplication.motivationLetter
    ).subscribe(() => {
      alert('Application submitted successfully!');
      this.getApplications(this.offer.id); // Rafraîchir la liste des candidatures
      this.newApplication = { id: 0, cv: '', motivationLetter: '', status: 'Pending', offerId: 0, userId: 1 }; // Réinitialiser le formulaire
    });
  }





}
