import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
interface Course {
  id: number;
  title: string;
  image: string;
  instructor: string;
  rating: number;
}
@Component({
  selector: 'app-wishlist',
  imports: [CommonModule, RouterLink],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent implements OnInit {
  wishlist: Course[] = [];
  suggestedCourses: Course[] = [];
  ngOnInit(): void {
    // Fetch wishlist
    const storedWishlist = localStorage.getItem('wishlist');
    this.wishlist = storedWishlist ? JSON.parse(storedWishlist) : [];
    // Default wishlist items if empty
    if (this.wishlist.length === 0) {
      this.wishlist = [
        { id: 1, title: 'Angular Basics', image: 'images/angular.png', instructor: 'John Doe', rating: 4.5 },
        { id: 2, title: 'React for Beginners', image: 'images/react.png', instructor: 'Jane Smith', rating: 4.7 }
      ];
    }
    this.suggestedCourses = [
      { id: 3, title: 'Advanced JavaScript', image: 'images/advjs.jpg', instructor: '', rating: 4.6 },
      { id: 4, title: 'UX/UI Design Basics', image: 'images/html.jpg', instructor: '', rating: 4.5 }
    ];
  }
  removeFromWishlist(courseId: number) {
    this.wishlist = this.wishlist.filter(course => course.id !== courseId);
    localStorage.setItem('wishlist', JSON.stringify(this.wishlist));
  }
  goToCourse(courseId: number) {
    console.log(`Navigate to course with ID: ${courseId}`);
  }
}