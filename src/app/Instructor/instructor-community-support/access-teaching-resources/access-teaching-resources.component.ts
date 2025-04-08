import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { InstructorNavbarComponent } from "../../instructor-navbar/instructor-navbar.component";

@Component({
  selector: 'app-access-teaching-resources',
  imports: [CommonModule, InstructorNavbarComponent],
  templateUrl: './access-teaching-resources.component.html',
  styleUrl: './access-teaching-resources.component.css'
})
export class AccessTeachingResourcesComponent {
  cards = [
    { title: 'Customize Upload', route: '/Instructor/course-contant-flow/create-course-contant' },
    { title: 'Bulk Upload', route: '/Instructor/course-marketing/course-message' },
    { title: 'Quiz Upload', route: '/Instructor/communication-student-engagement/view-messages' }
  ];

  constructor(private router: Router) {}

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
}