import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Course, Grade } from '../services/student.service';

@Component({
  selector: 'app-hnav',
  imports: [CommonModule,RouterLink],
  templateUrl: './hnav.component.html',
  styleUrl: './hnav.component.css'
})
export class HnavComponent {

 student = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      profilePhoto: 'images/student.jpg',
      grades: [
        { type: 'study', hours: 10 },
        { type: 'exam', score: 85 },  
        { type: 'study', hours: 6 },
        { type: 'exam', score: 92 }
      ] as Grade[],
      completedCourses: [{}] as Course[],
      activeCourses: [{}] as Course[],
      interests: [
         { 
          id: 7,
          name: 'Machine Learning', 
          image: 'images/machine-learning.jpg', 
          progress: 0, 
          category: 'AI', 
          difficulty: 'Intermediate',
        }
      ] as Course[],
      enrolledCourses: [] as Course[],  
      recommendedCourses: [] as Course[]
    };
   displayedCourses: Course[] = [];
    selectedCategoryTitle: string = 'Active Courses';
    currentView = 'dashboard';
   setView(view: string, title: string, courses: Course[] = []) {
      this.currentView = view;
      this.selectedCategoryTitle = title;
      this.displayedCourses = courses;
      // setTimeout(() => this.loadChart(), 100); // Refresh chart when switching views
    }
  viewInterests() {
    this.setView('interests', 'My Interests', this.student.interests);
  }
}
