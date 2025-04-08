import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Review {
  id: number;
  studentName: string;
  studentImage: string;
  message: string;
  instructorName: string;
  courseName: string;
  adminRead: boolean;
  likes: number;
  adminReply?: string;
  timestamp: Date;
}

@Component({
  selector: 'app-student-reviews-feedback',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './student-reviews-feedback.component.html',
  styleUrls: ['./student-reviews-feedback.component.css']
})
export class StudentReviewsFeedbackComponent implements OnInit {
  reviews: Review[] = [
    { id: 1, studentName: 'Ram', studentImage: 'assets/student1.jpg', message: 'This course was very helpful!', instructorName: 'Dr. Smith', courseName: 'Angular Basics', adminRead: true, likes: 12, adminReply: 'Glad you found it useful!', timestamp: new Date('2025-02-25T10:30:00') },
    { id: 2, studentName: 'Monish', studentImage: 'assets/student2.jpg', message: 'I love the interactive quizzes!', instructorName: 'Prof. John', courseName: 'Advanced Angular', adminRead: false, likes: 20, timestamp: new Date('2025-02-24T12:00:00') },
    { id: 3, studentName: 'Sita', studentImage: 'assets/student3.jpg', message: 'Amazing course content!', instructorName: 'Dr. Smith', courseName: 'Angular Basics', adminRead: true, likes: 30, timestamp: new Date('2025-02-23T15:45:00') }
  ];

  filteredReviews: Review[] = [...this.reviews];
  searchQuery: string = '';
  filterType: string = 'latest';
  selectedInstructor: string = 'all';
  selectedCourse: string = 'all';
  
  instructors: string[] = [];
  courses: string[] = [];

  constructor() {}

  ngOnInit(): void {
    this.extractUniqueValues();
    this.applyFilter();
  }

  extractUniqueValues(): void {
    this.instructors = [...new Set(this.reviews.map(r => r.instructorName))];
    this.courses = [...new Set(this.reviews.map(r => r.courseName))];
  }

  toggleReadStatus(review: Review): void {
    review.adminRead = !review.adminRead;
  }

  likeReview(review: Review): void {
    review.likes += 1;
  }

  replyToReview(review: Review, replyBox: HTMLTextAreaElement): void {
    if (replyBox.value.trim() !== '') {
      review.adminReply = replyBox.value;
      replyBox.value = ''; 
    }
  }

  applyFilter(): void {
    let tempReviews = [...this.reviews];

    if (this.selectedInstructor !== 'all') {
      tempReviews = tempReviews.filter(review => review.instructorName === this.selectedInstructor);
    }

    if (this.selectedCourse !== 'all') {
      tempReviews = tempReviews.filter(review => review.courseName === this.selectedCourse);
    }

    switch (this.filterType) {
      case 'mostLiked':
        tempReviews.sort((a, b) => b.likes - a.likes);
        break;
      case 'topRated':
        tempReviews.sort((a, b) => b.likes - a.likes);
        break;
      case 'latest':
      default:
        tempReviews.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
        break;
    }

    this.filteredReviews = tempReviews;
  }

  searchReviews(): void {
    this.filteredReviews = this.reviews.filter(review =>
      review.studentName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      review.message.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      (review.adminReply && review.adminReply.toLowerCase().includes(this.searchQuery.toLowerCase()))
    );
  }
}
