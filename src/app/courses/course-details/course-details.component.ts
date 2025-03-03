import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css'],
  imports:[CommonModule]
})
export class CourseDetailsComponent implements OnInit {
  showAll = false; 
  showAllSections = false; 
  maxSections = 6; 
  expanded=false;
  courseRating = 4.4;
  totalRatings = '37K';
  sections = [
    {
      title: 'Introduction',
      lectures: [
        { title: 'Welcome to Class!', duration: '12:12', type: 'video' },
        { title: 'Class Organization', duration: '05:52', type: 'video' },
        { title: 'Fundamentals of a Program', duration: '17:53', type: 'video' },
        { title: 'Overview', duration: '13:40', type: 'notes' },
        { title: 'Language Features', duration: '12:08', type: 'video' },
        { title: 'Creating a C Program', duration: '16:27', type: 'video' },
        { title: 'Quiz 1', duration: '', type: 'quiz' }
      ]
    },
    {
      title: 'Variables and Data Types',
      lectures: [
        { title: 'Variables and Data Types', duration: '14:47', type: 'video' },
        { title: 'Examples of Variables', duration: '9:35', type: 'video' },
        { title: 'Notes on Variables', duration: '2:00', type: 'notes' },
        { title: 'Data Types', duration: '1:35', type: 'video' },
        { title: 'Types of Data Types', duration: '19:35', type: 'video' },
        { title: 'Examples of Data Types', duration: '9:35', type: 'video' },
        { title: 'Notes on Data Types', duration: '2:00', type: 'notes' },
        { title: 'Quiz 2', duration: '', type: 'quiz' }
      ]
    },
    {
      title: 'Operators and Expressions',
      lectures: [
        { title: 'Introduction to Operators', duration: '10:15', type: 'video' },
        { title: 'Arithmetic Operators', duration: '12:30', type: 'video' },
        { title: 'Logical Operators', duration: '11:45', type: 'video' },
        { title: 'Bitwise Operators', duration: '13:20', type: 'video' },
        { title: 'Conditional and Assignment Operators', duration: '10:50', type: 'video' },
        { title: 'Operator Precedence', duration: '14:10', type: 'video' },
        { title: 'Quiz 3', duration: '', type: 'quiz' }
      ]
    },
    {
      title: 'Control Flow',
      lectures: [
        { title: 'Decision Making', duration: '12:40', type: 'video' },
        { title: 'If-Else Statements', duration: '14:05', type: 'video' },
        { title: 'Switch Case', duration: '10:30', type: 'video' },
        { title: 'Loops in C', duration: '15:20', type: 'video' },
        { title: 'Break and Continue', duration: '8:55', type: 'video' },
        { title: 'Quiz 4', duration: '', type: 'quiz' }
      ]
    },
    {
      title: 'Functions',
      lectures: [
        { title: 'Introduction to Functions', duration: '10:10', type: 'video' },
        { title: 'Function Declaration and Definition', duration: '11:45', type: 'video' },
        { title: 'Passing Parameters', duration: '13:25', type: 'video' },
        { title: 'Recursion', duration: '12:40', type: 'video' },
        { title: 'Inline Functions', duration: '9:30', type: 'video' },
        { title: 'Quiz 5', duration: '', type: 'quiz' }
      ]
    },
    {
      title: 'Arrays and Strings',
      lectures: [
        { title: 'Introduction to Arrays', duration: '12:35', type: 'video' },
        { title: 'Multidimensional Arrays', duration: '13:40', type: 'video' },
        { title: 'String Handling', duration: '15:10', type: 'video' },
        { title: 'String Manipulation Functions', duration: '14:50', type: 'video' },
        { title: 'Quiz 6', duration: '', type: 'quiz' }
      ]
    },
    {
      title: 'Pointers',
      lectures: [
        { title: 'Understanding Pointers', duration: '16:20', type: 'video' },
        { title: 'Pointer Arithmetic', duration: '14:45', type: 'video' },
        { title: 'Pointers and Functions', duration: '13:55', type: 'video' },
        { title: 'Pointers and Arrays', duration: '12:30', type: 'video' },
        { title: 'Quiz 7', duration: '', type: 'quiz' }
      ]
    },
    {
      title: 'Structures and Unions',
      lectures: [
        { title: 'Introduction to Structures', duration: '12:30', type: 'video' },
        { title: 'Nested Structures', duration: '13:40', type: 'video' },
        { title: 'Introduction to Unions', duration: '11:25', type: 'video' },
        { title: 'Differences Between Structures and Unions', duration: '10:55', type: 'video' },
        { title: 'Quiz 8', duration: '', type: 'quiz' }
      ]
    }
  ];
  

  get displayedSections() {
    return this.showAllSections
      ? this.sections
      : this.sections.slice(0, this.maxSections);
  }

  toggleSections() {
    this.showAllSections = !this.showAllSections;
  }

  getIconClass(type: string): string {
    switch (type) {
      case 'video':
        return 'icon-video';
      case 'quiz':
        return 'icon-quiz';
      case 'notes':
        return 'icon-notes';
      default:
        return '';
    }
  }
  // Define C Programming course data
  course = {
    title: 'C Programming for Beginners',
    description:
      'Learn the fundamentals of C programming, from basic syntax to advanced concepts.',
    ratings: 4.7,
    enrolled: 15400,
    language: 'English',
    price: 999,
    instructor: {
      name: 'Jane Smith',
      bio: 'Experienced software developer with a passion for teaching C programming.',
      photo: 'jane-smith.jpg', // Replace with the path to the instructor's photo
    },
  }

  constructor() {}

  ngOnInit(): void {
    
  }
  features = [
    { iconClass: 'icon-video', text: '25.5 hours on-demand video' },
    { iconClass: 'icon-article', text: '2 articles' },
    { iconClass: 'icon-download', text: '24 downloadable resources' },
    { iconClass: 'icon-mobile', text: 'Access on mobile and TV' },
    { iconClass: 'icon-certificate', text: 'Certificate of completion' },
  ];
  instructor = {
    name: 'Jason Fedin',
    title: 'Instructor / Software Developer',
    imageUrl: 'https://img-c.udemycdn.com/user/200_H/30647118_d596.jpg', // Replace with the actual path
    rating: 4.4,
    reviews: '44,694',
    students: '252,062',
    courses: 5,
    bio: `I have been teaching students for over 12 years via online classes at over 10 different online Universities. 
      I have created many different class curriculums, ranging from mobile programming to bash scripting to Object-Oriented Design.
      I have also instructed over 20 different Computer Science related classes. I have been developing software for over 
      16 years in the real world at various companies, specializing in Object-Oriented Development and Mobile Applications.
      I have been programming Android Applications since 2010. I love teaching classes at Udemy and other online universities. 
      In addition to teaching, I also currently have a full-time job as a Software Developer at a Fortune 500 company.`,
  };

  toggleBio() {
    this.expanded = !this.expanded;
  }
  reviews = [
    {
      name: 'Maria O.',
      time: 'a week ago',
      rating: 5,
      comment: 'It was good, easy in the beginning since I have a background in C++ and then it got harder and it was good to learn more about pointers.',
      expanded: false,
      liked: false,
      disliked: false,
    },
    {
      name: 'Rohit S.',
      time: 'a week ago',
      rating: 4,
      comment: 'I find the course content to be good and well structured and instructor well informed, lots of code examples and demos help a lot.',
      expanded: false,
      liked: false,
      disliked: false,
    },
    {
      name: 'Sidharth B.',
      time: '3 weeks ago',
      rating: 5,
      comment: 'This course is great for grasping the basics of the C programming language. I will recommend this course to anyone who has no idea on how to C program. The course takes you through basic topics until pointers and beyond.',
      expanded: false,
      liked: false,
      disliked: false,
    },
    {
      name: 'Michael N.',
      time: 'a month ago',
      rating: 3,
      comment: 'It covers all the basics of the language, but even if it is advertised as a beginner\'s course, I still would\'ve liked to see some more complex examples and exercises with actual real-world use-cases.',
      expanded: false,
      liked: false,
      disliked: false,
    },
  ];

  getStars(rating: number): number[] {
    return Array.from({ length: rating }, (_, i) => i + 1);
  }

  toggleReview(review: any): void {
    review.expanded = !review.expanded;
  }

  toggleLikeDislike(review: any, action: 'like' | 'dislike'): void {
    if (action === 'like') {
      review.liked = !review.liked;
      if (review.liked) {
        review.disliked = false;
      }
    } else {
      review.disliked = !review.disliked;
      if (review.disliked) {
        review.liked = false;
      }
    }
  }

  getInitials(name: string): string {
    const names = name.split(' ');
    return names.map((n) => n[0]).join('').toUpperCase();
  }
}