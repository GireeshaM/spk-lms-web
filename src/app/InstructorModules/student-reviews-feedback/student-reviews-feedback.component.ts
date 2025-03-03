import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

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
  selector: 'app-student-reviews-feedback',
  imports: [CommonModule,FormsModule],
  templateUrl: './student-reviews-feedback.component.html',
  styleUrl: './student-reviews-feedback.component.css'
})
export class StudentReviewsFeedbackComponent implements OnInit{
    reviews: Review[] = [
      {
        id: 1,
        studentName: 'Ram',
        studentImage: 'assets/student1.jpg',
        message: 'This course was very helpful!',
        adminRead: true,
        likes: 12,
        adminReply: 'Glad you found it useful!',
        timestamp: new Date('2025-02-25T10:30:00')
      },
      {
        id: 2,
        studentName: 'Monish',
        studentImage: 'assets/student2.jpg',
        message: 'I love the interactive quizzes!',
        adminRead: false,
        likes: 20,
        timestamp: new Date('2025-02-24T12:00:00')
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
        replyBox.value = ''; // Clear textarea after submitting
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
