import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-faqs',
  imports: [CommonModule],
  templateUrl: './faqs.component.html',
  styleUrl: './faqs.component.css'
})
export class FaqsComponent {
  faqs = [
    { question: 'What is a Learning Management System (LMS)?', answer: 'An LMS is a software application that helps organizations create, manage, and deliver educational courses and training programs online.' },
    { question: 'How can I enroll in a course?', answer: 'To enroll, simply navigate to the course page and click on the "Enroll Now" button. Follow the instructions to complete the registration.' },
    { question: 'Is there a mobile app for the LMS?', answer: 'Yes, our LMS has a mobile app available on iOS and Android, allowing you to learn on the go.' },
    { question: 'Can I track my progress in a course?', answer: 'Yes, the LMS provides progress tracking and completion certificates upon finishing a course.' },
    { question: 'Do courses have deadlines?', answer: 'Some courses have deadlines, while others are self-paced. Check the course details for more information.' },
    { question: 'How can I reset my password?', answer: 'Go to the login page, click on "Forgot Password," and follow the instructions to reset your password.' }
  ];

  activeIndex: number | null = null;

  toggleFAQ(index: number) {
    this.activeIndex = this.activeIndex === index ? null : index;
  }
}