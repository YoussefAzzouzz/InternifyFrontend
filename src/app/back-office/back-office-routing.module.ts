import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BackOfficeLayoutComponent } from './back-office-layout/back-office-layout.component';  // Import the layout component
import { DashboardComponent } from './dashboard/dashboard.component';
import { DemandComponent } from './demand/demand.component';
import { DemandFormComponent } from './demand-form/demand-form.component';
import { DemandDetailsComponent } from './demand-details/demand-details.component';
import {AddContractComponent} from "../front-office/add-contract/add-contract.component";
import {ContractListComponent} from "./contract-list/contract-list.component";
import {UpdateContractComponent} from "../front-office/update-contract/update-contract.component";
import {AddReportComponent} from "../front-office/add-report/add-report.component";
import {ViewReportsComponent} from "./view-reports/view-reports.component";
import {DocumentsComponent} from "../front-office/documents/documents.component";
import {FrontOfficeContractsComponent} from "../front-office/front-office-contracts/front-office-contracts.component";

const routes: Routes = [
  {
    path: '', component: BackOfficeLayoutComponent, children: [
      { path: 'documents', component: AddContractComponent },
      { path: 'contracts', component: ContractListComponent },
      { path: 'update-contract/:id', component: UpdateContractComponent },
      { path: 'add-report', component: AddReportComponent },
      { path: 'view-reports', component: ViewReportsComponent },
      { path: 'view', component: DocumentsComponent },

      { path: '', component: DashboardComponent },
      { path: 'demand', component: DemandComponent },
      { path: 'add', component: DemandFormComponent },
      { path: 'edit/:id', component: DemandFormComponent },
      { path: 'details/:id', component: DemandDetailsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BackOfficeRoutingModule { }
