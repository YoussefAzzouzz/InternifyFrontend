import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BackOfficeRoutingModule } from './back-office-routing.module';
import { BackOfficeComponent } from './back-office.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DemandComponent } from './demand/demand.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { DemandFormComponent } from './demand-form/demand-form.component';
import { DemandDetailsComponent } from './demand-details/demand-details.component';
import { BackOfficeLayoutComponent } from './back-office-layout/back-office-layout.component';
import { OfferComponent } from './offer/offer.component';
import { OfferFormComponent } from './offer-form/offer-form.component';
import { OfferDetailsComponent } from './offer-details/offer-details.component';
import { CommentComponent } from './comment/comment.component';
import { CommentFormComponent } from './comment-form/comment-form.component';
import { ApplicationFormComponent } from './application-form/application-form.component';
import { EditApplicationComponent } from './edit-application/edit-application.component';
import { ApplicationComponent } from './application/application.component';
import { OfferStatComponent } from './offer-stat/offer-stat.component';


@NgModule({
  declarations: [
    BackOfficeComponent,
    DashboardComponent,
    DemandComponent,
    DemandFormComponent,
    DemandDetailsComponent,
    BackOfficeLayoutComponent,
    OfferComponent,
    OfferFormComponent,
    OfferDetailsComponent,
    CommentComponent,
    CommentFormComponent,
    ApplicationFormComponent,
    EditApplicationComponent,
    OfferStatComponent,
  ],
  imports: [
    CommonModule,
    BackOfficeRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class BackOfficeModule { }
