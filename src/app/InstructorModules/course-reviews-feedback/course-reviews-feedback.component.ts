import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdminNavComponent } from "../../admin/admin-nav/admin-nav.component";

interface Review {
  id: number;
  studentName: string;
  studentImage: string;
  message: string;
  adminRead: boolean;
  likes: number;
  adminReply?: string;
  timestamp: Date;
}


@Component({
  selector: 'app-course-reviews-feedback',
  imports: [CommonModule, FormsModule, AdminNavComponent],
  templateUrl: './course-reviews-feedback.component.html',
  styleUrl: './course-reviews-feedback.component.css'
})
export class CourseReviewsFeedbackComponent implements OnInit {
  reviews: Review[] = [
    {
      id: 1,
      studentName: 'Ram',
      studentImage: 'assets/student1.jpg',
      message: 'This course was amazing! The instructor explained everything clearly.',
      adminRead: true,
      likes: 35,
      adminReply: 'Glad you enjoyed it!',
      timestamp: new Date('2025-02-27 T10:30:00')
    },
    {
      id: 2,
      studentName: 'Monish',
      studentImage: 'assets/student2.jpg',
      message: 'I love the quizzes and interactive lessons!',
      adminRead: false,
      likes: 42,
      timestamp: new Date('2025-02-24T12:00:00')
    },
    {
      id: 3,
      studentName: 'Naveen',
      studentImage: 'assets/student3.jpg',
      message: 'The video content was a bit slow, but overall a great course.',
      adminRead: false,
      likes: 15,
      timestamp: new Date('2025-02-23T15:45:00')
    },
    {
      id: 4,
      studentName: 'Basha',
      studentImage: 'assets/student4.jpg',
      message: 'Highly recommended! The practical exercises were very useful.',
      adminRead: true,
      likes: 50,
      adminReply: 'Happy to hear that!',
      timestamp: new Date('2025-02-22T09:20:00')
    }
  ];

  filteredReviews: Review[] = [...this.reviews];
  searchQuery: string = '';
  filterType: string = 'latest';

  constructor() {}

  ngOnInit(): void {
    this.applyFilter();
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
      replyBox.value = ''; // Clear the textarea after submitting
    }
  }

  applyFilter(): void {
    switch (this.filterType) {
      case 'mostLiked':
        this.filteredReviews = [...this.reviews].sort((a, b) => b.likes - a.likes);
        break;
      case 'topRated':
        this.filteredReviews = [...this.reviews].sort((a, b) => b.likes - a.likes); // Assuming top-rated is based on likes
        break;
      case 'mostRelevant':
        this.filteredReviews = [...this.reviews]; // Implement relevance logic if needed
        break;
      case 'latest':
      default:
        this.filteredReviews = [...this.reviews].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
        break;
    }
  }

  searchReviews(): void {
    this.filteredReviews = this.reviews.filter(review =>
      review.studentName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      review.message.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      (review.adminReply && review.adminReply.toLowerCase().includes(this.searchQuery.toLowerCase()))
    );
  }
}