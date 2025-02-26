import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FrontOfficeRoutingModule } from './front-office-routing.module';
import { FrontOfficeComponent } from './front-office.component';
import { HomeComponent } from './home/home.component';
import { OfferComponent } from './offer/offer.component';
import { OfferDetailsComponent } from './offer-details/offer-details.component';
import { OfferFormComponent } from './offer-form/offer-form.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    FrontOfficeComponent,
    HomeComponent,
    OfferComponent,
    OfferDetailsComponent,
    OfferFormComponent
  ],
  imports: [
    CommonModule,
    FrontOfficeRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class FrontOfficeModule { }
