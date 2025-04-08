import { CommonModule } from '@angular/common';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-pricing-page',
  imports: [CommonModule, FormsModule],
  templateUrl: './pricing-page.component.html',
  styleUrls: ['./pricing-page.component.css']
})
export class PricingPageComponent implements OnInit, AfterViewInit {
  totalCourses: number = 0;
  router: any;
  expandedSection: string | null = null;
  expandedCourseId: number | null = null;
  selectedDate: string = new Date().toISOString().split('T')[0];
  analytics: any = {};
  trendingCourses: any[] = [];

  ngOnInit(): void {
    this.fetchTotalCourses();
    this.fetchTrendingCourses();
    this.fetchAnalytics();
  }

  fetchTotalCourses(): void {
    setTimeout(() => {
      this.totalCourses = 150; 
    }, 1000); 
  }

  fetchTrendingCourses(): void {
    // Mock data for trending courses
    this.trendingCourses = [
      {
        name: 'Angular Fundamentals',
        studentsPurchased: 200,
        averageRating: 4.5
      },
      {
        name: 'React Fundamentals',
        studentsPurchased: 180,
        averageRating: 4.4
      }
    ];
  }

  fetchAnalytics(): void {
    // Mock data for analytics
    this.analytics = {
      totalStudents: 2450,
      totalRevenue: 50000,
      avgRating: 4.6
    };
  }

  deleteCourse(courseId: number) {
    console.log(`Delete Course: ${courseId}`);
    this.courses = this.courses.filter(course => course.id !== courseId);
  }

  toggleSection(courseId: number, section: string) {
    if (this.expandedCourseId === courseId && this.expandedSection === section) {
      this.expandedSection = null;
      this.expandedCourseId = null;
    } else {
      this.expandedSection = section;
      this.expandedCourseId = courseId;
    }
  }

  renderCharts() {
    const studentsChart = new Chart('studentsChart', {
      type: 'bar',
      data: {
        labels: this.courses.map(course => course.name),
        datasets: [{
          label: 'Students Enrolled',
          data: this.courses.map(course => course.studentsPurchased),
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    const reviewsChart = new Chart('reviewsChart', {
      type: 'line',
      data: {
        labels: this.courses.map(course => course.name),
        datasets: [{
          label: 'Course Reviews',
          data: this.courses.map(course => course.reviews.length),
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  courses = [
    {
      id: 1,
      name: 'Angular Fundamentals',
      category: 'Development',
      description: 'Learn the basics of Angular framework',
      duration: 3,
      price: 1500,
      imageUrl: 'https://www.edureka.co/blog/wp-content/uploads/2020/01/angular8-angular-tutorial-Edureka-1.png',
      studentsPurchased: 200,
      averageRating: 4.5,
      reviews: [
        {
          studentName: 'John Doe',
          profileImage: 'https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg',
          rating: 5,
          comment: 'Great course! Learned a lot.',
          reply: ''
        },
        {
          studentName: 'Jane Smith',
          profileImage: 'https://static.vecteezy.com/system/resources/thumbnails/046/002/209/small/close-up-of-person-with-dreadlocks-free-photo.jpeg',
          rating: 4,
          comment: 'Good content, but could use more examples.',
          reply: ''
        },
        {
          studentName: 'Alice Brown',
          profileImage: 'https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D',
          rating: 3,
          comment: 'Not bad, but needs more practical examples.',
          reply: ''
        },
        {
          studentName: 'Mark Davis',
          profileImage: 'https://img.freepik.com/free-photo/medium-shot-man-with-afro-hairstyle_23-2150677136.jpg',
          rating: 5,
          comment: 'Excellent! Really clear and well-structured.',
          reply: ''
        },
        {
          studentName: 'Emma Wilson',
          profileImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJrXSXb_jayac8vtbpTX_FYximkklGxSWZgA&s',
          rating: 4,
          comment: 'Good content, but more real-world examples would help.',
          reply: ''
        },
        {
          studentName: 'Sophia Turner',
          profileImage: 'assets/images/student6.jpg',
          rating: 5,
          comment: 'Amazing course! Loved every module.',
          reply: ''
        },
        {
          studentName: 'James Harris',
          profileImage: 'assets/images/student7.jpg',
          rating: 2,
          comment: 'The course could be more engaging.',
          reply: ''
        },
        {
          studentName: 'Michael Clark',
          profileImage: 'assets/images/student8.jpg',
          rating: 4,
          comment: 'Good course, but too theoretical at times.',
          reply: ''
        },
        {
          studentName: 'Linda Young',
          profileImage: 'assets/images/student9.jpg',
          rating: 5,
          comment: 'Highly recommend it! A great learning experience.',
          reply: ''
        },
        {
          studentName: 'David Lewis',
          profileImage: 'assets/images/student10.jpg',
          rating: 3,
          comment: 'Decent, but a bit slow in some sections.',
          reply: ''
        }
      ]
    },
    {
      id: 2,
      name: 'React Fundamentals',
      category: 'Development',
      description: 'Learn the basics of React framework',
      duration: 3,
      price: 1500,
      imageUrl: 'https://www.etatvasoft.com/blog/wp-content/uploads/2023/05/A-Definitive-Guide-to-React-Fundamentals-1.jpg',
      studentsPurchased: 200,
      averageRating: 4.5,
      reviews: [
        {
          studentName: 'John Doe',
          profileImage: 'assets/images/student1.jpg',
          rating: 5,
          comment: 'Great course! Learned a lot.',
          reply: ''
        },
        {
          studentName: 'Jane Smith',
          profileImage: 'assets/images/student2.jpg',
          rating: 4,
          comment: 'Good content, but could use more examples.',
          reply: ''
        },
        {
          studentName: 'Alice Brown',
          profileImage: 'assets/images/student3.jpg',
          rating: 3,
          comment: 'Not bad, but needs more practical examples.',
          reply: ''
        },
        {
          studentName: 'Mark Davis',
          profileImage: 'assets/images/student4.jpg',
          rating: 5,
          comment: 'Excellent! Really clear and well-structured.',
          reply: ''
        },
        {
          studentName: 'Emma Wilson',
          profileImage: 'assets/images/student5.jpg',
          rating: 4,
          comment: 'Good content, but more real-world examples would help.',
          reply: ''
        },
        {
          studentName: 'Sophia Turner',
          profileImage: 'assets/images/student6.jpg',
          rating: 5,
          comment: 'Amazing course! Loved every module.',
          reply: ''
        },
        {
          studentName: 'James Harris',
          profileImage: 'assets/images/student7.jpg',
          rating: 2,
          comment: 'The course could be more engaging.',
          reply: ''
        },
        {
          studentName: 'Michael Clark',
          profileImage: 'assets/images/student8.jpg',
          rating: 4,
          comment: 'Good course, but too theoretical at times.',
          reply: ''
        },
        {
          studentName: 'Linda Young',
          profileImage: 'assets/images/student9.jpg',
          rating: 5,
          comment: 'Highly recommend it! A great learning experience.',
          reply: ''
        },
        {
          studentName: 'David Lewis',
          profileImage: 'assets/images/student10.jpg',
          rating: 3,
          comment: 'Decent, but a bit slow in some sections.',
          reply: ''
        }
      ]
    }
  ];

  currentReviewLimit: number = 5; // Initially show 5 reviews
  selectedCourse: any = null;
  selectedReview: any = null;
  replyText: string = '';

  viewCourse(courseId: number) {
    console.log(`View Course: ${courseId}`);
  }

  editCourse(courseId: number) {
    console.log(`Edit Course: ${courseId}`);
  }

  goToCourseMessage(): void {
    this.router.navigate(['app-course-message']);  // Adjust the route as needed
  }

  closeReviews() {
    this.selectedCourse = null;
    this.selectedReview = null;
  }

  replyToReview(review: any) {
    this.selectedReview = review;
    this.replyText = '';
  }

  submitReply() {
    if (this.selectedReview && this.replyText.trim() !== '') {
      this.selectedReview.reply = this.replyText;
      this.selectedReview = null;
      this.replyText = '';
    }
  }

  viewReviews(course: any) {
    this.selectedCourse = course;
  }

  loadMoreReviews() {
    // Load 5 more reviews when clicked
    this.currentReviewLimit += 5;
  }
  
  totalStudents = 2450;
  courseReach = 8500;
  avgRating = 4.6;
  completionRate = 76;

  ngAfterViewInit() {
    this.createEnrollmentChart();
    this.createReachChart();
    this.createReviewChart();
    this.renderCharts();
  }

  createEnrollmentChart() {
    new Chart('enrollmentChart', {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
          {
            label: 'Enrollments',
            data: [120, 190, 300, 500, 220, 450],
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 2,
          },
        ],
      },
      options: { responsive: true, maintainAspectRatio: false },
    });
  }

  createReachChart() {
    new Chart('reachChart', {
      type: 'line',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
          {
            label: 'Course Reach',
            data: [500, 700, 1200, 900, 1500, 1300, 2000],
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 2,
            fill: false,
          },
        ],
      },
      options: { responsive: true, maintainAspectRatio: false },
    });
  }

  createReviewChart() {
    new Chart('reviewChart', {
      type: 'doughnut',
      data: {
        labels: ['5⭐', '4⭐', '3⭐', '2⭐', '1⭐'],
        datasets: [
          {
            data: [50, 30, 10, 5, 5],
            backgroundColor: [
              'rgba(75, 192, 192, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(255, 159, 64, 0.6)',
              'rgba(255, 99, 132, 0.6)',
            ],
          },
        ],
      },
      options: { responsive: true, maintainAspectRatio: false },
    });
  }
}