import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostListener, Output } from '@angular/core';

@Component({
  selector: 'app-assess',
  imports: [CommonModule],
  templateUrl: './assess.component.html',
  styleUrls: ['./assess.component.css']
})
export class AssessComponent {
  @Output() examInProgress=new EventEmitter<boolean>();
  showTerms = true;
  cameraAccessGranted = false;
  questions = [
    { id: 1, question: "Which of the following is a correct variable declaration in C#?", options: ["int x = 10;", "int 10 = x;", "x int = 10;", "10 = int x;"], correctAnswer: "int x = 10;", selectedAnswer: "", markedForReview: false },
    { id: 2, question: "What does 'int' mean in C#?", options: ["Integer", "String", "Character", "Object"], correctAnswer: "Integer", selectedAnswer: "", markedForReview: false },
    { id: 3, question: "Which keyword is used for a method that does not return any value?", options: ["void", "return", "static", "public"], correctAnswer: "void", selectedAnswer: "", markedForReview: false },
    { id: 4, question: "Which operator is used for logical AND in C#?", options: ["&&", "||", "&", "|"], correctAnswer: "&&", selectedAnswer: "", markedForReview: false },
    { id: 5, question: "What is the default access modifier of a class in C#?", options: ["private", "public", "internal", "protected"], correctAnswer: "internal", selectedAnswer: "", markedForReview: false },
    { id: 6, question: "Which data type is used to store true/false values?", options: ["bool", "int", "string", "char"], correctAnswer: "bool", selectedAnswer: "", markedForReview: false },
    { id: 7, question: "Which keyword is used to define a constant in C#?", options: ["const", "static", "final", "var"], correctAnswer: "const", selectedAnswer: "", markedForReview: false },
    { id: 8, question: "Which method is called when an object is created?", options: ["Constructor", "Destructor", "Main", "Finalize"], correctAnswer: "Constructor", selectedAnswer: "", markedForReview: false },
    { id: 9, question: "Which loop is used when the number of iterations is known?", options: ["for", "while", "do-while", "foreach"], correctAnswer: "for", selectedAnswer: "", markedForReview: false },
    { id: 10, question: "Which symbol is used for single-line comments in C#?", options: ["//", "/*", "--", "#"], correctAnswer: "//", selectedAnswer: "", markedForReview: false }
  ];

  currentQuestionIndex: number = 0;
  isAssessmentComplete = false;
  userScore = 0;
  canSubmit = false;
  isExamInProgress = false;

  minutes = 10;
  seconds = 0;
  timer: any;

  constructor() {}

  // Method to mark the current question for review
  markForReview() {
    const question = this.questions[this.currentQuestionIndex];
    question.markedForReview = !question.markedForReview; // Toggle the 'markedForReview' flag
    console.log(`Question ${question.id} marked for review: ${question.markedForReview}`);
  }

  // Start the exam and request camera & microphone permissions
  startExam() {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(() => {
        this.cameraAccessGranted = true;
        this.isExamInProgress = true;  // Set flag to true when exam starts
        this.examInProgress.emit(this.isExamInProgress);  // Emit event to AppComponent
        this.showTerms = false;
        this.startTimer();
        this.enterFullScreen();
      })
      .catch(() => {
        alert("Camera and Microphone access is required to start the exam.");
      });
  }

  // Start the timer for the exam
  startTimer() {
    this.timer = setInterval(() => {
      if (this.seconds === 0) {
        if (this.minutes === 0) {
          this.submitAssessment();
        } else {
          this.minutes--;
          this.seconds = 59;
        }
      } else {
        this.seconds--;
      }
    }, 1000);
  }

  // Go to a specific question
  goToQuestion(index: number) {
    this.currentQuestionIndex = index;
  }

  // Save the selected answer for a question
  saveAnswer(questionId: number, selectedOption: string) {
    const question = this.questions.find(q => q.id === questionId);
    if (question) {
      question.selectedAnswer = selectedOption;
    }
    this.checkIfCanSubmit();
  }

  // Check if the user can submit the assessment
  checkIfCanSubmit() {
    this.canSubmit = this.questions.every(q => q.selectedAnswer !== "");
  }

  // Submit the assessment and calculate the score
  submitAssessment() {
    clearInterval(this.timer);
    this.userScore = this.questions.filter(q => q.selectedAnswer === q.correctAnswer).length;
    this.isAssessmentComplete = true;
    this.isExamInProgress = false;  // Reset flag when the exam ends
    this.examInProgress.emit(this.isExamInProgress);
  }

  // Return to the home page or another route
  returnToHome() {
    window.location.href = "/"; // Adjust according to your routing
  }

  // Enter full-screen mode (handling different browser-specific implementations)
  enterFullScreen() {
    const elem = document.documentElement as any; // Casting to 'any' to avoid TypeScript errors

    if (elem.requestFullscreen) {
      elem.requestFullscreen(); // Standard
    } else if (elem.mozRequestFullScreen) { // Firefox
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) { // Chrome, Safari, Opera
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { // IE/Edge
      elem.msRequestFullscreen();
    }
  }
}
