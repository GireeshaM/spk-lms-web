import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAccessibilityComponent } from './add-accessibility/add-accessibility.component';
import { AddAssignmentComponent } from './add-assignment/add-assignment.component';
import { AddLectureComponent } from './add-lecture/add-lecture.component';
import { AddPracticeeTestComponent } from './add-practicee-test/add-practicee-test.component';
import { AddQuizComponent } from './add-quiz/add-quiz.component';
import { CreateCourseContantComponent } from './create-course-contant/create-course-contant.component';

const routes: Routes = [
  { path: 'add-accessibility', component: AddAccessibilityComponent },
  { path: 'add-assignment', component: AddAssignmentComponent },
  { path: 'add-lecture', component: AddLectureComponent },
  { path: 'add-practicee-test', component: AddPracticeeTestComponent },
  { path: 'add-quiz', component: AddQuizComponent },
  { path: 'create-course-contant', component: CreateCourseContantComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseContantFlowRoutingModule { }
