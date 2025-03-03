import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-instructor-dashboard',
  imports: [CommonModule,BsDatepickerModule,NgxChartsModule,FormsModule],
  templateUrl: './instructor-dashboard.component.html',
  styleUrl: './instructor-dashboard.component.css'
})
export class InstructorDashboardComponent {
  selectedDate: Date = new Date(); 
  totalCourses: number = 5;
  totalStudents: number = 120;
  avgPerformance: number = 87;

  
  // Course Completion Chart Data
  barChartData = [
    { name: "Course A", value: 80 },
    { name: "Course B", value: 65 },
    { name: "Course C", value: 90 },
    { name: "Course D", value: 75 }
  ];

  // Student Engagement Pie Chart Data
  pieChartData = [
    { name: "Active", value: 60 },
    { name: "Inactive", value: 40 }
  ];

  // Student Ratings (Mock Data)
  studentRatings = [
    { name: "John Doe", rating: 5, comment: "Great instructor! Really helpful." },
    { name: "Alice Smith", rating: 4, comment: "Good explanations but a bit fast-paced." },
    { name: "Robert Brown", rating: 5, comment: "Very engaging sessions!" }
  ];

  // Messages from Students
  messages = [
    { sender: "Emma Watson", message: "Can we have an extra class on grammar?" },
    { sender: "David Lee", message: "Will the final exam be online?" }
  ];

  unreadMessages: number = this.messages.length;

  constructor() {}

  ngOnInit(): void {}

  // Function to calculate star ratings
  getStars(rating: number): string {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  }

  // Function to mark all messages as read
  markMessagesAsRead(): void {
    this.unreadMessages = 0;
  }
 
  chatMessages = [
    { sender: 'Student1', text: 'Hello, when is our next class?', timestamp: this.getCurrentTime() },
    { sender: 'Instructor', text: 'It’s on Monday at 10 AM.', timestamp: this.getCurrentTime() }
  ];
  newMessage = '';
  isTyping = false;

  // Send Message
  sendMessage() {
    if (this.newMessage.trim()) {
      this.chatMessages.push({
        sender: 'Instructor',
        text: this.newMessage,
        timestamp: this.getCurrentTime()
      });
      this.newMessage = '';
      this.isTyping = false;

      // Simulated Student Response
      setTimeout(() => {
        this.chatMessages.push({
          sender: 'Student1',
          text: 'Okay, thank you!',
          timestamp: this.getCurrentTime()
        });
      }, 2000);
    }
  }

  // Detect Typing
  detectTyping(event: KeyboardEvent) {
    this.isTyping = true;
    setTimeout(() => (this.isTyping = false), 2000);
  }

  // Get Current Time
  getCurrentTime(): string {
    const now = new Date();
    return now.getHours() + ':' + (now.getMinutes() < 10 ? '0' : '') + now.getMinutes();
  }
  createCourse() {
    alert("Redirecting to course creation...");
    // Implement navigation logic here
}

uploadCourse() {
    alert("Opening file upload...");
    // Implement upload logic
}
//QUICK ACTIONSS
selectedData: string | null = null;

  showData(type: string) {
    if (type === 'reports') {
      this.selectedData = "📊 Reports Data: Here are your latest reports...";
    } else if (type === 'assignments') {
      this.selectedData = "📑 Assignment Data: Manage your pending assignments...";
    } else if (type === 'notifications') {
      this.selectedData = "🔔 Notifications: You have 3 new alerts...";
    }
  }
}