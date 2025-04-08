// assignments.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faClock, faListCheck, faHourglassHalf, faFileCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { RouterLink } from '@angular/router';
import { HnavComponent } from "../../hnav/hnav.component";

interface Assignment {
  id: number;
  title: string;
  course: string;
  status: 'active' | 'pending' | 'completed';
  dueDate: Date;
  progress: number;
  instructor: string;
}

@Component({
  selector: 'app-assignments',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, RouterLink, HnavComponent], // ✅ Added FontAwesomeModule
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})
export class AssignmentsComponent {
  // ✅ Correct FontAwesome Icon Imports
  faClock = faClock;
  faListCheck = faListCheck;
  faHourglassHalf = faHourglassHalf;
  faFileCircleCheck = faFileCircleCheck;
  selectedFilter: 'all' | 'active' | 'pending' = 'all';  
  filterOptions: Array<'all' | 'active' | 'pending'> = ['all', 'active', 'pending'];



  assignments: Assignment[] = [
    {
      id: 1,
      title: 'Angular Fundamentals Project',
      course: 'Advanced Web Development',
      status: 'active',
      dueDate: new Date('2024-03-25'),
      progress: 65,
      instructor: 'Dr. Sarah Johnson'
    },
    {
      id: 2,
      title: 'Machine Learning Lab',
      course: 'AI Specialization',
      status: 'pending',
      dueDate: new Date('2024-04-01'),
      progress: 0,
      instructor: 'Prof. Michael Chen'
    },
    // Add more mock assignments...
  ];

  get activeAssignments() {
    return this.assignments.filter(a => a.status === 'active').length;
  }

  get pendingAssignments() {
    return this.assignments.filter(a => a.status === 'pending').length;
  }

  get filteredAssignments() {
    return this.selectedFilter === 'all'
      ? this.assignments
      : this.assignments.filter(a => a.status === this.selectedFilter);
  }

  trackById(index: number, assignment: Assignment) {
    return assignment.id;
  }
}