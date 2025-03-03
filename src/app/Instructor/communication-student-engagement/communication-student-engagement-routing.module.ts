import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddFaqsComponent } from './add-faqs/add-faqs.component';
import { ViewAssignmentFeedbackComponent } from './view-assignment-feedback/view-assignment-feedback.component';
import { ViewMessagesComponent } from './view-messages/view-messages.component';

const routes: Routes = [
  { path: 'add-faqs', component: AddFaqsComponent },
  { path: 'view-assignments-feedback', component: ViewAssignmentFeedbackComponent },
  { path: 'view-messages', component: ViewMessagesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommunicationStudentEngagementRoutingModule { }
