import { CommonModule } from '@angular/common';
import { Component, AfterViewInit, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { Chart } from 'chart.js/auto';

interface Grade {
  courseName: string;
  score: number;
  total: number;
  grade: string;
  domain: string;
}

@Component({
  selector: 'app-grades',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './grades.component.html',
  styleUrl: './grades.component.css'
})
export class GradesComponent implements OnInit {
  studentName: string = "John Doe"; // Replace with dynamic data
  email: string = "johndoe@gmail.com";
  strongDomains: { name: string, averageScore: number }[] = [];
  weakDomains: { name: string, averageScore: number }[] = []; // New Weak Domains List
  grades: Grade[] = [
    { courseName: "Angular Basics", score: 85, total: 100, grade: "A", domain: "Frontend" },
    { courseName: "JavaScript Advanced", score: 78, total: 100, grade: "B", domain: "Frontend" },
    { courseName: "Database Management", score: 92, total: 100, grade: "A+", domain: "Database" },
    { courseName: "AI in Education", score: 70, total: 100, grade: "B-", domain: "AI/ML" },
    { courseName: "Machine Learning", score: 50, total: 100, grade: "C", domain: "AI/ML" },
    { courseName: "Web Design", score: 95, total: 100, grade: "A+", domain: "Frontend" }
  ];
  
  constructor(private router: Router, private cdr: ChangeDetectorRef) {}
  ngOnInit(): void {
    this.calculateDomainScores();
  }
  sortedGrades: Grade[] = [...this.grades]; // To store sorted grades
  highestDomain: string = '';

  

  calculateDomainScores() {
    const domainScores: { [key: string]: { totalScore: number; count: number } } = {};
  
    // Calculate total scores and counts per domain
    this.grades.forEach(grade => {
      if (!domainScores[grade.domain]) {
        domainScores[grade.domain] = { totalScore: 0, count: 0 };
      }
      domainScores[grade.domain].totalScore += grade.score;
      domainScores[grade.domain].count++;
    });
  
    // Calculate average scores
    const domainAverages = Object.keys(domainScores).map(domain => ({
      name: domain,
      averageScore: domainScores[domain].totalScore / domainScores[domain].count
    }));
  
    // Update strong/weak domains with corrected conditions
    this.strongDomains = domainAverages.filter(domain => domain.averageScore > 60); // Strong: >60
    this.weakDomains = domainAverages.filter(domain => domain.averageScore <= 60);   // Weak: ≤60
  
    this.cdr.detectChanges(); // Refresh the view
  }


  goToCourseDetails() {
    this.router.navigate(['/coursedetails']);
  }
}
