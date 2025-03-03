import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-coursesp',
  imports: [CommonModule],
  templateUrl: './coursesp.component.html',
  styleUrl: './coursesp.component.css'
})
export class CoursespComponent implements OnInit {
  enrolledCourses: any[] = [];
  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.courseService.enrolledCourses$.subscribe(courses => {
      this.enrolledCourses = courses;
    });
  }
  courses = [
    {
      image: 'https://creator-assets.codedamn.com/derekbanas-63796f676feec300086cfd56/COURSE_IMAGE/2022-11-22/80e902969cb0aa8fd8378a9a47275f9723cb5af1', // Replace with actual image URL
      title: 'C++ Programming Bootcamp - The Complete C Language Course',
      description:'Raya Rajesh',
      rating: 4.5,
      reviews: '8,676',
      details: '44 total hours · 396 lectures · All Levels',
      price: 449,
      originalPrice: 3099,
      isBestseller: true,
      isWishlisted: false,
      isPopular: true // Add this property
    },
    {
      image: 'https://miro.medium.com/v2/resize:fit:1200/1*8PdwGX_ERKf4DmqlGEIikA.png', // Replace with actual image URL
      title: 'Mastering Data Structures & Algorithms using C and C++',
      description: 'Chinvi',
      rating: 4.6,
      reviews: '52,767',
      details: '58.5 total hours · 390 lectures · All Levels',
      price: 499,
      originalPrice: 3499,
      isBestseller: false,
      isWishlisted: false,
      isPopular: true // Add this property
    },
    {
      image: 'https://learnprogramming.academy/wp-content/uploads/2024/12/2800976_98e5-1-450x253.jpg',
      title: 'Mastering  C ',
      description:'U Shushma',
      rating: 4.3,
      reviews: '73',
      details: '37 total hours · 313 lectures · Beginner',
      price: 449,
      originalPrice: 1999,
      isBestseller: true,
      isWishlisted: false,
      isPopular: true // Add this property
    },
    {
      image: 'https://365datascience.com/resources/blog/2019-10-python-everything-you-should-know-1024x576.jpg', // Replace with actual image URL
      title: 'Learn Python Programming',
      description: 'B Revathi',
      rating: 4.7,
      reviews: '15,892',
      details: '30 total hours · 150 lectures · Beginner',
      price: 399,
      originalPrice: 2999,
      isBestseller: false,
      isWishlisted: false,
      isPopular: true // Add this property
    },
    {
      image: 'https://media.geeksforgeeks.org/wp-content/cdn-uploads/20230318230239/Python-Data-Science-Tutorial.jpg', // Replace with actual image URL
      title: 'Data Science with Python',
      description: 'K Risitha',
      rating: 4.8,
      reviews: '22,342',
      details: '50 total hours · 200 lectures · Intermediate',
      price: 599,
      originalPrice: 3999,
      isBestseller: true,
      isWishlisted: false,
      isPopular: false // Add this property
    }
  ];

  toggleWishlist(course: any) {
    course.isWishlisted = !course.isWishlisted;
  }

  addToCart(course: any) {
    alert(`Added "${course.title}" to your cart!`);
  }
}