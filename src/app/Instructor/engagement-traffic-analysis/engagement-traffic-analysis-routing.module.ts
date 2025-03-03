import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrackCourseEngagementComponent } from './track-course-engagement/track-course-engagement.component';
import { ViewMarketplaceInsightsComponent } from './view-marketplace-insights/view-marketplace-insights.component';
import { EngagementTrafficAnalysisModule } from './engagement-traffic-analysis.module';

const routes: Routes = [
  { path: 'track-course-engagement', component: TrackCourseEngagementComponent },
  { path: 'view-markrtplace-insights', component: ViewMarketplaceInsightsComponent },
  { path: 'view-traffic', component: EngagementTrafficAnalysisModule }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EngagementTrafficAnalysisRoutingModule { }
