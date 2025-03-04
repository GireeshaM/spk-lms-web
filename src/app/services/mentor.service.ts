import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay, catchError } from 'rxjs/operators';

export interface Mentor {
  id: string;
  name: string;
  expertise: string[];
  experience: number;
  rating: number;
  currentLoad: number;
  maxLoad: number;
  availability: string[];
}

export interface PeerMentor {
  id: string;
  name: string;
  course: string;
  score: number;
  contactInfo: string;
  availability: string[];
  skills: string[];
}

@Injectable({
  providedIn: 'root'
})
export class MentorService {
  private mockMentors: Mentor[] = [
    {
      id: 'm1',
      name: 'Alex Chen',
      expertise: ['Cloud Architecture', 'Microservices'],
      experience: 8,
      rating: 4.9,
      currentLoad: 2,
      maxLoad: 5,
      availability: ['Mon 2-4pm', 'Wed 10-12pm']
    },
    {
      id: 'm2',
      name: 'Priya Patel',
      expertise: ['Machine Learning', 'Data Pipelines'],
      experience: 5,
      rating: 4.7,
      currentLoad: 3,
      maxLoad: 4,
      availability: ['Tue 3-5pm', 'Thu 9-11am']
    }
  ];

  private mockTopPerformers: PeerMentor[] = [
    {
      id: 'p1',
      name: 'Sam Wilson',
      course: 'Cloud Architecture',
      score: 98,
      contactInfo: 'sam.w@company.com',
      availability: ['Flexible'],
      skills: ['AWS', 'Terraform', 'CI/CD']
    },
    {
      id: 'p2',
      name: 'Jordan Kim',
      course: 'Machine Learning',
      score: 95,
      contactInfo: 'jordan.k@company.com',
      availability: ['Weekends'],
      skills: ['Python', 'TensorFlow', 'Data Analysis']
    }
  ];

  constructor() {}

  // Get official mentors filtered by needed skills
  getOfficialMentors(skillsNeeded: string[]): Observable<Mentor[]> {
    return of(
      this.mockMentors.filter(mentor =>
        mentor.expertise.some(skill => skillsNeeded.includes(skill))
      )
    ).pipe(delay(500), catchError(error => this.handleError(error)));
  }

  // Get top performers for specific courses
  getTopPerformers(courses: string[]): Observable<PeerMentor[]> {
    return of(
      this.mockTopPerformers.filter(peer => courses.includes(peer.course))
    ).pipe(delay(500), catchError(error => this.handleError(error)));
  }

  // Request mentorship connection
  requestMentorship(mentorId: string): Observable<boolean> {
    const mentor = this.mockMentors.find(m => m.id === mentorId);
    if (mentor && mentor.currentLoad < mentor.maxLoad) {
      mentor.currentLoad++;
      return of(true).pipe(delay(300));
    }
    return of(false).pipe(delay(300));
  }

  // Request peer connection
  requestPeerConnection(peerId: string): Observable<boolean> {
    return of(true).pipe(delay(300));
  }

  private handleError(error: any): Observable<never> {
    console.error('Mentor Service Error:', error);
    return throwError(() => new Error('Error fetching mentor data'));
  }
}
