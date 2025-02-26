import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FrontOfficeComponent } from './front-office.component';
import {HomeComponent} from "./home/home.component";
import {OfferComponent} from "./offer/offer.component";
import {OfferFormComponent} from "./offer-form/offer-form.component";
import {OfferDetailsComponent} from "./offer-details/offer-details.component";


const routes: Routes = [
  {
    path: '', component: HomeComponent, children: [
      { path: '', component: FrontOfficeComponent },
      { path: 'internships-offers', component: OfferComponent },
      { path: 'add-offer', component: OfferFormComponent},
      { path: 'edit-offer/:id' , component: OfferFormComponent},
      {path:'offer-details/:id' , component:OfferDetailsComponent}

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrontOfficeRoutingModule {
}

