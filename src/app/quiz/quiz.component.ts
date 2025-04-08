import { Component } from '@angular/core';
import { InstructorNavbarComponent } from "../Instructor/instructor-navbar/instructor-navbar.component";

@Component({
  selector: 'app-quiz',
  imports: [InstructorNavbarComponent],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css'
})
export class QuizComponent {

}
