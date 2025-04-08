import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { delay, catchError } from 'rxjs/operators';

export interface Grade {
  type: 'study' | 'exam';
  hours: number;
}

export interface Course {
  id: number;
  name: string;
  image: string;
  description?: string;
  progress: number;
  category?: string;
  difficulty?: string;
  status?: string;
  rating: number;
  reviews: number;
  duration: string;
  lectures: string;
  level: string;
  instructor: string;
}

export interface Student {
  name: string;
  email: string;
  profilePhoto: string;
  grades: Grade[];
  completedCourses: Course[];
  activeCourses: Course[];
  enrolledCourses: Course[];
  interests: Course[];
  recommendedCourses: Course[];
  mandatoryCourses: Course[];
}

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private studentData: Student = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    profilePhoto: 'https://i.pravatar.cc/150?img=12',
    grades: [
      { type: 'study', hours: 15 },
      { type: 'exam', hours: 5 },
      { type: 'study', hours: 10 }
    ],
    completedCourses: [
      { id: 1, name: 'HTML & CSS Mastery', image: 'images/htmlcss.jpeg', status: 'completed', rating: 4.8, reviews: 1800, duration: '45', lectures: '130', level: 'Beginner', progress: 100, instructor: 'Emily Brown' }
    ],
    activeCourses: [
      { id: 2, name: 'Angular for Beginners', image: 'images/angular.png', status: 'active', rating: 4.5, reviews: 1200, duration: '40', lectures: '120', level: 'Beginner', progress: 60, instructor: 'John Doe' },
      { id: 4, name: 'React Fundamentals', image: 'images/react.png', status: 'active', rating: 4.6, reviews: 900, duration: '35', lectures: '100', level: 'Beginner', progress: 0, instructor: 'Jane Smith' },
      { id: 5, name: 'Advanced JavaScript', image: 'images/advjs.jpg', status: 'active', rating: 4.7, reviews: 1500, duration: '50', lectures: '140', level: 'Intermediate', progress: 30, instructor: 'Mark Johnson' },
    ],
    enrolledCourses: [
      { id: 2, name: 'Angular for Beginners', image: 'images/angular.png', status: 'active', rating: 4.5, reviews: 1200, duration: '40', lectures: '120', level: 'Beginner', progress: 60, instructor: 'John Doe' },
      { id: 4, name: 'React Fundamentals', image: 'images/react.png', status: 'active', rating: 4.6, reviews: 900, duration: '35', lectures: '100', level: 'Beginner', progress: 0, instructor: 'Jane Smith' },
      { id: 5, name: 'Advanced JavaScript', image: 'images/advjs.jpg', status: 'active', rating: 4.7, reviews: 1500, duration: '50', lectures: '140', level: 'Intermediate', progress: 30, instructor: 'Mark Johnson' },
      { id: 1, name: 'HTML & CSS Mastery', image: 'images/htmlcss.jpeg', status: 'completed', rating: 4.8, reviews: 1800, duration: '45', lectures: '130', level: 'Beginner', progress: 100, instructor: 'Emily Brown' }
    ],
    
    interests: [
      {
        id: 7,
        name: 'Machine Learning',
        image: 'images/machine-learning.jpg',
        description: 'AI & ML fundamentals',
        progress: 0,
        category: 'AI',
        difficulty: 'Intermediate',
        status: 'enrolled',
        rating: 4.0,
        reviews: 0,
        duration: '35',
        lectures: '300',
        level: 'Beginner',
        instructor: 'Rahul'
      }
    ],
    recommendedCourses: [],
    mandatoryCourses: []
  };

  private studentData$ = new BehaviorSubject<Student>(this.studentData);

  constructor() { }

  getStudentData(): Observable<Student> {
    return this.studentData$.asObservable().pipe(
      delay(1000), // Simulate API delay
      catchError(error => {
        console.error('Error fetching student data:', error);
        return throwError(() => new Error('Failed to fetch student data'));
      })
    );
  }

  updateGrades(newGrades: Grade[]): void {
    const updatedData = {
      ...this.studentData$.value,
      grades: [...this.studentData$.value.grades, ...newGrades]
    };
    this.studentData$.next(updatedData);
  }

  addEnrolledCourse(course: Course): void {
    const updatedData = {
      ...this.studentData$.value,
      enrolledCourses: [...this.studentData$.value.enrolledCourses, course]
    };
    this.studentData$.next(updatedData);
  }

  updateCourseProgress(courseId: number, progress: number): void {
    const currentData = this.studentData$.value;

    const updatedEnrolled = currentData.enrolledCourses.map(course =>
      course.id === courseId ? { ...course, progress } : course
    );

    const updatedActive = currentData.activeCourses.map(course =>
      course.id === courseId ? { ...course, progress } : course
    );

    const updatedCompleted = [...currentData.completedCourses];

    if (progress >= 100) {
      // Move to completed courses
      const course = updatedEnrolled.find(c => c.id === courseId) || updatedActive.find(c => c.id === courseId);
      if (course) {
        course.status = 'completed';
        updatedCompleted.push(course);
      }
    }

    this.studentData$.next({
      ...currentData,
      enrolledCourses: updatedEnrolled.filter(c => c.progress < 100),
      activeCourses: updatedActive.filter(c => c.progress > 0 && c.progress < 100),
      completedCourses: updatedCompleted
    });
  }

  generateRecommendations(): Observable<Course[]> {
    const recommendations: Course[] = [
      {
        id: 9,
        name: 'Advanced Python',
        image: 'https://via.placeholder.com/150',
        description: 'Deep dive into Python advanced topics',
        progress: 0,
        category: 'Programming',
        difficulty: 'Advanced',
        status: 'enrolled',
        rating: 3.9,
        reviews: 200,
        duration: '45',
        lectures: '200',
        level: 'intermediate',
        instructor: 'Ram'
      }
    ];
    return of(recommendations).pipe(delay(500));
  }
}