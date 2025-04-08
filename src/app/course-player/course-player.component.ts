import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-player',
  imports: [CommonModule],
  templateUrl: './course-player.component.html',
  styleUrl: './course-player.component.css'
})
export class CoursePlayerComponent {
  selectedContent: { type: string; url: SafeResourceUrl } | null = null;
  isSidebarOpen = true;

  constructor(private sanitizer: DomSanitizer, private router: Router) {}

  courseSections = [
    {
      title: 'Introduction',
      length: '30m',
      expanded: false,
      lectures: [
        { title: '🔒 Welcome to the Course', type: 'video', url: this.sanitize('assets/videos/welcome.mp4') },
        { title: '🔒 Course Overview', type: 'document', url: this.sanitize('assets/docs/overview.pdf') }
      ]
    },
    {
      title: 'Python Basics & Setup',
      length: '1h 15m',
      expanded: false,
      lectures: [
        { title: '🔒 Installing Python', type: 'video', url: this.sanitize('assets/videos/python_install.mp4') },
        { title: '🔒 Python Basics', type: 'document', url: this.sanitize('assets/docs/python_basics.pdf') }
      ]
    },
    {
      title: 'Algorithmic Trading Fundamentals',
      length: '2h 30m',
      expanded: false,
      lectures: [
        { title: '🔒 Backtesting Basics', type: 'video', url: this.sanitize('assets/videos/backtesting.mp4') },
        { title: '🔒 Trading Strategies', type: 'document', url: this.sanitize('assets/docs/trading_strategies.pdf') }
      ]
    }
  ];

  sanitize(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  toggleSection(section: any) {
    section.expanded = !section.expanded;
  }

  selectContent(lecture: any) {
    this.selectedContent = lecture;
  }

  goToQuiz() {
    this.router.navigate(['/quiz']);
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
