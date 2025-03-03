import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-couresefound',
  imports: [CommonModule],
  templateUrl: './couresefound.component.html',
  styleUrl: './couresefound.component.css'
})
export class CouresefoundComponent {

  title = '.Net Full Stack Foundation';
  instructor = 'Board Infinity';
  enrolled = 14182;
  rating = 4.1;
  reviews = 235;
  level = 'Beginner level';
  duration = '17 hours to complete';
  schedule = 'Flexible schedule';
  modules = 3;
  learningPoints = [
    'Understand .NET framework: Master ASP.NET for dynamic web apps, emphasizing web forms, server controls, and data-driven techniques.',
    'Advanced C# concepts: Master object-oriented principles like inheritance, polymorphism; and techniques like extension methods.',
    'Proficiency in C#: Learn data types, variables, operators, and control program flow using conditionals and loops efficiently.',
    'Delve into advanced exception handling techniques, create custom exceptions, and seamlessly implement asynchronous C# code.'
  ];

  
}
