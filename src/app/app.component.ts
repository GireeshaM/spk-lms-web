import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "./footer/footer.component";
import { NavBarComponent } from "./nav-bar/nav-bar.component";
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from './logins/login/login.component';
import { HeadComponent } from './head/head.component';
import { StudentProfileComponent } from './student-dash/student-profile/student-profile.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FooterComponent, NavBarComponent,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'lms';
  constructor(public authService: AuthService, private dialog: MatDialog) {}

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
  }
}
