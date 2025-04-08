import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { P1Component } from "../Instructor/course-creation/p1/p1.component";
@Component({
  selector: 'app-c1',
  imports: [FormsModule, CommonModule,  ],
  templateUrl: './c1.component.html',
  styleUrl: './c1.component.css'
})
export class C1Component {

  courseTitle: string = '';
  selectedTitle: string ='';
  selectedCategory: string = '';
  showCategory: boolean = false;

  constructor(private router: Router) {}

  showCategorySelection(): void {
    this.showCategory = this.courseTitle.trim().length > 0;
  }

  navigateToDashboard() {
    this.router.navigate(['/Instructor/course-creation/p1']); // Navigate to the dashboard
  }
  goToNextStep() {
    // You can pass course data via service or route query if needed
    console.log('Course Title:', this.courseTitle);
    console.log('Selected Category:', this.selectedCategory);
    // Navigate to the next step/component (e.g., step2)
    this.router.navigate(['/c2']);
  }
}