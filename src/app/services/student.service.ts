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
  description: string;
  progress: number;
  category: string;
  difficulty: string;
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
}

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private studentData$ = new BehaviorSubject<Student>(this.initializeStudentData());

  constructor() { }

  private initializeStudentData(): Student {
    return {
      name: 'John Doe',
      email: 'johndoe@example.com',
      profilePhoto: 'https://i.pravatar.cc/150?img=12',
      grades: [
        { type: 'study', hours: 15 },
        { type: 'exam', hours: 5 },
        { type: 'study', hours: 10 }
      ],
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
      ],
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
      ],
      enrolledCourses: [
        { 
          id: 3,
          name: 'JavaScript Essentials', 
          image: 'images/js.png',
          description: 'Core JavaScript concepts', 
          progress: 30, 
          category: 'Programming', 
          difficulty: 'Beginner' 
        },
        // ... other courses
      ],
      interests: [
        { 
          id: 7,
          name: 'Machine Learning', 
          image: 'images/machine-learning.jpg',
          description: 'AI & ML fundamentals', 
          progress: 0, 
          category: 'AI', 
          difficulty: 'Intermediate' 
        },
        // ... other interests
      ],
      recommendedCourses: []
    };
  }

  getStudentData(): Observable<Student> {
    return this.studentData$.pipe(
      delay(1000), // Simulate API delay
      catchError(error => {
        console.error('Error fetching student data:', error);
        return throwError(() => new Error('Failed to fetch student data'));
      })
    );
  }

  updateGrades(newGrades: Grade[]): void {
    const currentData = this.studentData$.value;
    this.studentData$.next({
      ...currentData,
      grades: [...currentData.grades, ...newGrades]
    });
  }

  addEnrolledCourse(course: Course): void {
    const currentData = this.studentData$.value;
    this.studentData$.next({
      ...currentData,
      enrolledCourses: [...currentData.enrolledCourses, course]
    });
  }

  updateCourseProgress(courseId: number, progress: number): void {
    const currentData = this.studentData$.value;
    const updatedCourses = currentData.enrolledCourses.map(course => {
      return course.id === courseId ? { ...course, progress } : course;
    });
    
    this.studentData$.next({
      ...currentData,
      enrolledCourses: updatedCourses
    });
  }

  generateRecommendations(): Observable<Course[]> {
    // Implementation logic for recommendations
    const recommendations: Course[] = [
      { 
        id: 9,
        name: 'Advanced Python', 
        image: 'https://via.placeholder.com/150', 
        description: 'Deep dive into Python advanced topics', 
        progress: 0, 
        category: 'Programming', 
        difficulty: 'Advanced' 
      }
    ];
    return of(recommendations).pipe(delay(500));
  }
}