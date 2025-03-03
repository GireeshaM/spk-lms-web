import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterestserviceService {

  private userInterests = [
    { name: 'Web Development', logoUrl: 'assets/logos/web-development.png' },
    { name: 'Machine Learning', logoUrl: 'assets/logos/machine-learning.png' },
    { name: 'Cyber Security', logoUrl: 'assets/logos/cyber-security.png' }
  ];

  constructor() {}

  getUserInterests(userId: number): Observable<any[]> {
    return of(this.userInterests);
  }

  addInterest(userId: number, interest: string): Observable<any> {
    const newInterest = { name: interest, logoUrl: 'assets/logos/default.png' };
    this.userInterests.push(newInterest);
    return of(newInterest);
  }

  removeInterest(userId: number, interest: string): Observable<any> {
    this.userInterests = this.userInterests.filter(i => i.name !== interest);
    return of(this.userInterests);
  }
}