import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FrontOfficeComponent } from './front-office.component';
import {HomeComponent} from "./home/home.component";
import {AddContractComponent} from "./add-contract/add-contract.component";
import {ContractListComponent} from "../back-office/contract-list/contract-list.component";
import {UpdateContractComponent} from "./update-contract/update-contract.component";
import {AddReportComponent} from "./add-report/add-report.component";
import {ViewReportsComponent} from "../back-office/view-reports/view-reports.component";
import {DocumentsComponent} from "./documents/documents.component";
import {FrontOfficeContractsComponent} from "./front-office-contracts/front-office-contracts.component";

const routes: Routes = [
  { path: '', component: HomeComponent, children:[
      { path: 'documents', component: AddContractComponent },
      { path: 'contracts', component: ContractListComponent },
      { path: 'update-contract/:id', component: UpdateContractComponent },
      { path: 'add-report', component: AddReportComponent },
      { path: 'view-reports', component: ViewReportsComponent },
      { path: 'view', component: DocumentsComponent },
      { path: 'contract', component: FrontOfficeContractsComponent }
    ] }

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrontOfficeRoutingModule { }
