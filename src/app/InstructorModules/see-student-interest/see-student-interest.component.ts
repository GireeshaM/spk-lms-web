import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AdminNavComponent } from "../../admin/admin-nav/admin-nav.component";


@Component({
  selector: 'app-see-student-interest',
  standalone: true,
  imports: [CommonModule, NgxChartsModule, AdminNavComponent],
  templateUrl: './see-student-interest.component.html',
  styleUrl: './see-student-interest.component.css'
})
export class SeeStudentInterestComponent implements OnInit {
  
  // Course Preferences & Enrollments Data
  mostAccessedCourses = [
    { name: 'Full Stack', value: 1500 },
    { name: 'Data Science', value: 1200 },
    { name: 'AI/ML', value: 1700 },
    { name: 'Cyber Security', value: 950 },
    { name: 'Cloud Computing', value: 1300 },
    { name: 'Blockchain', value: 1100 },
    { name: 'DevOps', value: 900 },
    { name: 'UI/UX Design', value: 850 },
    { name: 'Python for AI', value: 1000 },
    { name: 'Game Development', value: 720 }
  ];

  completedCourses = [
    { name: 'Full Stack', value: 80 },
    { name: 'Data Science', value: 70 },
    { name: 'AI/ML', value: 90 },
    { name: 'Cloud Computing', value: 60 },
    { name: 'Cyber Security', value: 75 },
    { name: 'Blockchain', value: 65 },
    { name: 'DevOps', value: 85 },
    { name: 'UI/UX Design', value: 50 },
    { name: 'Python for AI', value: 78 },
    { name: 'Game Development', value: 55 }
  ];

  enrollmentHistory = [
    { name: 'Jan', value: 100 },
    { name: 'Feb', value: 130 },
    { name: 'Mar', value: 150 },
    { name: 'Apr', value: 170 }
  ];

  wishlist = [
    { name: 'Blockchain Development' },
    { name: 'IoT Security' },
    { name: 'Python for Finance' }
  ];

  // Learning Activity & Engagement Data
  timeSpent = [
    { name: 'Full Stack', value: 30 },
    { name: 'Data Science', value: 40 },
    { name: 'AI/ML', value: 50 }
  ];

  discussionParticipation = [
    { name: 'Questions Asked', value: 20 },
    { name: 'Comments Made', value: 35 }
  ];

  videoProgress = [
    { name: 'Watched', value: 75 },
    { name: 'Skipped', value: 25 }
  ];

  interactiveUsage = [
    { name: 'Quizzes', value: 50 },
    { name: 'Simulations', value: 30 },
    { name: 'Exercises', value: 20 }
  ];

  notes = [
    'Advanced SQL Queries',
    'Neural Networks Summary',
    'Docker Setup Guide'
  ];

  constructor() {}

  ngOnInit(): void {}
}