import { Injectable } from '@angular/core';
import { title } from 'process';
import { BehaviorSubject, Observable, of } from 'rxjs';
interface Course {
  name: string;
  image: string;
  description?: string; // Optional because enrolledCourses doesn't have it
  progress: number;
  category?: string;
  difficulty?: string;
  instructor: string;
  rating: number;
  reviews: number;
  duration: string;
  lectures: string;
  level: string;
  status:string;
  id:number;
}


@Injectable({
  providedIn: 'root'
})

export class CourseService {
private courses=[
  {id:1,title:'HTML',description:'Learn HTML'},
  {id:2, title:'Angular',description:'Learn the fundamentals of Angular framework.'},
  {id:5, title:'Advanced Javascript',description:'Learn the advanced concepts of  Javascript.'},
  {id:3,title: 'Advanced angular',description:'learns the Angular in depth'},
  {id:4,title:'React Fundamentals',description:'learns the basics of react' }
];
private enrolledCourses = [
  { id:2,name: 'Angular for Beginners', image: 'images/angular.png', status: 'active', rating: 4.5, reviews: 1200, duration: '40', lectures: '120', level: 'Beginner', progress: 60, instructor: 'John Doe' },
  { id:4,name: 'React Fundamentals', image: 'images/react.png', status: 'active', rating: 4.6, reviews: 900, duration: '35', lectures: '100', level: 'Beginner', progress: 0, instructor: 'Jane Smith' },
  { id:5,name: 'Advanced JavaScript', image: 'images/advjs.jpg', status: 'active', rating: 4.7, reviews: 1500, duration: '50', lectures: '140', level: 'Intermediate', progress: 30, instructor: 'Mark Johnson' },
  {id:1, name: 'HTML & CSS Mastery', image: 'images/htmlcss.jpeg', status: 'completed', rating: 4.8, reviews: 1800, duration: '45', lectures: '130', level: 'Beginner', progress: 100, instructor: 'Emily Brown' }
];

private enrolledCoursesSubject = new BehaviorSubject<Course[]>([]);
  enrolledCourses$ = this.enrolledCoursesSubject.asObservable();

  setEnrolledCourses(courses: Course[]): void {
    this.enrolledCourses = courses;
    this.enrolledCoursesSubject.next(courses);
  }
  getEnrolledCourses(): Course[] {
    return this.enrolledCourses.map(course => ({
      ...course,
      
      instructor: course.instructor || 'Unknown Instructor',
      enrolled: course.reviews || 0,
      views: Math.floor(Math.random() * 10000) + 1000,
      completed: Math.floor((course.reviews || 0) * 0.7),
      rating: course.rating || 0
      
    }));
  }
  
  
  getCourses(): Observable<any[]> {
    return of(this.courses); 
  }
getCourseById(id: number) {
  return this.courses.find(course => course.id === id);  
}
// addCourse(course: { title: string; description: string }) {
//   const newId = this.courses.length + 1;
//   this.courses.push({ id: newId, ...course });
// }
}