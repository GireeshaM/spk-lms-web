import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-p1',
  imports: [],
  templateUrl: './p1.component.html',
  styleUrl: './p1.component.css'
})
export class P1Component {
  selectedType: string | null = null;

  constructor(private router: Router) {}

  navigateToCourse() {
    this.selectedType = 'course'; // Optional: Keep track of selection
    this.router.navigate(['/c1']); // Navigate to the course page
  }

  navigateToPracticeTest() {
    this.selectedType = 'test'; // Optional: Keep track of selection
    this.router.navigate(['/Instructor/communication-student-engagement/add-faqs']); // Navigate to the practice test page
  }

  navigateToDashboard() {
    this.router.navigate(['/instructor-dashboard']); // Navigate to the dashboard
  }
  
}