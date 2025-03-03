import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseLandingPageComponent } from './course-landing-page/course-landing-page.component';
import { CourseMessageComponent } from './course-message/course-message.component';
import { PricingPageComponent } from './pricing-page/pricing-page.component';
import { PromotionsPageComponent } from './promotions-page/promotions-page.component';
import { SendCourseForReviewComponent } from './send-course-for-review/send-course-for-review.component';

const routes: Routes = [
  { path: 'course-landing-page', component: CourseLandingPageComponent },
  { path: 'course-message', component: CourseMessageComponent },
  { path: 'pricing-page', component: PricingPageComponent },
  { path: 'promotions-page', component: PromotionsPageComponent },
  { path: 'send-course-for-review', component: SendCourseForReviewComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseMarketingRoutingModule { }
