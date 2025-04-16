import { Component } from '@angular/core';
import {OfferService} from "../../services/offer.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-offer-with-image',
  templateUrl: './add-offer-with-image.component.html',
  styleUrls: ['./add-offer-with-image.component.css']
})
export class AddOfferWithImageComponent {


  offer = {
    title: '',
    description: '',
    category: '',
    datePub: '',
    dateExp: '',
    image: null
  };

  constructor(private offerService: OfferService,  private router: Router) {}

  // Handle file change for the image upload
  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.offer.image = event.target.files[0];
    }
  }

  // Submit the offer with the data and image
  onSubmit() {
    this.offerService.addOfferWithImage(this.offer).subscribe(response => {
      console.log('Offer added successfully!', response);
      this.router.navigate(['/back-office/offer']);
    }, error => {
      console.error('Error adding offer', error);
    });
  }
}
