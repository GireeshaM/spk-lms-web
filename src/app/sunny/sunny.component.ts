import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Color, NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';
import { InstructorNavbarComponent } from "../Instructor/instructor-navbar/instructor-navbar.component";

interface Course {
  title: string;
  status: 'completed' | 'progress' | 'active'; // Added 'active' status
  progress: number;
  isActive?: boolean;
  students:number;
  rating:number;
}

@Component({
  selector: 'app-sunny',
  imports: [CommonModule, NgxChartsModule,],
  templateUrl: './sunny.component.html',
  styleUrl: './sunny.component.css'
})
export class SunnyComponent {
  instructorName: string = 'Prof. Shushanth';
  user = {
    name: 'Prof. Shushanth',
    points: 66400,
    badgesNeeded: 36,
    progress: 73,
    trailTitle: 'Explore Generative AI Tools',
    trailDescription: 'Discover the fundamental tools for your generative AI journey.',
    pointsEarned: 1100
  };

  courseStats = {
    total: 52,
    active: 18,
    completed: 20,
    inProgress: 14
  };

  displayStats = {
    total: 0,
    active: 0,
    completed: 0,
    inProgress: 0
  };

  title = 'lms-instructor-dashboard';
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  aiSuggestions = [
    'Use AI to suggest personalized learning paths based on student progress.',
    'AI-powered tools can generate quizzes dynamically from course material.',
    'Monitor engagement with AI insights and adjust teaching accordingly.',
    'AI provides instant feedback on assignments and assessments.',
    'Optimize class scheduling with AI-based time management.'
  ];

  constructor() { }

  ngOnInit(): void {
    this.animateCounts();
   }

  ngAfterViewInit(): void {
    this.autoScroll();
  }

  autoScroll(): void {
    const container = this.scrollContainer.nativeElement;
    let scrollAmount = 0;
    const scrollSpeed = 50; // Speed of scrolling (lower is faster)
    const scrollStep = 1; // How many pixels to move each step

    setInterval(() => {
      if (scrollAmount >= container.scrollHeight - container.clientHeight) {
        container.scrollTop = 0; // Reset scroll to bottom
        scrollAmount = 0;
      } else {
        container.scrollTop += scrollStep;
        scrollAmount += scrollStep;
      }
    }, scrollSpeed);
  }

  view: [number, number] = [700, 400]; // Chart size

  // Dark pastel theme colors with correct type
  colorScheme: Color = {
    name: 'darkPastel',
    selectable: true,
    group: ScaleType.Ordinal, // Ensure ordinal scale for categories
    domain: ['#8B5CF6', '#F472B6', '#34D399', '#60A5FA', '#FBBF24', '#F87171', '#A78BFA']
  };

  // Sample data for the bar chart
  courseData = [
    { name: 'Angular Mastery', value: 150 },
    { name: 'React Essentials', value: 130 },
    { name: 'Vue.js Fundamentals', value: 120 },
    { name: 'Python for AI', value: 110 },
    { name: 'Java Spring Boot', value: 100 },
    { name: 'Django for Web Dev', value: 90 },
    { name: 'Flutter Mobile Dev', value: 85 }
  ];

  formatDataLabel(value: any) {
    return `${value.name}: ${value.value}`;
  }

  onSelect(event: any) {
    console.log(event);
  }
  itemsPerPage = 5; // Number of courses per page
  currentPage = 1;
   // Compute total pages in TypeScript
   get totalPages(): number {
    return Math.ceil(this.filteredCourses.length / this.itemsPerPage);
}
  get paginatedCourses() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredCourses.slice(startIndex, startIndex + this.itemsPerPage);
}

// Navigate pages
nextPage() {
    if (this.currentPage < Math.ceil(this.filteredCourses.length / this.itemsPerPage)) {
        this.currentPage++;
    }
}

prevPage() {
    if (this.currentPage > 1) {
        this.currentPage--;
    }
}
  searchQuery: string = '';
  filterStatus: string = 'all';

  courses: Course[] = [
    { title: 'Learn Python in 30 Days', status: 'completed', progress: 100, isActive: false,students:1500,rating:5 },
    { title: 'Mastering Angular', status: 'completed', progress: 100, isActive: true,students:1500,rating:5 },
    { title: 'JavaScript Fundamentals', status: 'completed', progress: 100, isActive: false,students:1500,rating:5},
    { title: 'React for Beginners', status: 'completed', progress: 100, isActive: true,students:1500,rating:5},
    { title: 'Advanced Node.js', status: 'completed', progress: 100, isActive: true,students:1500,rating:5},
    { title: 'Learn .NET Core in 30 Days', status: 'progress', progress: 10, isActive: false,students:1500,rating:5},
    { title: 'Learn .NET Core in 60 Days', status: 'progress', progress: 15, isActive: false,students:1500,rating:5},
    { title: 'Full-Stack Development', status: 'progress', progress: 50, isActive: false,students:1500,rating:5},
    { title: 'Data Science with Python', status: 'active', progress: 80, isActive: false,students:1500,rating:5}, // Added active course
    { title: 'Machine Learning Basics', status: 'active', progress: 65, isActive: false,students:1500,rating:5}, // Added active course
    { title: 'Cybersecurity Fundamentals', status: 'active', progress: 90, isActive: false,students:1500,rating:5} // Added active course
  ];

  get filteredCourses(): Course[] {
    return this.courses.filter(course =>
      (this.filterStatus === 'all' || course.status === this.filterStatus) &&
      course.title.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
  searchCourse(event: Event) {
    this.searchQuery = (event.target as HTMLInputElement).value;
  }

  filterCourses(event: Event) {
    this.filterStatus = (event.target as HTMLSelectElement).value;
  }
  toggleStatus(course: any) {
    course.isActive = !course.isActive;
  }

  
  animateCounts() {
    const duration = 1000;
    const steps = 60;

    const animate = (key: keyof typeof this.courseStats) => {
      const target = this.courseStats[key];
      let current = 0;
      const increment = target / steps;

      const interval = setInterval(() => {
        current += increment;
        if (current >= target) {
          this.displayStats[key] = target;
          clearInterval(interval);
        } else {
          this.displayStats[key] = Math.floor(current);
        }
      }, duration / steps);
    };

    animate('total');
    animate('active');
    animate('completed');
    animate('inProgress');
  }
  displayedCourses = this.courses.slice(0, 4); // Initially display only 4 courses

  closeNotificationBox() {
    const notificationBox = document.getElementById('notificationBox');
    if (notificationBox) {
      notificationBox.style.display = 'none'; // Hide the notifications box
    }
    
  }
}