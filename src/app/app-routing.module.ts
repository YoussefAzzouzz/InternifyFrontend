import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AddContractComponent} from "./front-office/add-contract/add-contract.component";
import {ContractListComponent} from "./back-office/contract-list/contract-list.component";
import {FrontOfficeContractsComponent} from "./front-office/front-office-contracts/front-office-contracts.component";
import {UpdateContractComponent} from "./front-office/update-contract/update-contract.component";

const routes: Routes = [
  { path: 'documents', component: AddContractComponent },
  { path: 'contracts', component: ContractListComponent },
  { path: 'update-contract/:id', component: UpdateContractComponent },
  { path: 'front-office/contracts', component: FrontOfficeContractsComponent },
  { path: 'front-office', loadChildren: () => import('./front-office/front-office.module').then(m => m.FrontOfficeModule) },
  { path: 'back-office', loadChildren: () => import('./back-office/back-office.module').then(m => m.BackOfficeModule) },
  { path: '', redirectTo: '/front-office', pathMatch: 'full' }, // Default route
  { path: '**', redirectTo: '/front-office' } // Fallback route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
