import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FrontOfficeComponent } from './front-office.component';
import {HomeComponent} from "./home/home.component";
import {BackOfficeLayoutComponent} from "../back-office/back-office-layout/back-office-layout.component";
import {DashboardComponent} from "../back-office/dashboard/dashboard.component";
import {DemandFormComponent} from "../back-office/demand-form/demand-form.component";
import {DemandDetailsComponent} from "../back-office/demand-details/demand-details.component";
import {ResponseFormComponent} from "../back-office/response-form/response-form.component";
import {NotificationsComponent} from "../back-office/notifications/notifications.component";
import {FrontOfficeLayoutComponent} from "./front-office-layout/front-office-layout.component";
import {DemandComponent} from "../back-office/demand/demand.component";
import {DemandListComponent} from "./demand-list/demand-list.component";

const routes: Routes = [
  { path: '', component: FrontOfficeLayoutComponent, children: [
      { path: '', component: HomeComponent },
      { path: 'demand', component: DemandListComponent },
      { path: 'add', component: DemandFormComponent },
      { path: 'edit/:id', component: DemandFormComponent },
      { path: 'details/:id', component: DemandDetailsComponent },
      { path: 'response/:id', component: ResponseFormComponent },
      { path: 'notifications', component: NotificationsComponent }
  ]}
    ];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrontOfficeRoutingModule { }
