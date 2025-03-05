import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FrontOfficeComponent } from './front-office.component';
import {HomeComponent} from "./home/home.component";
import {ConversationComponent} from "./conversation/conversation.component";
import {MessageComponent} from "./message/message.component";

const routes: Routes = [
  { path: '', component: HomeComponent, children:[
      { path: 'chat/:idUser', component: ConversationComponent },
      { path: 'chat/:idUser/:idConversation/message', component: MessageComponent }
    ] }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrontOfficeRoutingModule { }
