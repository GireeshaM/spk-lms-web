import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../logins/login/login.component';
import { register } from 'module';
import { RegisterComponent } from '../logins/register/register.component';

// Declare Bootstrap globally
declare var bootstrap: any;

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule, RouterLinkActive],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {

  isExpanded = false;
  searchQuery: string = '';

  modules = [
    {
      moduleName: 'Dashboard',
      url: '/dashboard',
      icon: '<svg class="bi" width="24" height="24"><use xlink:href="#speedometer2"></use></svg>',
      aspNetMenuItems: []
    },
    {
      moduleName: 'Course Creation',
      url: '',
      icon: '<svg class="bi" width="24" height="24"><use xlink:href="#file-earmark"></use></svg>',
      aspNetMenuItems: [
        { menuItemName: 'Create Course', url: '/Instructor/course-creation/create-course' },
        { menuItemName: 'Define Course Learnings', url: '/Instructor/course-creation/define-course-learnings' },
        { menuItemName: 'List Requirements', url: '/Instructor/course-creation/list-requirements' }
      ]
    },
    {
      moduleName: 'Course Content Flow',
      url: '',
      icon: '<svg class="bi" width="24" height="24"><use xlink:href="#file-earmark"></use></svg>',
      aspNetMenuItems: [
        { menuItemName: 'Add Accessibility', url: '/Instructor/course-contant-flow/add-accessibility' },
        { menuItemName: 'Create Course Content', url: '/Instructor/course-contant-flow/create-course-contant' }
      ]
    },
    {
      moduleName: 'Course Marketing',
      url: '',
      icon: '<svg class="bi" width="24" height="24"><use xlink:href="#megaphone"></use></svg>',
      aspNetMenuItems: [
        { menuItemName: 'Course Landing Page', url: '/Instructor/course-marketing/course-landing-page' },
        { menuItemName: 'Bulk Upload', url: '/Instructor/course-marketing/course-message' },
      ]
    },
    {
      moduleName: 'Student Engagement',
      url: '',
      icon: '<svg class="bi" width="24" height="24"><use xlink:href="#message"></use></svg>',
      aspNetMenuItems: [
        { menuItemName: 'Add FAQs', url: '/Instructor/communication-student-engagement/add-faqs' },
        { menuItemName: 'View Assignment Feedback', url: '/Instructor/communication-student-engagement/view-assignments-feedback' },
        { menuItemName: 'View Messages', url: '/Instructor/communication-student-engagement/view-messages' }
      ]
    },
    {
      moduleName: 'Engagement & Traffic Analysis',
      url: '',
      icon: '<svg class="bi" width="24" height="24"><use xlink:href="#bar-chart"></use></svg>',
      aspNetMenuItems: [
        { menuItemName: 'Track Course Engagement', url: '/Instructor/engagement-traffic-analysis/track-course-engagement' },
        { menuItemName: 'View Marketplace Insights', url: '/Instructor/engagement-traffic-analysis/view-marketplace-insights' },
        { menuItemName: 'View Traffic', url: '/Instructor/engagement-traffic-analysis/view-traffic' }
      ]
    },
    {
      moduleName: 'Instructor Community Support',
      url: '',
      icon: '<svg class="bi" width="24" height="24"><use xlink:href="#people"></use></svg>',
      aspNetMenuItems: [
        { menuItemName: 'Access Teaching Resources', url: '/Instructor/instructor-community-support/access-teaching-resources' },
        { menuItemName: 'Contact Help & Support', url: '/Instructor/instructor-community-support/contact-help-support' },
        { menuItemName: 'Instructor Community', url: '/Instructor/instructor-community-support/instructor-community' }
      ]
    }
  ];

  constructor(private router: Router, private dialog: MatDialog) { }

  toggleNavbar() {
    this.isExpanded = !this.isExpanded;
  }

  toggleSidebar() {
    this.isExpanded = !this.isExpanded;
  }

  toggleMenu(event: Event) {
    event.preventDefault();
    const target = (event.target as HTMLElement).closest('.nav-item');
    if (target) {
      target.classList.toggle('open');
    }
  }

  navigateHome() {
    this.router.navigate(['/']);
  }

  onSearch() {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/search'], { queryParams: { query: this.searchQuery } });
    }
  }

  openlogin() {
    this.dialog.open(LoginComponent, {
      width: '400px',
      disableClose: true,
    });
  }

  openRegistration() {
    this.dialog.open(RegisterComponent, {
      width: '400px',
      disableClose: true,
    })
  }

  logout() {
    console.log('User logged out');
    this.router.navigate(['/login']);
  }
}
