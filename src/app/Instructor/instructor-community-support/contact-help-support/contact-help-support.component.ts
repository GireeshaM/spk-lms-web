import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { InstructorNavbarComponent } from "../../instructor-navbar/instructor-navbar.component";

@Component({
  selector: 'app-contact-help-support',
  imports: [CommonModule, FormsModule, InstructorNavbarComponent],
  templateUrl: './contact-help-support.component.html',
  styleUrl: './contact-help-support.component.css'
})
export class ContactHelpSupportComponent {
  courses = [
    { id: 1, name: 'Angular Basics' },
    { id: 2, name: 'React Advanced' },
    { id: 3, name: 'Node.js Essentials' }
  ];

  feedbacks: { [key: number]: any[] } = {
    1: [
      { user: 'Arun', comment: 'Great course! Very detailed.', rating: 5 },
      { user: 'Aman', comment: 'Helpful for beginners.', rating: 4 }
    ],
    2: [
      { user: 'Charan', comment: 'Challenging but very informative.', rating: 4 },
      { user: 'Diya', comment: 'Covers all advanced topics well.', rating: 5 }
    ],
    3: [
      { user: 'Eshwar', comment: 'Learned a lot about backend development.', rating: 5 },
      { user: 'Fareena', comment: 'Good explanations, but could be more interactive.', rating: 3 }
    ]
  };

  feedbackForm: FormGroup;
  filteredFeedbacks: any[] = [];

  constructor(private fb: FormBuilder) {
    this.feedbackForm = this.fb.group({
      courseId: ['']
    });
  }

  onCourseChange() {
    const selectedCourseId = Number(this.feedbackForm.get('courseId')?.value); // Get selected ID
    this.filteredFeedbacks = this.feedbacks[selectedCourseId] || []; // Get feedback for the selected course
  }
}
