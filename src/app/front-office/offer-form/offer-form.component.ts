import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {OfferService} from "../../services/offer.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-offer-form',
  templateUrl: './offer-form.component.html',
  styleUrls: ['./offer-form.component.css']
})
export class OfferFormComponent implements OnInit {
  offerForm: FormGroup;
  isEditMode: boolean = false;
  offerId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private offerService: OfferService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.offerForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      image: ['', Validators.required],
      datePub: ['', Validators.required],
      dateExp: ['', Validators.required],
      category: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.offerId = +id;
        this.loadOffer(this.offerId);
      }
    });
  }


  loadOffer(id: number): void {
    this.offerService.getOfferbyId(id).subscribe(offer => {
      if (offer) {
        this.offerForm.patchValue({
          title: offer.title || '',
          description: offer.description || '',
          image: offer.image || '',
          datePub: offer.datePub ? new Date(offer.datePub).toISOString().split('T')[0] : '',
          dateExp: offer.dateExp ? new Date(offer.dateExp).toISOString().split('T')[0] : '',
          category: offer.category || ''
        });
      }
    });
  }


  onSubmit(): void {
    if (this.isEditMode) {
      this.offerService.updateOffer(this.offerId!, this.offerForm.value).subscribe(() => {
        this.router.navigate(['/front-office/internships-offers']);
      });
    } else {
      this.offerService.addOffer(this.offerForm.value).subscribe(() => {
        this.router.navigate(['/front-office/internships-offers']);
      });
    }
  }
}

