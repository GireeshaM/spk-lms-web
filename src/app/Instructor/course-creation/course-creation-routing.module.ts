import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateCourseComponent } from './create-course/create-course.component';
import { DefineCourseLearningsComponent } from './define-course-learnings/define-course-learnings.component';
import { ListRequirementsComponent } from './list-requirements/list-requirements.component';

const routes: Routes = [
  { path: 'create-course', component: CreateCourseComponent },
  { path: 'define-course-learnings', component: DefineCourseLearningsComponent },
  { path: 'list-requirements', component: ListRequirementsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseCreationRoutingModule { }
