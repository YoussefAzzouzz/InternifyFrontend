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
import { MessageStatsComponent } from './message-stats/message-stats.component';
import { AllConversationsComponent } from './all-conversations/all-conversations.component';
import { ConversationStatsComponent } from './conversation-stats/conversation-stats.component';


@NgModule({
  declarations: [
    BackOfficeComponent,
    DashboardComponent,
    DemandComponent,
    DemandFormComponent,
    DemandDetailsComponent,
    BackOfficeLayoutComponent,
    MessageStatsComponent,
    AllConversationsComponent,
    ConversationStatsComponent
  ],
    imports: [
        CommonModule,
        BackOfficeRoutingModule,
        ReactiveFormsModule,
        FormsModule
    ]
})
export class BackOfficeModule { }
