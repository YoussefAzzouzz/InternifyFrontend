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
import { ContractListComponent } from './contract-list/contract-list.component';
import { ViewReportsComponent } from './view-reports/view-reports.component';
import {NgxPaginationModule} from "ngx-pagination";
import {PaginationComponent} from "ngx-bootstrap/pagination";


@NgModule({
  declarations: [
    BackOfficeComponent,
    DashboardComponent,
    DemandComponent,
    DemandFormComponent,
    DemandDetailsComponent,
    BackOfficeLayoutComponent,
    ContractListComponent,
    ViewReportsComponent
  ],
  imports: [
    CommonModule,
    BackOfficeRoutingModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    PaginationComponent,
    FormsModule
  ]
})
export class BackOfficeModule { }
