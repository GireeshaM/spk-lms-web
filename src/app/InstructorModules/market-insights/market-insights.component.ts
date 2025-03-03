import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AdminNavComponent } from '../../admin/admin-nav/admin-nav.component';

@Component({
  selector: 'app-market-insights',
  imports: [CommonModule,AdminNavComponent],
  templateUrl: './market-insights.component.html',
  styleUrl: './market-insights.component.css'
})
export class MarketInsightsComponent {
  courses = [
    { title: 'Angular Fundamentals', category: 'Web Development', instructor: 'John Doe', students: 120,active: true, updated: false , views: 5000, completed: 300, ratings: 4.5, image: 'https://5mins.org/wp-content/uploads/2020/09/Why-are-more-and-more-developers-learning-AngularJS.jpg' },
    { title: 'React for Beginners', category: 'Web Development', instructor: 'Jane Smith', students: 90,active: false, updated: true , views: 4000, completed: 250, ratings: 4.7, image: 'https://www.tatvasoft.com/blog/wp-content/uploads/2022/07/Why-Use-React.jpg' },
    { title: 'Vue.js Mastery', category: 'Web Development', instructor: 'Mark Wilson', students: 75,active: true, updated: true , views: 3000, completed: 200, ratings: 4.6, image: 'https://codingmart.com/wp-content/uploads/2024/01/image_2024-01-24_142224335.png' },
    { title: 'Node.js & Express', category: 'Backend Development', instructor: 'Emily Brown', students: 110, active: false, updated: true ,views: 6000, completed: 350, ratings: 4.8, image: 'https://railsware.com/blog/wp-content/uploads/2018/09/2400%D1%851260-rw-blog-node-js.png' },
    { title: 'Data Science with Python', category: 'Data Science', instructor: 'Michael Johnson', students: 150,active: true, updated: false , views: 7000, completed: 500, ratings: 4.9, image: 'https://www.datasciencecentral.com/wp-content/uploads/2021/10/9430449274.png' }
  ];

  totalCourses = this.courses.length;
  activeCourses = this.courses.filter(course => course.active).length;
  updatedCourses = this.courses.filter(course => course.updated).length;

  filteredCourses = [...this.courses]; // Start with all courses
  categories = [...new Set(this.courses.map(course => course.category))]; // Get unique categories

  // Sorting Function
  sortCourses(event: Event) {
    const target = event.target as HTMLSelectElement;
    const criteria = target.value;

    if (criteria === 'views') {
      this.filteredCourses.sort((a, b) => b.views - a.views);
    } else if (criteria === 'completed') {
      this.filteredCourses.sort((a, b) => b.completed - a.completed);
    } else if (criteria === 'ratings') {
      this.filteredCourses.sort((a, b) => b.ratings - a.ratings);
    }
  }

  // Search Function
  searchCourses(event: Event) {
    const searchText = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredCourses = this.courses.filter(course =>
      course.title.toLowerCase().includes(searchText) ||
      course.instructor.toLowerCase().includes(searchText)
    );
  }

  // Filter by Category
  filterByCategory(event: Event) {
    const selectedCategory = (event.target as HTMLSelectElement).value;
    if (selectedCategory) {
      this.filteredCourses = this.courses.filter(course => course.category === selectedCategory);
    } else {
      this.filteredCourses = [...this.courses]; // Reset to all courses
    }
  }
}