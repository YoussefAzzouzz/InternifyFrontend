import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FrontOfficeRoutingModule } from './front-office-routing.module';
import { FrontOfficeComponent } from './front-office.component';
import { HomeComponent } from './home/home.component';
import { FrontOfficeLayoutComponent } from './front-office-layout/front-office-layout.component';
import { DemandListComponent } from './demand-list/demand-list.component';
import {BackOfficeRoutingModule} from "../back-office/back-office-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgxPaginationModule} from "ngx-pagination";


@NgModule({
  declarations: [
    FrontOfficeComponent,
    HomeComponent,
    FrontOfficeLayoutComponent,
    DemandListComponent
  ],
  imports: [
    CommonModule,
    FrontOfficeRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule
  ]
})
export class FrontOfficeModule { }
