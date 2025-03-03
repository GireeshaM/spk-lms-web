import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CourseDetailsComponent } from './courses/course-details/course-details.component';
import { CourseListComponent } from './courses/course-list/course-list.component';
import { DashboardComponent } from './Instructor/dashboard/dashboard.component';
import { LoginComponent } from './logins/login/login.component';
import { UnauthorizedComponent } from './logins/unauthorized/unauthorized.component';
import { RegisterComponent } from './logins/register/register.component';
import { StudentDashboardComponent } from './student-dash/student-dashboard/student-dashboard.component';
import { CoursesModuleComponent } from './admin/courses-module/courses-module.component';
import { DiscountsModuleComponent } from './admin/discounts-module/discounts-module.component';
import { InstructorModuleComponent } from './admin/instructor-module/instructor-module.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { InstructorDashboardComponent } from './instructor-dashboard/instructor-dashboard.component';
import { StudentModuleComponent } from './admin/student-module/student-module.component';
import { CouresefoundComponent } from './couresefound/couresefound.component';
import { StudentProfileComponent } from './student-dash/student-profile/student-profile.component';
import { CoursespComponent } from './courses/coursesp/coursesp.component';
import { InterestsComponent } from './student-dash/interests/interests.component';
import { GradesComponent } from './student-dash/grades/grades.component';
import { SeeInstructorProfileComponent } from './InstructorModules/see-instructor-profile/see-instructor-profile.component';
import { MarketInsightsComponent } from './InstructorModules/market-insights/market-insights.component';
import { SeeStudentInterestComponent } from './InstructorModules/see-student-interest/see-student-interest.component';
import { CourseReviewsFeedbackComponent } from './InstructorModules/course-reviews-feedback/course-reviews-feedback.component';
import { InstructorReviewsFeedbackComponent } from './InstructorModules/instructor-reviews-feedback/instructor-reviews-feedback.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'courses/:id', component: CourseDetailsComponent },
    { path: 'courses', component: CourseListComponent },
    { path: 'coursedetails',component:CourseDetailsComponent},
    { path: 'coursesfound',component:CouresefoundComponent},
    { path: 'Instructor/dashboard', component: DashboardComponent },
    {path:'coursesp',component:CoursespComponent},
    { path: 'Instructor/communication-student-engagement', loadChildren: () => import("../app/Instructor/communication-student-engagement/communication-student-engagement-routing.module").then(x => x.CommunicationStudentEngagementRoutingModule) },
    { path: 'Instructor/course-contant-flow', loadChildren: () => import("../app/Instructor/course-contant-flow/course-contant-flow-routing.module").then(x => x.CourseContantFlowRoutingModule) },
    { path: 'Instructor/course-creation', loadChildren: () => import("../app/Instructor/course-creation/course-creation-routing.module").then(x => x.CourseCreationRoutingModule) },
    { path: 'Instructor/course-marketing', loadChildren: () => import("../app/Instructor/course-marketing/course-marketing-routing.module").then(x => x.CourseMarketingRoutingModule) },
    { path: 'Instructor/engagement-traffic-analysis', loadChildren: () => import("../app/Instructor/engagement-traffic-analysis/engagement-traffic-analysis-routing.module").then(x => x.EngagementTrafficAnalysisRoutingModule) },
    { path: 'Instructor/instructor-community-support', loadChildren: () => import("../app/Instructor/instructor-community-support/instructor-community-support-routing.module").then(x => x.InstructorCommunitySupportRoutingModule) },
    { path: 'Instructor/performance-analysis', loadChildren: () => import("../app/Instructor/performance-analytics/performance-analytics-routing.module").then(x => x.PerformanceAnalyticsRoutingModule) },
    { path: 'logins/login',component:LoginComponent},
    { path:'logins/dashboard',component:DashboardComponent},
    { path:'logins/register',component:RegisterComponent},
    { path:'logins/unauthorized',component:UnauthorizedComponent},
    { path:'',redirectTo:'/logins/login',pathMatch:'full'},
    { path: 'instructor-dashboard',component:InstructorDashboardComponent},
    { path: 'student-dashboard',component:StudentDashboardComponent},
    {path:'student-profile',component:StudentProfileComponent},
    {path:'grades',component:GradesComponent},
    {path:'interests',component:InterestsComponent},
    { path: 'admin-dashboard',component:AdminDashboardComponent},
    { path: 'admin/courses-module',component:CoursesModuleComponent},
    { path: 'admin/discounts-module',component:DiscountsModuleComponent},
    { path:'admin/instructor-module',component:InstructorModuleComponent},
    { path: 'admin/student-module',component:StudentModuleComponent},
    { path: 'InstructorModules/see-instructor-profile',component:SeeInstructorProfileComponent},
    { path: 'InstructorModules/market-insights',component:MarketInsightsComponent},
    { path: 'InstructorModules/see-student-interest',component:SeeStudentInterestComponent},
    { path: 'InstructorModules/course-reviews-feedback',component:CourseReviewsFeedbackComponent},
    { path: 'InstructorModules/student-reviews-feedback',component:CourseReviewsFeedbackComponent},
    { path: 'InstructorModules/instructor-reviews-feedback',component:InstructorReviewsFeedbackComponent}                                                                                                                                 
];
