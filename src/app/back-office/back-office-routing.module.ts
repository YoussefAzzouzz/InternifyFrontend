import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BackOfficeLayoutComponent } from './back-office-layout/back-office-layout.component';  // Import the layout component
import { DashboardComponent } from './dashboard/dashboard.component';
import { DemandComponent } from './demand/demand.component';
import { DemandFormComponent } from './demand-form/demand-form.component';
import { DemandDetailsComponent } from './demand-details/demand-details.component';
import {OfferComponent} from "./offer/offer.component";
import {OfferFormComponent} from "./offer-form/offer-form.component";
import {OfferDetailsComponent} from "./offer-details/offer-details.component";
import {CommentComponent} from "./comment/comment.component";
import {CommentFormComponent} from "./comment-form/comment-form.component";
import {ApplicationFormComponent} from "./application-form/application-form.component";
import {EditApplicationComponent} from "./edit-application/edit-application.component";
import {ApplicationComponent} from "./application/application.component";
import {OfferStatComponent} from "./offer-stat/offer-stat.component";

const routes: Routes = [
  {
    path: '', component: BackOfficeLayoutComponent, children: [
      { path: '', component: DashboardComponent },
      { path: 'demand', component: DemandComponent },
      { path: 'add', component: DemandFormComponent },
      { path: 'edit/:id', component: DemandFormComponent },
      { path: 'details/:id', component: DemandDetailsComponent },
      {path:'offer', component: OfferComponent},
      {path: 'add-offer', component:OfferFormComponent},
      {path: 'edit-offer/:id',component:OfferFormComponent},
      {path: 'details-offer/:id',component:OfferDetailsComponent},
      {path: 'comment' , component: CommentComponent },
      {path: 'edit-comment/:id' , component : CommentFormComponent},
      {path: 'add-app',component: ApplicationFormComponent},
      { path: 'edit-application/:id', component: EditApplicationComponent },
      { path: 'applications', component: ApplicationComponent },
      { path: 'offer-stat' , component: OfferStatComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BackOfficeRoutingModule { }
