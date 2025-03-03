import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccessTeachingResourcesComponent } from './access-teaching-resources/access-teaching-resources.component';
import { ContactHelpSupportComponent } from './contact-help-support/contact-help-support.component';
import { InstructorCommunityComponent } from './instructor-community/instructor-community.component';

const routes: Routes = [
  { path: 'access-teaching-resources', component: AccessTeachingResourcesComponent },
  { path: 'contact-help-support', component: ContactHelpSupportComponent },
  { path: 'instructor-community', component: InstructorCommunityComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstructorCommunitySupportRoutingModule { }
