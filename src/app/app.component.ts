import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from './logins/login/login.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { HeadComponent } from "./head/head.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, NavBarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'lms';
  constructor(public authService: AuthService, private dialog: MatDialog, private router: Router) {}

  openLoginDialog(): void {
    this.dialog.open(LoginComponent, { width: '400px', disableClose: true });
  }
  
  ngOnInit() {
  
    setTimeout(() => {
      const nav = document.querySelector('.nav-bar');
      if (nav) {
        nav.classList.add('show');
      }
    }, 1000); 

    setTimeout(() => {
      this.isPageLoaded = true;
    }, 100); // Adjust the timeout as needed
  }
  isExamInProgress = false;  // Declare the flag here

  handleExamInProgress(isInProgress: boolean) {
    this.isExamInProgress = isInProgress;
  }

  onActivate(event: any): void {
    // Check if the activated component is AssessComponent
    if (event.constructor.name === 'AssessComponent') {
      // When the exam starts, set isExamInProgress to true
      event.examInProgress.subscribe((isInProgress: boolean) => {
        this.isExamInProgress = isInProgress;
      });
    }
  }

  isPageLoaded = false;

  navigateHome() {
    this.router.navigate(['/']);
  }
}
