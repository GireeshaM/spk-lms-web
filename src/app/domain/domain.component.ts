import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-domain',
  imports: [CommonModule],
  templateUrl: './domain.component.html',
  styleUrl: './domain.component.css'
})
export class DomainComponent {
  courses = [
    { title: 'Data Science', count: 425, image: 'assets/data-science.jpg' },
    { title: 'Business', count: 1095, image: 'assets/business.jpg' },
    { title: 'Computer Science', count: 668, image: 'assets/computer-science.jpg' },
    { title: 'Health', count: 471, image: 'assets/health.jpg' },
    { title: 'Social Sciences', count: 401, image: 'assets/social-sciences.jpg' },
    { title: 'Personal Development', count: 137, image: 'assets/personal-development.jpg' },
    { title: 'Arts and Humanities', count: 338, image: 'assets/arts-humanities.jpg' },
    { title: 'Physical Science and Engineering', count: 413, image: 'assets/physical-science.jpg' },
    { title: 'Language Learning', count: 150, image: 'assets/language-learning.jpg' },
    { title: 'Information Technology', count: 145, image: 'assets/information-technology.jpg' },
    { title: 'Math and Logic', count: 70, image: 'assets/math-logic.jpg' }
  ];
}
