import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdminNavComponent } from "../../admin/admin-nav/admin-nav.component";

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
  isLiked: boolean;  // Track if the review is liked
}

@Component({
  selector: 'app-course-reviews-feedback',
  imports: [CommonModule, FormsModule, AdminNavComponent],
  templateUrl: './course-reviews-feedback.component.html',
  styleUrl: './course-reviews-feedback.component.css'
})
export class CourseReviewsFeedbackComponent implements OnInit {
  reviews: Review[] = [
    { id: 1, studentName: 'Ram', studentImage: 'https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg', message: 'This course was very helpful!', instructorName: 'Dr. Smith', courseName: 'Angular Basics', adminRead: true, likes: 12, adminReply: 'Glad you found it useful!', timestamp: new Date('2025-02-25T10:30:00'), isLiked: false },
    { id: 2, studentName: 'Monish', studentImage: 'https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg', message: 'I love the interactive quizzes!', instructorName: 'Prof. John', courseName: 'Advanced Angular', adminRead: false, likes: 20, timestamp: new Date('2025-02-24T12:00:00'), isLiked: false },
    { id: 3, studentName: 'Sita', studentImage: 'assets/student3.jpg', message: 'Amazing course content!', instructorName: 'Krihna', courseName: 'AWS', adminRead: true, likes: 30, timestamp: new Date('2025-02-23T15:45:00'), isLiked: false },
    { id: 4, studentName: 'Kumar', studentImage: 'assets/student4.jpg', message: 'Great explanations on concepts!', instructorName: 'Rajesh', courseName: 'Angular Basics', adminRead: false, likes: 15, timestamp: new Date('2025-02-22T14:20:00'), isLiked: false },
    { id: 5, studentName: 'Priya', studentImage: 'assets/student5.jpg', message: 'The assignments were really challenging.', instructorName: 'Dr. Smith', courseName: 'Angular Basics', adminRead: true, likes: 25, timestamp: new Date('2025-02-21T11:00:00'), isLiked: false },
    { id: 6, studentName: 'Alok', studentImage: 'assets/student6.jpg', message: 'I enjoyed the practical examples in the course.', instructorName: 'Prof. John', courseName: 'Advanced Angular', adminRead: false, likes: 10, timestamp: new Date('2025-02-20T13:10:00'), isLiked: false },
    { id: 7, studentName: 'Nina', studentImage: 'assets/student7.jpg', message: 'The course material was well-organized.', instructorName: 'Dr. Smith', courseName: 'Angular Basics', adminRead: true, likes: 35, timestamp: new Date('2025-02-19T12:30:00'), isLiked: false },
    { id: 8, studentName: 'Vishal', studentImage: 'assets/student8.jpg', message: 'I learned a lot from the quizzes and tests.', instructorName: 'Prof. John', courseName: 'Advanced Angular', adminRead: false, likes: 18, timestamp: new Date('2025-02-18T10:00:00'), isLiked: false },
    { id: 9, studentName: 'Ayesha', studentImage: 'assets/student9.jpg', message: 'Good examples, but the pace was fast.', instructorName: 'Dr. Smith', courseName: 'Angular Basics', adminRead: true, likes: 14, timestamp: new Date('2025-02-17T16:00:00'), isLiked: false },
    { id: 10, studentName: 'Deepak', studentImage: 'assets/student10.jpg', message: 'The course was amazing, I loved it!', instructorName: 'Kumar', courseName: 'Advanced Angular', adminRead: false, likes: 50, timestamp: new Date('2025-02-16T09:30:00'), isLiked: false }
  ];

  filteredReviews: Review[] = [];
  searchQuery: string = '';
  filterType: string = 'latest';
  selectedInstructor: string = 'all';
  selectedCourse: string = 'all';
  startDate: string = '';
  endDate: string = '';
  
  instructors: string[] = [];
  courses: string[] = [];
  
  currentPage: number = 1;
  reviewsPerPage: number = 10;
  totalPages: number = Math.ceil(this.reviews.length / this.reviewsPerPage);

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
    review.isLiked = !review.isLiked;
    review.likes += review.isLiked ? 1 : -1;
  }

  replyToReview(review: Review, replyBox: HTMLTextAreaElement): void {
    if (replyBox.value.trim() !== '') {
      review.adminReply = replyBox.value;
      replyBox.value = ''; // Clear textarea after submitting
    }
  }

  applyFilter(): void {
    let tempReviews = [...this.reviews];

    // Filter by instructor and course
    if (this.selectedInstructor !== 'all') {
      tempReviews = tempReviews.filter(review => review.instructorName === this.selectedInstructor);
    }

    if (this.selectedCourse !== 'all') {
      tempReviews = tempReviews.filter(review => review.courseName === this.selectedCourse);
    }

    // Filter by date range
    if (this.startDate) {
      const startDate = new Date(this.startDate);
      tempReviews = tempReviews.filter(review => review.timestamp >= startDate);
    }

    if (this.endDate) {
      const endDate = new Date(this.endDate);
      tempReviews = tempReviews.filter(review => review.timestamp <= endDate);
    }

    // Sort by filter type
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

    this.totalPages = Math.ceil(tempReviews.length / this.reviewsPerPage);
    this.filteredReviews = tempReviews.slice((this.currentPage - 1) * this.reviewsPerPage, this.currentPage * this.reviewsPerPage);
  }

  searchReviews(): void {
    this.filteredReviews = this.reviews.filter(review =>
      review.studentName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      review.message.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      (review.adminReply && review.adminReply.toLowerCase().includes(this.searchQuery.toLowerCase()))
    );
    this.applyFilter();
  }

  changePage(direction: string): void {
    if (direction === 'previous' && this.currentPage > 1) {
      this.currentPage--;
    } else if (direction === 'next' && this.currentPage < this.totalPages) {
      this.currentPage++;
    }
    this.applyFilter();
  }
}
