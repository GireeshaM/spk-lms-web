import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Chart } from 'chart.js/auto';
import { Mentor, MentorService, PeerMentor } from '../../services/mentor.service';

interface Grade {
  courseName: string;
  score: number;
  total: number;
  grade: string;
  domain: string;
  flipped?: boolean;
}

interface LearningWallet {
  credits: number;
  availableCourses: { name: string }[];
}

@Component({
  selector: 'app-student-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './grades.component.html',
  styleUrl: './grades.component.css'
})
export class GradesComponent implements OnInit, OnDestroy {
  officialMentors: Mentor[] = [];
  peerMentors: PeerMentor[] = [];
  loadingMentors = false;
  learnerName: string = "John Doe";
  email: string = "johndoe@gmail.com";
  overallPerformance: number = 0;
  engagementScore: number = 8.5;
  strongDomains: { name: string, averageScore: number }[] = [];
  weakDomains: { name: string, averageScore: number }[] = [];
  proficientCourses: any[] = [];
  intermediateCourses: any[] = [];
  averageCourses: any[] = [];
  learningWallet: LearningWallet = {
    credits: 100,
    availableCourses: [
      { name: "Advanced Angular" },
      { name: "Machine Learning Basics" },
      { name: "Data Science Fundamentals" }
    ]
  };

  grades: Grade[] = [
    { courseName: "Angular Basics", score: 85, total: 100, grade: "A", domain: "Client-Side Solutions", flipped: false },
    { courseName: "JavaScript Advanced", score: 78, total: 100, grade: "B", domain: "Client-Side Solutions", flipped: false },
    { courseName: "Database Management", score: 92, total: 100, grade: "A+", domain: "Data Infrastructure Management", flipped: false },
    { courseName: "AI in Education", score: 70, total: 100, grade: "B-", domain: "Intelligent Systems & Analytics", flipped: false },
    { courseName: "Machine Learning", score: 50, total: 100, grade: "C", domain: "Intelligent Systems & Analytics", flipped: false },
    { courseName: "Web Design", score: 95, total: 100, grade: "A+", domain: "Client-Side Solutions", flipped: false }
  ];
  
  developmentAreas: { name: string, averageScore: number }[] = [];
  skillAssessments: { competencyArea: string, proficiency: number }[] = [];
  allSkills: string[] = ["Angular", "JavaScript", "TypeScript", "Database Management", "AI/ML", "Web Design"];
  private charts: Chart[] = [];

  constructor(private router: Router, private cdr: ChangeDetectorRef, private mentorService: MentorService) {}

  ngOnInit(): void {
    this.calculateDomainScores();
    this.calculateOverallPerformance();
    this.categorizeCourses();
    this.loadMentors();
  }

  private categorizeCourses() {
    const completedCourses = this.grades.filter(grade => grade.score >= 0);
    this.proficientCourses = completedCourses.filter(grade => grade.score >= 80);
    this.intermediateCourses = completedCourses.filter(grade => grade.score >= 60 && grade.score < 80);
    this.averageCourses = completedCourses.filter(grade => grade.score < 60);
  }

  private loadMentors(): void {
    this.loadingMentors = true;
    const neededSkills = this.weakDomains.map(d => d.name); // Get weak domains for mentor skills
    const lowProficiencyCourses = this.grades
      .filter(g => g.score < 70)
      .map(g => g.courseName);

    console.log('Fetching mentors with skills:', neededSkills);
    console.log('Fetching peer mentors for low proficiency courses:', lowProficiencyCourses);

    // Fetching mentors
    this.mentorService.getOfficialMentors(neededSkills).subscribe({
      next: (mentors) => {
        console.log('Received mentors:', mentors); // Debugging line
        if (mentors && mentors.length) {
          this.officialMentors = mentors;
        } else {
          console.warn('No official mentors received');
        }
        this.loadingMentors = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error fetching mentors:', err);
        this.loadingMentors = false;
      }
   });
   

    // Fetching peer mentors
    this.mentorService.getTopPerformers(lowProficiencyCourses).subscribe({
      next: (peers) => {
        this.peerMentors = peers;
        console.log('Received peer mentors:', this.peerMentors);
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error fetching peer mentors:', err)
    });
  }

  requestMentor(mentorId: string): void {
    this.mentorService.requestMentorship(mentorId).subscribe(success => {
      alert(success ? 'Mentorship request sent successfully!' : 'Mentor is currently at full capacity');
    });
  }

  requestPeer(peerId: string): void {
    this.mentorService.requestPeerConnection(peerId).subscribe(success => {
      if (success) alert('Connection request sent to peer');
    });
  }

  ngOnDestroy(): void {
    this.charts.forEach(chart => chart.destroy());
  }

  calculateDomainScores() {
    const domainScores: { [key: string]: { totalScore: number; count: number } } = {};
    this.grades.forEach(grade => {
      if (!domainScores[grade.domain]) domainScores[grade.domain] = { totalScore: 0, count: 0 };
      domainScores[grade.domain].totalScore += grade.score;
      domainScores[grade.domain].count++;
    });
    
    const domainAverages = Object.keys(domainScores).map(domain => ({
      name: domain,
      averageScore: domainScores[domain].totalScore / domainScores[domain].count
    }));
    
    this.strongDomains = domainAverages.filter(domain => domain.averageScore > 60);
    this.weakDomains = domainAverages.filter(domain => domain.averageScore <= 60);
    this.cdr.detectChanges();
  }

  calculateOverallPerformance() {
    this.overallPerformance = this.grades.length ? this.grades.reduce((sum, grade) => sum + grade.score, 0) / this.grades.length : 0;
  }
  
  getProficiencyLevel(score: number): string {
    return score >= 80 ? 'Expert' : score >= 60 ? 'Intermediate' : 'Beginner';
  }
  
  getPerformanceStatus(): string {
    return this.overallPerformance >= 85 ? 'Exceptional Performer' :
           this.overallPerformance >= 70 ? 'Competent Performer' :
           this.overallPerformance >= 60 ? 'Developing Performer' : 'Needs Significant Improvement';
  }

  goToCourseDetails() {
    this.router.navigate(['/coursedetails']);
  }
}
