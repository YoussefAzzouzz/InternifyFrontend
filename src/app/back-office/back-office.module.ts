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
import { ResponseFormComponent } from './response-form/response-form.component';
import {NgxPaginationModule} from "ngx-pagination";
import { NotificationsComponent } from './notifications/notifications.component';


@NgModule({
  declarations: [
    BackOfficeComponent,
    DashboardComponent,
    DemandComponent,
    DemandFormComponent,
    DemandDetailsComponent,
    BackOfficeLayoutComponent,
    ResponseFormComponent,
    NotificationsComponent
  ],
    imports: [
        CommonModule,
        BackOfficeRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        NgxPaginationModule
    ]
})
export class BackOfficeModule { }
