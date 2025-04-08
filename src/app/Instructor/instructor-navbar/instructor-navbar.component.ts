import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-instructor-navbar',
  imports: [],
  templateUrl: './instructor-navbar.component.html',
  styleUrl: './instructor-navbar.component.css'
})
export class InstructorNavbarComponent {
    constructor(private router: Router) {}
  
  navigateHome() {
    this.router.navigate(['/']);
  }
}
