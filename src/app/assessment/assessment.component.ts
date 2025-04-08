import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-assessment',
  imports: [CommonModule,FormsModule,BrowserModule],
  templateUrl: './assessment.component.html',
  styleUrl: './assessment.component.css'
})
export class AssessmentComponent {
  termsAccepted: boolean = false;
  proceedClicked: boolean = false;
  questions: any[] = [];
  currentQuestionIndex: number = 0;
  isAssessmentComplete: boolean = false;
  userScore: number = 0;
  canSubmit: boolean = false;

  currentAnswer: string ='';

  allQuestions: any[] = [
    { id: 1, question: "Which of the following is the correct way to declare a variable in C#?", options: ["int x = 10;", "int 10 = x;", "x int = 10;", "10 = int x;"], correctAnswer: "int x = 10;", selectedAnswer: null },
    { id: 2, question: "What does 'int' mean in C#?", options: ["Integer", "String", "Character", "Object"], correctAnswer: "Integer", selectedAnswer: null },  
  ];

  toggleTerms() {
    this.termsAccepted = !this.termsAccepted;
  }

  proceedToQuestions() {
    const randomQuestions = this.getRandomQuestions(10);
    this.questions = randomQuestions;
    this.proceedClicked = true;
  }

  getRandomQuestions(numberOfQuestions: number): any[] {
    const shuffledQuestions = [...this.allQuestions].sort(() => Math.random() - 0.5); // Shuffle the array
    return shuffledQuestions.slice(0, numberOfQuestions); // Get first `numberOfQuestions` items
  }

  goToQuestion(index: number) {
    this.currentQuestionIndex = index;
  }

  nextQuestion() {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
    }
  }

  

  previousQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
    }
  }

  clearAnswer() {
    this.questions[this.currentQuestionIndex].selectedAnswer = null;
  }

  saveAnswer(questionId: number, selectedOption: string) {
    const question = this.questions.find(q => q.id === questionId);
    if (question) {
      question.selectedAnswer = selectedOption;
    }
    this.checkIfCanSubmit();
  }

  checkIfCanSubmit() {
    this.canSubmit = this.questions.every(q => q.selectedAnswer != null);
  }

  submitAssessment() {
    this.userScore = 0;

    this.questions.forEach(question => {
      if (question.selectedAnswer === question.correctAnswer) {
        this.userScore++;
      }
    });

    this.isAssessmentComplete = true;
    if (this.userScore >= 7) {
      alert('Successfully qualified the exam!');
    } else {
      alert('You did not qualify. Please try again after 24 hours.');
    }
  }
}