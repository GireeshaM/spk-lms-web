import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Chart } from 'chart.js';
import { RouterLink, Router } from '@angular/router';
import { CourseService } from '../../services/course.service'; // Import the shared service

interface Course {
  id: number;
  name: string;
  image: string;
  description: string;
  progress: number;
  category: string;
  difficulty: string;
}

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit {
  student = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    profilePhoto: 'https://i.pravatar.cc/150?img=12',
    completedCourses: <Course[]>[
      {id:1, name: 'Angular Basics', image: 'images/angular.png', description: 'Learn the basics of Angular', progress: 100, category: 'Web Development', difficulty: 'Beginner' }
    ],
    activeCourses: <Course[]>[
      { id:2,name: 'Advanced TypeScript', image: 'images/advjs.jpg', description: 'Deep dive into TypeScript', progress: 60, category: 'Programming', difficulty: 'Advanced' }
    ],
    enrolledCourses: <Course[]>[
      { id:3,name: 'JavaScript Essentials', image: 'images/js.png', description: 'Core JavaScript concepts', progress: 30, category: 'Programming', difficulty: 'Beginner' },
      { id:4,name: 'React for Beginners', image: 'images/react.png', description: 'Intro to React.js', progress: 20, category: 'Web Development', difficulty: 'Beginner' },
      { id:5,name: 'Node.js Fundamentals', image: 'images/nodejs.png', description: 'Learn backend development', progress: 10, category: 'Programming', difficulty: 'Beginner' },
      { id:6,name: 'Python for AI', image: 'images/python.png', description: 'Introduction to AI with Python', progress: 15, category: 'AI', difficulty: 'Beginner' }
    ],
    interests: <Course[]>[
      { id:7,name: 'Machine Learning', image: 'images/machine-learning.jpg', description: 'AI & ML fundamentals', progress: 0, category: 'AI', difficulty: 'Intermediate' },
      { id:8,name: 'Cybersecurity', image: 'images/cyber-security.jpg', description: 'Learn ethical hacking', progress: 0, category: 'Security', difficulty: 'Intermediate' }
    ],
    recommendedCourses: <Course[]>[]
  };

  displayedCourses: Course[] = [];
  selectedCategoryTitle: string = 'Active Courses';
  currentView: string = 'dashboard';
  weeklyChart: any;

  calendarEvents = [
    { time: '10:00 AM', event: 'AI in Education' },
    { time: '11:00 AM', event: 'Web Design Trends' },
    { time: '2:00 PM', event: 'JavaScript Features' },
    { time: '4:30 PM', event: 'Exam (JavaScript)' }
  ];

  constructor(private router: Router, private courseService: CourseService) {}

  ngOnInit() {
    this.generateRecommendedCourses();
    this.setView('dashboard', 'Active Courses', this.student.activeCourses);
    setTimeout(() => this.loadChart(), 100);
  }

  setView(view: string, title: string, courses: Course[] = []) {
    this.currentView = view;
    this.selectedCategoryTitle = title;
    this.displayedCourses = courses;
    setTimeout(() => this.loadChart(), 100); // Refresh chart when switching views
  }

  viewDashboard() {
    this.setView('dashboard', 'Dashboard');
  }

  viewActiveCourses() {
    this.setView('dashboard', 'Active Courses', this.student.activeCourses);
  }

  viewCompletedCourses() {
    this.setView('dashboard', 'Completed Courses', this.student.completedCourses);
  }

  viewEnrolledCourses() {
    this.setView('courses', 'Enrolled Courses', this.student.enrolledCourses);
  }

  viewInterests() {
    this.setView('interests', 'My Interests', this.student.interests);
  }

  viewGrades() {
    this.setView('grades', 'Grades');
  }

  viewSettings() {
    this.setView('settings', 'Settings');
  }

  viewCourses() {
    this.courseService.setEnrolledCourses(this.student.enrolledCourses);
    this.router.navigate(['/coursesp']);
  }

  loadChart() {
    const canvas = document.getElementById('weeklyChart') as HTMLCanvasElement;
    if (!canvas) return;

    if (this.weeklyChart) {
      this.weeklyChart.destroy(); // Destroy previous instance before creating a new one
    }

    this.weeklyChart = new Chart(canvas, {
      type: 'bar',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
          label: 'Hours Studied',
          data: [1, 2, 4, 3, 5, 2, 1],
          backgroundColor: '#FF6384'
        }]
      }
    });
  }

  generateRecommendedCourses() {
    const allCourses: Course[] = [
      {id:9, name: 'Advanced Python', image: 'https://via.placeholder.com/150', description: 'Deep dive into Python advanced topics', progress: 0, category: 'Programming', difficulty: 'Advanced' },
      { id:10,name: 'Machine Learning with TensorFlow', image: 'https://via.placeholder.com/150', description: 'An introduction to machine learning with TensorFlow', progress: 0, category: 'AI', difficulty: 'Intermediate' },
      // Add more courses as needed
    ];

    const recommendations: Course[] = [];
    this.student.enrolledCourses.forEach(enrolledCourse => {
      const similarCourses = allCourses.filter(course =>
        course.name !== enrolledCourse.name &&
        (course.category === enrolledCourse.category || course.difficulty === enrolledCourse.difficulty)
      );
      recommendations.push(...similarCourses);
    });

    this.student.recommendedCourses = recommendations;
  }
}
