import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InstructorNavbarComponent } from "../../instructor-navbar/instructor-navbar.component";

interface Feedback {
  course: string;
  quiz: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  rating: number;
}
@Component({
  selector: 'app-view-assignment-feedback',
  imports: [CommonModule, ReactiveFormsModule, InstructorNavbarComponent],
  templateUrl: './view-assignment-feedback.component.html',
  styleUrl: './view-assignment-feedback.component.css'
})
export class ViewAssignmentFeedbackComponent {

  feedbackForm: FormGroup;
  courses = ['Angular', 'React', 'Vue', 'Node.js'];
  quizzesByCourse: { [key: string]: string[] } = {
    Angular: ['Components Quiz', 'Directives Quiz'],
    React: ['Hooks Quiz', 'State Management Quiz'],
    Vue: ['Vue Basics', 'Vuex Quiz'],
    Node: ['Express Quiz', 'MongoDB Quiz']
  };
  
  selectedQuizzes: string[] = [];
  feedbackReports: Feedback[] = [
    { course: 'Angular', quiz: 'Components Quiz', difficulty: 'Easy', rating: 4 },
    { course: 'Angular', quiz: 'Components Quiz', difficulty: 'Medium', rating: 3 },
    { course: 'Angular', quiz: 'Components Quiz', difficulty: 'Hard', rating: 2 },
    { course: 'React', quiz: 'Hooks Quiz', difficulty: 'Easy', rating: 5 }
  ];

  difficultyCounts = { Easy: 0, Medium: 0, Hard: 0 };
  averageRating = 0;

  constructor(private fb: FormBuilder) {
    this.feedbackForm = this.fb.group({
      course: ['', Validators.required],
      quiz: ['', Validators.required]
    });
  }

  // Handle Course Change
  onCourseChange(selectedCourse: string) {
    this.selectedQuizzes = this.quizzesByCourse[selectedCourse] || [];
    this.feedbackForm.patchValue({ quiz: '' });
  }

  // Fetch Feedback Data
  generateFeedbackReport() {
    const selectedCourse = this.feedbackForm.value.course;
    const selectedQuiz = this.feedbackForm.value.quiz;

    if (!selectedCourse || !selectedQuiz) return;

    // Filter feedback for the selected quiz
    const quizFeedback = this.feedbackReports.filter(
      feedback => feedback.course === selectedCourse && feedback.quiz === selectedQuiz
    );

    // Reset counts
    this.difficultyCounts = { Easy: 0, Medium: 0, Hard: 0 };
    let totalRating = 0;

    quizFeedback.forEach(feedback => {
      this.difficultyCounts[feedback.difficulty]++;
      totalRating += feedback.rating;
    });

    this.averageRating = quizFeedback.length > 0 ? totalRating / quizFeedback.length : 0;
  }
}