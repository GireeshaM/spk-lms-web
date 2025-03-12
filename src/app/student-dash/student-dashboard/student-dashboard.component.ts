import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Chart } from 'chart.js';
import { RouterLink, Router } from '@angular/router';
import { CourseService } from '../../services/course.service'; // Import the shared service
import { StudentService } from '../../services/student.service';

interface Course {
  id: number;
  name: string;
  image: string;
  description: string;
  progress: number;
  category: string;
  difficulty: string;
}
interface ActivityBreakdown {
  studyPercent: number;
  examPercent: number;
}
interface Grade {
  type: 'study' | 'exam';
  hours?: number;    // For study entries
  score?: number;    // For exam entries
}

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit {
  activityBreakdown: ActivityBreakdown = { studyPercent: 0, examPercent: 0 };
  achievement: any; // Should be properly typed
  examAverage: number = 80;
nextAchievement: any;
achievementProgress = 0;
overallScore = 90;
studyPercentage = 100;
totalStudyHours = 6;
completedExams = 0;
hasData = false;
selectedTimeRange: 'thisWeek' | 'lastWeek' | 'thisMonth' | 'lastMonth' = 'thisWeek';

  weeklyChart: any;
studyTargetHours = 10;
  student = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    profilePhoto: 'images/student.jpg',
    grades: [
      { type: 'study', hours: 15 },
      { type: 'exam', score: 85 },  // Exam with score
      { type: 'study', hours: 10 },
      { type: 'exam', score: 92 }
    ] as Grade[],
    completedCourses: [
      { 
        id: 1, 
        name: 'Angular Basics', 
        image: 'images/angular.png', 
        description: 'Learn the basics of Angular', 
        progress: 100, 
        category: 'Web Development', 
        difficulty: 'Beginner' 
      }
    ] as Course[],
    activeCourses: [
      { 
        id: 2,
        name: 'Advanced TypeScript', 
        image: 'images/advjs.jpg',
        description: 'Deep dive into TypeScript', 
        progress: 60,
        category: 'Programming', 
        difficulty: 'Advanced' 
      }
    ] as Course[],
    interests: [
      { 
        id: 7,
        name: 'Machine Learning', 
        image: 'images/machine-learning.jpg',
        description: 'AI & ML fundamentals', 
        progress: 0, 
        category: 'AI', 
        difficulty: 'Intermediate' 
      }
    ] as Course[],
    enrolledCourses: [] as Course[],  // Moved to proper position
    recommendedCourses: [] as Course[]
  };
  private loadStudentData() {
    this.studentService.getStudentData().subscribe(data => {
      // Merge service data with local data
      this.student = { 
        ...this.student,
        ...data,
        enrolledCourses: [...this.student.enrolledCourses, ...(data.enrolledCourses || [])]
      };
      this.calculateActivityBreakdown();
    });
  }
  calculateExamMetrics() {
    const exams = this.student.grades.filter(g => g.type === 'exam');
    this.completedExams = exams.length;
    
    if (this.completedExams > 0) {
      const totalScores = exams.reduce((sum, exam) => sum + (exam.score || 0), 0);
      this.examAverage = Math.round(totalScores / this.completedExams);
      this.overallScore = this.examAverage; // Set overall score to exam average
    } else {
      this.examAverage = 0;
      this.overallScore = 0;
    }
  }
  
  // Moved enrollInCourse to component level
  enrollInCourse(course: Course) {
    this.studentService.addEnrolledCourse(course);
    this.student.enrolledCourses.push(course);
  }

  calculateActivityBreakdown() {
    if (!this.student?.grades?.length) {
      this.activityBreakdown = { studyPercent: 0, examPercent: 0 };
      return;
    }

    const studyHours = this.student.grades
      .filter(g => g.type === 'study')
      .reduce((acc, g) => acc + (g.hours || 0), 0);

    const examHours = this.student.grades
      .filter(g => g.type === 'exam')
      .reduce((acc, g) => acc + (g.hours || 0), 0);

    const total = studyHours + examHours || 1;

    this.activityBreakdown = {
      studyPercent: Math.round((studyHours / total) * 100),
      examPercent: Math.round((examHours / total) * 100)
    };
  }

// Call this method when grades data is available (maybe in ngOnInit or after data fetch)
  displayedCourses: Course[] = [];
  selectedCategoryTitle: string = 'Active Courses';
  currentView: string = 'dashboard';
 

  calendarEvents = [
    { time: '10:00 AM', event: 'AI in Education' },
    { time: '11:00 AM', event: 'Web Design Trends' },
    { time: '2:00 PM', event: 'JavaScript Features' },
    { time: '4:30 PM', event: 'Exam (JavaScript)' }
  ];

  constructor(private router: Router, private courseService: CourseService,private studentService: StudentService) {}

  ngOnInit() {
    this.loadStudentData();
    this.generateRecommendedCourses();
    this.setView('dashboard', 'Active Courses', this.student.activeCourses);
    
    // Initialize charts after data load
    this.studentService.getStudentData().subscribe(() => {
      setTimeout(() => {
        this.loadChart();
        this.initChart();
      }, 100);
    });
  }

  setView(view: string, title: string, courses: Course[] = []) {
    this.currentView = view;
    this.selectedCategoryTitle = title;
    this.displayedCourses = courses;
    setTimeout(() => this.loadChart(), 100); // Refresh chart when switching views
  }
 // After View Init to access DOM elements
ngAfterViewInit() {
  
    this.initChart();
  
}


initChart(): void {
  const ctx = document.getElementById('weeklyChart') as HTMLCanvasElement;
  
  if (!ctx) {
    console.error('Canvas element not found: weeklyChart');
    return;
  }

  if (this.weeklyChart) {
    this.weeklyChart.destroy(); // Destroy old chart before creating a new one
  }

  this.weeklyChart = new Chart(ctx, {
    type: 'bar',
    data: this.getChartData(this.selectedTimeRange),
    options: {
      responsive: true,
      plugins: {
        legend: { display: false }
      }
    }
  });
}

updateChart(): void {
  if (this.weeklyChart) {
    this.weeklyChart.destroy();
  }
  setTimeout(() => this.initChart(), 100);
}
 labels = {
  thisWeek: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  lastWeek: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  thisMonth: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
  lastMonth: ['Week 1', 'Week 2', 'Week 3', 'Week 4']
};

 dataValues = {
  thisWeek: [2, 3, 4, 1, 5, 6, 2],
  lastWeek: [1, 4, 3, 5, 2, 4, 3],
  thisMonth: [15, 20, 25, 30],
  lastMonth: [10, 18, 22, 28]
};
getChartData(timeRange: 'thisWeek' | 'lastWeek' | 'thisMonth' | 'lastMonth') {
  if (!this.labels[timeRange] || !this.dataValues[timeRange]) {
    console.error('Invalid timeRange:', timeRange);
    return { labels: [], datasets: [] };
  }

  return {
    labels: this.labels[timeRange],  
    datasets: [{
      label: 'Study Hours',
      data: this.dataValues[timeRange],  
      backgroundColor: 'rgba(54, 162, 235, 0.6)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1
    }]
  };
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
