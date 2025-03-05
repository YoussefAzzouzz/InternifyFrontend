import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BackOfficeLayoutComponent } from './back-office-layout/back-office-layout.component';  // Import the layout component
import { DashboardComponent } from './dashboard/dashboard.component';
import { DemandComponent } from './demand/demand.component';
import { DemandFormComponent } from './demand-form/demand-form.component';
import { DemandDetailsComponent } from './demand-details/demand-details.component';

const routes: Routes = [
  {
    path: '', component: BackOfficeLayoutComponent, children: [
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
