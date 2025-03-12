import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Chart } from 'chart.js/auto';
import { Mentor, MentorService, PeerMentor } from '../../services/mentor.service';
import { FormsModule } from '@angular/forms';

interface Grade {
  courseName: string;
  score: number;
  total: number;
  grade: string;
  domain: string;
  flipped?: boolean;
}
interface ChatSession {
  type: 'mentor' | 'peer' | null;
  participant: Mentor | PeerMentor | null;
  messages: ChatMessage[];
}

interface LearningWallet {
  credits: number;
  availableCourses: { name: string }[];
}
interface ChatMessage {
  text: string;
  sender: 'me' | 'them';
  timestamp: Date;
}

interface ChatSession {
  type: 'mentor' | 'peer' | null;
  participant: Mentor | PeerMentor | null;
  messages: ChatMessage[];
}

@Component({
  selector: 'app-student-summary',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './grades.component.html',
  styleUrl: './grades.component.css'
})
export class GradesComponent implements OnInit, OnDestroy {
  officialMentors: Mentor[] = [];
  peerMentors: PeerMentor[] = [];
  loadingMentors = false;
  isTyping = false;
  isChatOpen: boolean = false;
  learnerName: string = "John Doe";
  email: string = "johndoe@gmail.com";
  overallPerformance: number = 0;
  engagementScore: number = 8.5;
  strongDomains: { name: string, averageScore: number }[] = [];
  weakDomains: { name: string, averageScore: number }[] = [];
  proficientCourses: any[] = [];
  intermediateCourses: any[] = [];
  averageCourses: any[] = [];
  proficientPercentage: number = 90;
intermediatePercentage: number = 70;
averagePercentage: number = 60;
  learningWallet: LearningWallet = {
    credits: 100,
    availableCourses: [
      { name: "Advanced Angular" },
      { name: "Machine Learning Basics" },
      { name: "Data Science Fundamentals" }
    ]
  };proficientDomains: { name: string, averageScore: number }[] = [];
  developingDomains: { name: string, averageScore: number }[] = [];
  improvementDomains: { name: string, averageScore: number }[] = [];

  toggleChat(): void {
    this.isChatOpen = !this.isChatOpen;
}

  grades: Grade[] = [
    { courseName: "Angular Basics", score: 95, total: 100, grade: "A", domain: "Client-Side Solutions", flipped: false },
    { courseName: "JavaScript Advanced", score: 88, total: 100, grade: "B", domain: "Client-Side Solutions", flipped: false },
    { courseName: "Database Management", score: 72, total: 100, grade: "A+", domain: "Data Infrastructure Management", flipped: false },
    { courseName: "AI in Education", score: 60, total: 100, grade: "B-", domain: "Intelligent Systems & Analytics", flipped: false },
    { courseName: "Machine Learning", score: 30, total: 100, grade: "C", domain: "Intelligent Systems & Analytics", flipped: false },
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
    this.loadMentors();
    
  }
  private domainToSkillsMap: { [key: string]: string[] } = {
    'Intelligent Systems & Analytics': ['AI', 'Machine Learning'],
    'Client-Side Solutions': ['Angular', 'JavaScript', 'TypeScript'],
    'Data Infrastructure Management': ['Database Management']
  };
  activeChat: ChatSession = { 
    type: null, 
    participant: null, 
    messages: []  // Initialize empty array here
  }
  
  newMessage = '';
 
// Add this method to your component
openPeerChat(peer: PeerMentor): void {
  this.activeChat = {
    type: 'peer',
    participant: peer,
    messages: this.loadPreviousMessages(peer.id)
  };
  this.requestPeer(peer.id);
}
calcOffset(percentage: number): number {
  const radius = 36; // SVG circle radius
  const circumference = 2 * Math.PI * radius;
  return circumference - (percentage / 100) * circumference;
}
private loadMentors(): void {
  this.loadingMentors = true;
  
  // 1. Get skills from improvement domains
  const neededSkills = this.improvementDomains.reduce((skills, domain) => {
    const domainSkills = this.domainToSkillsMap[domain.name] || [];
    return [...skills, ...domainSkills];
  }, [] as string[]);

  // 2. Get courses from improvement domains
  const improvementDomainNames = this.improvementDomains.map(d => d.name);
  const lowProficiencyCourses = this.grades
    .filter(grade => improvementDomainNames.includes(grade.domain))
    .map(g => g.courseName);

  console.log('Fetching mentors with skills:', neededSkills);
  console.log('Fetching peer mentors for courses:', lowProficiencyCourses);

  // Fetch official mentors
  this.mentorService.getOfficialMentors(neededSkills).subscribe({
    next: (mentors) => {
      this.officialMentors = mentors || [];
      this.loadingMentors = false;
      this.cdr.detectChanges();
    },
    error: (err) => {
      console.error('Error fetching mentors:', err);
      this.loadingMentors = false;
    }
  });

  // 3. Fetch peer mentors for specific courses
  this.mentorService.getTopPerformers(lowProficiencyCourses).subscribe({
    next: (peers) => {
      this.peerMentors = peers;
      this.cdr.detectChanges();
    },
    error: (err) => console.error('Error fetching peer mentors:', err)
  });
}
 
  requestMentor(mentorId: string): void {
    this.mentorService.requestMentorship(mentorId).subscribe({
      next: (success) => {
        if (success) {
          const mentor = this.officialMentors.find(m => m.id === mentorId);
          if (mentor) {
            this.openChat('mentor', mentor); // Pass both 'mentor' type and the mentor object
          } else {
            console.error("Mentor details could not be fetched.");
          }
        } else {
          alert('Mentor is currently at full capacity');
        }
      },
      error: (err) => console.error('Error requesting mentorship:', err)
    });
  }
  private loadPreviousMessages(participantId: string): ChatMessage[] {
    const key = `chat_${participantId}`;
    try {
      const storedData = localStorage.getItem(key);
      if (storedData) {
        const messages = JSON.parse(storedData) as ChatMessage[];
        return messages.map(msg => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }));
      }
      return this.getWelcomeMessage();
    } catch (error) {
      console.error('Error loading messages:', error);
      return this.getWelcomeMessage();
    }
  }
  
  private getWelcomeMessage(): ChatMessage[] {
    return [{
      text: 'Welcome to our chat! How can I help you today?',
      sender: 'them',
      timestamp: new Date()
    }];
  }
  
  private saveMessages(participantId: string): void {
    const key = `chat_${participantId}`;
    try {
      localStorage.setItem(key, 
        JSON.stringify(this.activeChat.messages.map(msg => ({
          ...msg,
          timestamp: msg.timestamp.toISOString()
        })))
      );
    } catch (error) {
      console.error('Error saving messages:', error);
    }
  }
  
  openMentorChat(mentor: Mentor): void {
    this.activeChat = {
      type: 'mentor',
      participant: mentor,
      messages: this.loadPreviousMessages(mentor.id)
    };
    this.requestMentor(mentor.id);
  }
  
  

  requestPeer(peerId: string): void {
    this.mentorService.requestPeerConnection(peerId).subscribe({
      next: (success) => {
        if (success) {
          console.log('Peer connection established');
        } else {
          alert('Peer connection failed');
        }
      },
      error: (err) => console.error('Error requesting peer connection:', err)
    });
  }
  private openChat(type: 'mentor' | 'peer', participant: Mentor | PeerMentor): void {
    if (confirm(`${type === 'mentor' ? 'Mentorship' : 'Peer connection'} request accepted. Open chat?`)) {
      this.activeChat = {
        type,
        participant,
        messages: []
      };
      this.cdr.detectChanges(); // Force UI update
    }
  }
  sendMessage(): void {
    if (this.newMessage.trim() && this.activeChat.participant) {
      if (!this.activeChat.messages) {
        this.activeChat.messages = []; // Ensure messages array exists
      }
  
      this.activeChat.messages.push({
        text: this.newMessage,
        sender: 'me',
        timestamp: new Date()
      });
  
      this.isTyping = true;
      setTimeout(() => {
        this.activeChat.messages.push({
          text: this.getSimulatedResponse(this.newMessage),
          sender: 'them',
          timestamp: new Date()
        });
        this.isTyping = false;
        this.cdr.detectChanges(); // Refresh UI
      }, 1500);
  
      this.newMessage = '';
    }
  }
  
  private getSimulatedResponse(userMessage: string): string {
    const responses = {
      mentor: [
        "That's a great question! Let me explain...",
        "In my experience, the best approach is...",
        "Have you tried looking at the documentation for..."
      ],
      peer: [
        "Hey! I struggled with that too, here's what worked for me...",
        "Let's work on this together!",
        "Check out this resource I found helpful..."
      ]
    };
  
    const type = this.activeChat.type;
    const category = responses[type!];
    return category[Math.floor(Math.random() * category.length)];
  }
  closeChat(): void {
    this.activeChat = { type: null, participant: null, messages: [] };
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
  
    // Update these thresholds to match your requirements
    this.proficientDomains = domainAverages.filter(d => d.averageScore >= 80);
    this.developingDomains = domainAverages.filter(d => d.averageScore >= 60 && d.averageScore < 80);
    this.improvementDomains = domainAverages.filter(d => d.averageScore < 60);
  
    // Force refresh of mentor list when domains change
    this.loadMentors();
    this.cdr.detectChanges();
  }




  getUniqueDomains(courses: any[]): string[] {
    return [...new Set(courses.map(course => course.domain))];
}

getDomainsWithCounts(courses: any[]): {name: string, count: number}[] {
    const domainMap = new Map<string, number>();
    
    courses.forEach(course => {
        const count = domainMap.get(course.domain) || 0;
        domainMap.set(course.domain, count + 1);
    });

    return Array.from(domainMap.entries()).map(([name, count]) => ({ name, count }));
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
