import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FrontOfficeRoutingModule } from './front-office-routing.module';
import { FrontOfficeComponent } from './front-office.component';
import { HomeComponent } from './home/home.component';
import { ConversationComponent } from './conversation/conversation.component';
import { MessageComponent } from './message/message.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ConversationSearchComponent } from './conversation-search/conversation-search.component';


@NgModule({
  declarations: [
    FrontOfficeComponent,
    HomeComponent,
    ConversationComponent,
    MessageComponent,
    ConversationSearchComponent
  ],
  imports: [
    CommonModule,
    FrontOfficeRoutingModule,
    FormsModule,
    MatSnackBarModule,
    ReactiveFormsModule
  ]
})
export class FrontOfficeModule { }
