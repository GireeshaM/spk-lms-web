import { Injectable } from '@angular/core';
import { title } from 'process';
import { BehaviorSubject } from 'rxjs';
interface Course {
  name: string;
  image: string;
  description: string;
  progress: number;
  category: string;
  difficulty: string;
}

@Injectable({
  providedIn: 'root'
})

export class CourseService {
private courses=[
  {id:1,title:'HTML',description:'Learn HTML'},
  {id:2, title:'Angular',description:'Learn the fundamentals of Angular framework.'},
  {id:3,title: 'Advanced angular',description:'learns the Angular in depth'}
];
private enrolledCoursesSubject = new BehaviorSubject<Course[]>([]);
  enrolledCourses$ = this.enrolledCoursesSubject.asObservable();

  setEnrolledCourses(courses: Course[]): void {
    this.enrolledCoursesSubject.next(courses);
  }

getCourses() {
  return this.courses; 
}
getCourseById(id: number) {
  return this.courses.find(course => course.id === id);  
}
// addCourse(course: { title: string; description: string }) {
//   const newId = this.courses.length + 1;
//   this.courses.push({ id: newId, ...course });
// }
}