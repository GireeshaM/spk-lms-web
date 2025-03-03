import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewOverviewComponent } from './view-overview/view-overview.component';
import { ViewReviewsComponent } from './view-reviews/view-reviews.component';
import { ViewStudentsDataComponent } from './view-students-data/view-students-data.component';

const routes: Routes = [
  { path: 'view-overview', component: ViewOverviewComponent },
  { path: 'view-reviews', component: ViewReviewsComponent },
  { path: 'view-students-data', component: ViewStudentsDataComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PerformanceAnalyticsRoutingModule { }
