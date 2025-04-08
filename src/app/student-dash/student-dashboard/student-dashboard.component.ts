import { ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Chart } from 'chart.js';
import { RouterLink, Router, NavigationEnd } from '@angular/router';
import { CourseService } from '../../services/course.service'; // Import the shared service
import { Student, StudentService } from '../../services/student.service';
import { Course } from '../../services/student.service';
import { HnavComponent } from "../../hnav/hnav.component";
interface ActivityBreakdown {
  studyPercent: number;
  examPercent: number;
}
interface Reminder {
  title: string;
  date: string;
  category: 'urgent' | 'upcoming' | 'general';
  icon: string;
}
interface Grade {
  type: 'study' | 'exam';
  hours?: number;    // For study entries
  score?: number;    // For exam entries
}

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, HnavComponent],
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit {
  selectedDomain: string = 'Web Development';

  loading = true;
  roadmap: any[] = [];
  availableDomains = ['Web Development', 'Data Science', 'Cybersecurity', 'AI & ML'];
  nextMilestoneIndex: number = 5;
  activityBreakdown: ActivityBreakdown = { studyPercent: 0, examPercent: 0 };
  achievement: any; 
  examAverage: number = 80;
  studentData:any  ;
nextAchievement: any;
achievementProgress = 60;
overallScore = 90;
studyPercentage = 60;
totalStudyHours = 6;
completedExams = 2;
hasData = false;
showSidebar: boolean = false;
studyTargetHours = 10;
overallPerformance: number = 75; 
engagementScore: number = 8; 
 //active courses
 chunkedActiveCourses: any[][] = [];
 chunkedEnrolledCourses: any[][] = [];
 sortOption: string = 'name';
 sortOptions = [
  { label: 'Name (A-Z)', value: 'name' },
  { label: 'Progress (High to Low)', value: 'progress-desc' },
  { label: 'Progress (Low to High)', value: 'progress-asc' }
];
getProficiencyLevel(score: number): string {
  if (score >= 80) {
    return 'Advanced';
  } else if (score >= 60) {
    return 'Intermediate';
  } else {
    return 'Beginner';
  }
}
  student = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    profilePhoto: 'images/student.jpg',
    grades: [
      { type: 'study', hours: 10 },
      { type: 'exam', score: 85 },  
      { type: 'study', hours: 6 },
      { type: 'exam', score: 92 }
    ] as Grade[],
    completedCourses: [{}] as Course[],
    activeCourses: [{}] as Course[],
    interests: [
       { 
        id: 7,
        name: 'Machine Learning', 
        image: 'images/machine-learning.jpg', 
        progress: 0, 
        category: 'AI', 
        difficulty: 'Intermediate',
      }
    ] as Course[],
    enrolledCourses: [] as Course[],  
    recommendedCourses: [] as Course[]
  };
  navigateToCourses(type: string)
  {
    this.router.navigate(['/coursesp'], { queryParams: { filter: type } });
  }
  loadCourses(): void {
    const courses = this.courseService.getEnrolledCourses();
    this.student.enrolledCourses = courses; // Include all courses
    this.cdRef.detectChanges();
  }
  private loadStudentData() {
    this.studentService.getStudentData().subscribe(data => {
      this.student = { 
        ...this.student,
        ...data,
        enrolledCourses: [...this.student.enrolledCourses, ...(data.enrolledCourses || [])],
      };
      this.calculateActivityBreakdown();

      this.loadCourses();
    });
  }
  viewEnrolledCourses() {
    this.setView('courses', 'Enrolled Courses', this.student.enrolledCourses);
  }

  calculateExamMetrics() {
    const exams = this.student.grades.filter(g => g.type === 'exam');
    this.completedExams = exams.length;
    
    if (this.completedExams > 0) {
      const totalScores = exams.reduce((sum, exam) => sum + (exam.score || 0), 0);
      this.examAverage = Math.round(totalScores / this.completedExams);
      this.overallScore = this.examAverage; 
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
  currentView = 'dashboard';
  calendarEvents = [
    { time: '10:00 AM', event: 'AI in Education' },
    { time: '11:00 AM', event: 'Web Design Trends' },
    { time: '2:00 PM', event: 'JavaScript Features' },
    { time: '4:30 PM', event: 'Exam (JavaScript)' }];

  constructor(private router: Router, private courseService: CourseService,private studentService: StudentService,private cdRef: ChangeDetectorRef) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
          this.showSidebar = ['/dashboard', '/courses', '/learning-path'].includes(event.urlAfterRedirects);
      }
  });
  }
  ngOnInit() {
    this.initChart();
    // Initialize charts after data load
    this.studentService.getStudentData().subscribe((data) => {
      this.studentData=data;
      this.loading = false;
      setTimeout(() => {
      }, 100);
    });
    this.loadStudentData();
    this.loadCourses();
    this.generateRecommendedCourses();
    this.setView('dashboard', 'Active Courses', this.student.activeCourses);
    this.chunkedActiveCourses = this.chunkArray(this.getSortedCourses(this.student.activeCourses), 2);
  this.chunkedEnrolledCourses = this.chunkArray(this.student.enrolledCourses, 2);  
  }
  //active courses
  getSortedCourses(courses: Course[]): Course[] {
    return courses.slice().sort((a, b) => {
      switch (this.sortOption) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'progress-desc':
          return b.progress - a.progress;
        case 'progress-asc':
          return a.progress - b.progress;
        default:
          return 0;
      }
    });
  }
  setView(view: string, title: string, courses: Course[] = []) {
    this.currentView = view;
    this.selectedCategoryTitle = title;
    this.displayedCourses = courses;
    // setTimeout(() => this.loadChart(), 100); // Refresh chart when switching views
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
  viewInterests() {
    this.setView('interests', 'My Interests', this.student.interests);
  }
  viewGrades() {
    this.setView('grades', 'Grades');
  }
  viewSettings() {
    this.setView('settings', 'Settings');
  }
  generateRecommendedCourses() {
    const allCourses: Course[] = [
      {
        id: 9, name: 'Advanced Python', image: 'https://via.placeholder.com/150', description: 'Deep dive into Python advanced topics', progress: 0, category: 'Programming', difficulty: 'Advanced',
        rating: 3.5,
        reviews: 250,
        duration: '50',
        lectures: '100',
        level: 'intermediate',
        instructor: 'Ram'
      },
      {
        id: 10, name: 'Machine Learning with TensorFlow', image: 'https://via.placeholder.com/150', description: 'An introduction to machine learning with TensorFlow', progress: 0, category: 'AI', difficulty: 'Intermediate',
        rating: 90,
        reviews: 3.8,
        duration: '45',
        lectures: '150',
        level: 'advanced',
        instructor: 'dev'
      },
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
  lastViewedCourses = [
    {
        id: 1,
        title: 'Advanced JavaScript',
        thumbnail: 'path/to/image.jpg',
        progress: 65,
        lastAccessed: '2025-02-12T14:30:00'
    },
    // ... other courses
]
// formatLastViewed(timestamp: string | Date): string {
//   const date = typeof timestamp === 'string' ? new Date(timestamp) : timestamp;
//   const now = new Date();
//   const diffMs = now.getTime() - date.getTime();

//   // Calculate time differences
//   const diffSeconds = Math.floor(diffMs / 1000);
//   const diffMinutes = Math.floor(diffSeconds / 60);
//   const diffHours = Math.floor(diffMinutes / 60);
//   const diffDays = Math.floor(diffHours / 24);
//   const diffWeeks = Math.floor(diffDays / 7);
//   const diffMonths = Math.floor(diffDays / 30);
//   const diffYears = Math.floor(diffMonths / 12);

//   if (diffYears > 0) {
//     return `${diffYears}y ago`;
//   } else if (diffMonths > 0) {
//     return `${diffMonths}mo ago`;
//   } else if (diffWeeks > 0) {
//     return `${diffWeeks}w ago`;
//   } else if (diffDays > 0) {
//     return `${diffDays}d ago`;
//   } else if (diffHours > 0) {
//     return `${diffHours}h ago`;
//   } else if (diffMinutes > 0) {
//     return `${diffMinutes}m ago`;
//   } else if (diffSeconds > 10) {
//     return `${diffSeconds}s ago`;
//   } else {
//     return 'Just now';
//   }
// }
// REMAINDER
activeTab: string = 'weekly';
weeklyReminders = [
  { title: 'SubmitAssignment', date: 'Mon, Apr 3', progress: 60, icon: '📄' },
  { title: 'TeamMeeting', date: 'Wed, Apr 5', progress: 80, icon: '📅' },
  { title: 'PrepareforQuiz', date: 'Fri, Apr 7', progress: 40, icon: '📝' }
];

monthlyReminders = [
  { title: 'ProjectSubmission', date: 'Apr 20', progress: 75, icon: '🚀' },
  { title: 'CourseReview', date: 'Apr 25', progress: 50, icon: '📖' },
  { title: 'FinalExam', date: 'Apr 30', progress: 90, icon: '🎓' }
];
progressPath = '';

  //  ROADMAP
private roadmapData: any = {
  'Web Development': [
    { title: 'HTML & CSS Basics', icon: 'fas fa-code', completed: true},
    { title: 'JavaScript & ES6', icon: 'fab fa-js',completed: true },
    { title: 'React & Angular', icon: 'fab fa-react', completed: true },
    { title: 'Backend Development', icon: 'fas fa-server', completed: false},
    { title: 'Full-Stack Projects', icon: 'fas fa-project-diagram',completed: false}
  ],
  'Data Science': [
    { title: 'Python Basics', icon: 'fab fa-python',completed: true },
    { title: 'Data Analysis with Pandas', icon: 'fas fa-chart-bar', completed: true },
    { title: 'Machine Learning Basics', icon: 'fas fa-robot', completed: true},
    { title: 'Deep Learning & AI', icon: 'fas fa-brain',completed: false },
    { title: 'Real-world Data Projects', icon: 'fas fa-database', completed: false}
  ],
  'Cybersecurity': [
    { title: 'Network Security Basics', icon: 'fas fa-network-wired', completed: true },
    { title: 'Ethical Hacking', icon: 'fas fa-user-secret', completed: true },
    { title: 'Threat Analysis', icon: 'fas fa-shield-alt',completed: true },
    { title: 'Penetration Testing', icon: 'fas fa-bug',completed: false },
    { title: 'Cyber Defense Strategies', icon: 'fas fa-lock',completed: false }
  ],
  'AI & ML': [
    { title: 'Python & AI Basics', icon: 'fab fa-python', completed: true},
    { title: 'Neural Networks', icon: 'fas fa-network-wired',completed: true },
    { title: 'Deep Learning', icon: 'fas fa-brain',completed: true },
    { title: 'NLP & AI Applications', icon: 'fas fa-microchip',completed: false },
    { title: 'AI & ML Projects', icon: 'fas fa-robot',completed: false }
  ]
};
generateRoadmap() {
  if (this.selectedDomain) {
    this.roadmap = this.roadmapData[this.selectedDomain] || [];
    this.startAnimation();
  }
}
// generateCurvedPath() {
//   let path = 'M10,50 '; // Starting point

//   for (let i = 1; i < this.roadmap.length; i++) {
//     const x = i % 2 === 0 ? 50 : 90; // Alternating left & right positions
//     const y = i * 100 + 50;
//     path += ` Q ${x},${y - 50} ${x},${y} `;
//   }

//   this.progressPath = path;
// }
startAnimation() {
  let index = 0;
  const interval = setInterval(() => {
    if (index < this.roadmap.length) {
      this.nextMilestoneIndex = index;
      index++;
    } else {
      clearInterval(interval);
    }
  }, 2000);
}


streakDays = 5; // Number of active streak days
  streakDaysArray = [
    { label: 'M', active: true, isToday: false },
    { label: 'T', active: true, isToday: false },
    { label: 'W', active: false, isToday: false },
    { label: 'T', active: false, isToday: false },
    { label: 'F', active: true, isToday: false },
    { label: 'S', active: true, isToday: true }, // Highlight Saturday
    { label: 'S', active: false, isToday: false }
  ];
  
  selectedTimeRange: 'thisWeek' | 'lastWeek' | 'thisMonth' | 'lastMonth' = 'thisWeek';
  weeklyChart: any;

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

 

  initChart(): void {
    const ctx = document.getElementById('weeklyChart') as HTMLCanvasElement;
    if (!ctx) {
      console.error('Canvas element not found: weeklyChart');
      return;
    }
    if (this.weeklyChart) {
      this.weeklyChart.destroy();
    }

    const gradient = ctx.getContext('2d')!.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, 'rgba(144, 238, 144, 1)');
    gradient.addColorStop(1, 'rgba(240, 255, 240, 0.5)');

    this.weeklyChart = new Chart(ctx, {
      type: 'line',
      data: this.getChartData(this.selectedTimeRange),
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (context) => {
                const value = context.raw as number;
                const hours = Math.floor(value);
                const minutes = Math.round((value - hours) * 60);
                return `${hours}h ${minutes}m`;
              }
            }
          }
        },
        animation: {
          duration: 500,
          easing: 'easeOutQuad'
        },
        elements: {
          line: {
            tension: 0.4,
            backgroundColor: gradient,
            borderColor: 'rgba(34, 139, 34, 1)',
            borderWidth: 2,
            fill: true
          },
          point: {
            radius: 2,
            backgroundColor: 'rgba(34, 139, 34, 1)',
            hoverRadius: 4
          }
        },
        scales: {
          x: {
            grid: { display: false }
          },
          y: {
            beginAtZero: true,
            grid: { color: 'rgba(200, 200, 200, 0.2)' }
          }
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

  getChartData(timeRange: 'thisWeek' | 'lastWeek' | 'thisMonth' | 'lastMonth') {
    if (!this.labels[timeRange] || !this.dataValues[timeRange]) {
      console.error('Invalid timeRange:', timeRange);
      return { labels: [], datasets: [] };
    }

    return {
      labels: this.labels[timeRange],
      datasets: [
        {
          label: 'Study Hours',
          data: this.dataValues[timeRange],
          backgroundColor: 'rgba(144, 238, 144, 0.5)',
          borderColor: 'rgba(34, 139, 34, 1)',
          fill: true,
          borderWidth: 2
        }
      ]
    };
  }

  chunkArray(arr: any[], size: number): any[][] {
    const chunks = [];
    for (let i = 0; i < arr.length; i += size) {
      chunks.push(arr.slice(i, i + size));
    }
    return chunks;
  }
  
}