import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { InstructorNavbarComponent } from "../../instructor-navbar/instructor-navbar.component";

@Component({
  selector: 'app-view-messages',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InstructorNavbarComponent],
  templateUrl: './view-messages.component.html',
  styleUrl: './view-messages.component.css'
})
export class ViewMessagesComponent implements OnInit {
  quizForm!: FormGroup;
  courses: string[] = ['Mathematics', 'Physics', 'Chemistry'];
  // Mapping courses to corresponding sessions
  courseSessions: { [course: string]: string[] } = {
    Mathematics: ['Algebra', 'Calculus', 'Geometry'],
    Physics: ['Mechanics', 'Optics', 'Quantum Mechanics'],
    Chemistry: ['Organic Chemistry', 'Inorganic Chemistry', 'Physical Chemistry']
  };
  availableSessions: string[] = [];

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.quizForm = this.fb.group({
      title: ['', Validators.required],
      course: ['', Validators.required],
      session: ['', Validators.required],
      quizTime: ['', [Validators.required, Validators.min(1)]],
      questions: this.fb.array([])
    });

    // Update sessions based on the selected course
    this.quizForm.get('course')?.valueChanges.subscribe(selectedCourse => {
      this.availableSessions = this.courseSessions[selectedCourse] || [];
      this.quizForm.get('session')?.setValue('');
    });
  }

  // Getter for the questions FormArray
  get questions(): FormArray {
    return this.quizForm.get('questions') as FormArray;
  }

  // Create a new question FormGroup
  createQuestion(): FormGroup {
    return this.fb.group({
      questionType: ['mcq', Validators.required],
      questionText: ['', Validators.required],
      // For MCQ: options and correctAnswer; for Direct: answer.
      options: this.fb.array([]),
      correctAnswer: [''],
      answer: ['']
    });
  }

  // Add a new question to the FormArray
  addQuestion(): void {
    const questionGroup = this.createQuestion();
    this.questions.push(questionGroup);
    // For MCQ questions, add two default options
    this.addOption(this.questions.length - 1);
    this.addOption(this.questions.length - 1);
  }

  // Remove a question from the FormArray
  removeQuestion(index: number): void {
    this.questions.removeAt(index);
  }

  // Get the options FormArray for a specific question
  getOptions(questionIndex: number): FormArray {
    return this.questions.at(questionIndex).get('options') as FormArray;
  }

  // Add an option to a specific question's options FormArray
  addOption(questionIndex: number): void {
    const options = this.getOptions(questionIndex);
    options.push(this.fb.control('', Validators.required));
  }

  // Remove an option (ensuring at least two options remain)
  removeOption(questionIndex: number, optionIndex: number): void {
    const options = this.getOptions(questionIndex);
    if (options.length > 2) {
      options.removeAt(optionIndex);
    }
  }

  // This function is triggered when "Create Quiz" is clicked
  confirmQuizCreation(): void {
    if (!this.quizForm.valid) {
      this.quizForm.markAllAsTouched();
      Swal.fire({
        icon: 'error',
        title: 'Incomplete Form',
        text: 'Please fill in all required fields!'
      });
      return;
    }

    // Show a confirmation dialog before creating the quiz
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to create this quiz?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, create it!',
      cancelButtonText: 'No, cancel'
    }).then(result => {
      if (result.isConfirmed) {
        console.log('Quiz Data:', this.quizForm.value);
        Swal.fire({
          icon: 'success',
          title: 'Quiz Created!',
          text: 'Your quiz has been successfully created.',
          confirmButtonText: 'OK'
        }).then(() => {
          // Optionally, reset the form or redirect the user
          this.quizForm.reset();
        });
      }
    });
  }
}
