import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Chart } from 'chart.js/auto';

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
  studentName: string = "John Doe";
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
  private categorizeCourses() {
    // Filter only completed courses (assuming 'score' indicates completion)
    const completedCourses = this.grades.filter(grade => 
      typeof grade.score === 'number' && grade.score >= 0
    );
  
    this.proficientCourses = completedCourses.filter(grade => grade.score >= 80);
    this.intermediateCourses = completedCourses.filter(grade => grade.score >= 60 && grade.score < 80);
    this.averageCourses = completedCourses.filter(grade => grade.score < 60);
  }
  // ✅ Added this to fix the error
  allSkills: string[] = ["Angular", "JavaScript", "TypeScript", "Database Management", "AI/ML", "Web Design"];

  private charts: Chart[] = [];

  constructor(private router: Router, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.calculateDomainScores();
    this.calculateOverallPerformance();
    this.categorizeCourses();
  }
  
  ngOnDestroy(): void {
    this.charts.forEach(chart => chart.destroy());
  }

  calculateDomainScores() {
    const domainScores: { [key: string]: { totalScore: number; count: number } } = {};
    this.grades.forEach(grade => {
      if (!domainScores[grade.domain]) {
        domainScores[grade.domain] = { totalScore: 0, count: 0 };
      }
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
    if (this.grades.length === 0) {
      this.overallPerformance = 0;
      return;
    }
    const total = this.grades.reduce((sum, grade) => sum + grade.score, 0);
    this.overallPerformance = total / this.grades.length;
  }

  getPerformanceStatus(): string {
    const avg = this.overallPerformance;
    if (avg >= 85) return 'Exceptional Performer';
    if (avg >= 70) return 'Competent Performer'; 
    if (avg >= 60) return 'Developing Performer';
    return 'Needs Significant Improvement';
  }

  getMasteryProgress(): number {
    const passingThreshold = 70;
    const strongCount = this.strongDomains.filter(d => d.averageScore >= passingThreshold).length;
    return (strongCount / (this.strongDomains.length + this.weakDomains.length)) * 100;
  }
  getSkillLevel(score: number): string {
    if (score >= 80) return 'Expert';
    if (score >= 60) return 'Intermediate';
    return 'Beginner';
}
getProficiencyLevel(overallPerformance: number): string {
  if (overallPerformance >= 90) {
    return 'Expert Level Proficiency';
  } else if (overallPerformance >= 80) {
    return 'Advanced Proficiency';
  } else if (overallPerformance >= 70) {
    return 'Proficient Competency';
  } else if (overallPerformance >= 60) {
    return 'Functional Competency';
  } else {
    return 'Developing Capability';
  }
}

getSkillBadgeClass(score: number): string {
    if (score >= 80) return 'badge-label badge-expert';
    if (score >= 60) return 'badge-label badge-intermediate';
    return 'badge-label badge-beginner';
}
calculateGPA(percentage: number): number {
  // Convert percentage score to 4.0 scale with +/- granularity
  if (percentage >= 90) return 4.0;
  else if (percentage >= 85) return 3.7;
  else if (percentage >= 80) return 3.3;
  else if (percentage >= 75) return 3.0;
  else if (percentage >= 70) return 2.7;
  else if (percentage >= 65) return 2.3;
  else if (percentage >= 60) return 2.0;
  else return 0.0;  // Failing grade
}
getImprovementSuggestions(domain: string): string {
  const suggestions: { [key: string]: string } = {
    'Client-Side Solutions': 'Enhance cross-platform compatibility and optimize user experience metrics',
    'Data Infrastructure Management': 'Improve data lifecycle management and storage optimization strategies',
    'Intelligent Systems & Analytics': 'Develop predictive modeling capabilities and enhance algorithmic efficiency'
  };
  return suggestions[domain] || 'Implement best practices and leverage enterprise-grade solutions for operational excellence';
}

  goToCourseDetails() {
    this.router.navigate(['/coursedetails']);
  }
}
