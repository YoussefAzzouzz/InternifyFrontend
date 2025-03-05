import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FrontOfficeRoutingModule } from './front-office-routing.module';
import { FrontOfficeComponent } from './front-office.component';
import { HomeComponent } from './home/home.component';
import { ConversationComponent } from './conversation/conversation.component';
import { MessageComponent } from './message/message.component';
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    FrontOfficeComponent,
    HomeComponent,
    ConversationComponent,
    MessageComponent
  ],
  imports: [
    CommonModule,
    FrontOfficeRoutingModule,
    FormsModule
  ]
})
export class FrontOfficeModule { }
