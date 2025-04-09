import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FrontOfficeRoutingModule } from './front-office-routing.module';
import { FrontOfficeComponent } from './front-office.component';
import { HomeComponent } from './home/home.component';
import { AddContractComponent } from './add-contract/add-contract.component';
import {FormsModule} from "@angular/forms";
import { FrontOfficeContractsComponent } from './front-office-contracts/front-office-contracts.component';
import { UpdateContractComponent } from './update-contract/update-contract.component';
import { AddReportComponent } from './add-report/add-report.component';
import { DocumentsComponent } from './documents/documents.component';
import { ReportsComponent } from './reports/reports.component';


@NgModule({
  declarations: [
    FrontOfficeComponent,
    HomeComponent,
    AddContractComponent,
    FrontOfficeContractsComponent,
    UpdateContractComponent,
    AddReportComponent,
    DocumentsComponent,
    ReportsComponent
  ],
    imports: [
        CommonModule,
        FrontOfficeRoutingModule,
        FormsModule
    ]
})
export class FrontOfficeModule { }
