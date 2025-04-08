import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-instructor-profile',
  imports: [CommonModule, FormsModule],
  templateUrl: './instructor-profile.component.html',
  styleUrls: ['./instructor-profile.component.css']
})
export class InstructorProfileComponent implements OnInit {
  profilePic: string;
  instructorName: string;
  bio: string;
  followers: number;
  totalCourses: number;
  totalReviews: number;
  enrolledStudents: number;
  selectedTab: string;
  activeTab: string;
  todaysFirstLook: string;

  socialLinks: { name: string, url: string }[];
  recentCourses: { title: string, description: string }[];
  reviewsList: { title: string, content: string }[];
  badges: string[];

  constructor() {
    // Initialize with default values
    this.profilePic = 'https://www.shutterstock.com/image-photo/passport-photo-portrait-young-man-260nw-2437772333.jpg';
    this.instructorName = 'Abhiram Kureti';
    this.bio = 'I am passionate about making technology easy to understand. I have taught students at the Universities and guided professionals for the past 20 years.';
    this.followers = 1200;
    this.totalCourses = 1;
    this.totalReviews = 300;
    this.enrolledStudents = 3;
    this.selectedTab = 'introduction';
    this.activeTab = 'intro'; // Default tab
    this.todaysFirstLook = '';

    this.socialLinks = [
      { name: 'LinkedIn', url: '#' },
      { name: 'Twitter', url: '#' },
      { name: 'Facebook', url: '#' }
    ];

    this.recentCourses = [
      { title: 'Course Title 1', description: 'Description of course 1.' },
      { title: 'Course Title 2', description: 'Description of course 2.' }
    ];

    this.reviewsList = [
      { title: 'Review Title 1', content: 'Content of review 1.' },
      { title: 'Review Title 2', content: 'Content of review 2.' }
    ];

    this.badges = ['Top Instructor', 'Best Seller'];
  }

  ngOnInit() {
    // Fetch dynamic data here
    this.fetchProfileData();
    this.generateTodaysFirstLook();
  }

  fetchProfileData() {
    // Simulate fetching data from an API
    setTimeout(() => {
      this.profilePic = 'https://www.shutterstock.com/image-photo/passport-photo-portrait-young-man-260nw-2437772333.jpg';
      this.instructorName = 'Abhiram Kureti';
      this.bio = 'Data Scientist.';
      this.followers = 1500;
      this.totalCourses = 20;
      this.totalReviews = 350;
      this.enrolledStudents = 5;

      this.socialLinks = [
        { name: 'LinkedIn', url: 'https://linkedin.com' },
        { name: 'Twitter', url: 'https://twitter.com' },
        { name: 'Facebook', url: 'https://facebook.com' }
      ];

      this.recentCourses = [
        { title: 'Updated Course Title 1', description: 'Updated description of course 1.' },
        { title: 'Updated Course Title 2', description: 'Updated description of course 2.' }
      ];

      this.reviewsList = [
        { title: 'Updated Review Title 1', content: 'Updated content of review 1.' },
        { title: 'Updated Review Title 2', content: 'Updated content of review 2.' }
      ];

      this.badges = ['Top Instructor', 'Best Seller', 'New Badge'];
    }, 1000);
  }

  generateTodaysFirstLook() {
    const messages = [
      'Start your day with a new course on Full Stack Development!',
      'Explore Python programming and enhance your skills.',
      'Check out the latest reviews from our students.',
      'Learn something new today with our top-rated courses.',
      'Stay motivated! Your learning journey continues.'
    ];
    const index = new Date().getDay() % messages.length;
    this.todaysFirstLook = messages[index];
  }

  selectTab(tab: string) {
    this.selectedTab = tab;
  }

  openSettings() {
    const modal = document.getElementById('settingsModal');
    if (modal) {
      modal.style.display = 'block'; // Show the modal
    }
  }

  saveSettings() {
    const modal = document.getElementById('settingsModal');
    if (modal) {
      modal.style.display = 'none'; // Hide the modal
    }
    // Logic to save settings
  }

  changeProfilePic() {
    document.getElementById('profilePicModal')!.style.display = 'flex';
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.profilePic = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  uploadProfilePic() {
    document.getElementById('profilePicModal')!.style.display = 'none';
    // Logic to upload profile picture
  }

  switchTab(tab: string) {
    this.activeTab = tab; // Update the active tab
  }

  courses = [
    {
      title: 'Full Stack Web Development',
      description: 'Learn HTML, CSS, JavaScript, and backend to build full-stack apps.',
      image: 'https://img.freepik.com/free-photo/html-css-collage-concept_23-2150061969.jpg',
      duration: '30 hours'
    },
    {
      title: 'Python for Beginners',
      description: 'Master Python programming from scratch.',
      image: 'https://img.freepik.com/free-photo/python-programming-language-coding_23-2150038835.jpg',
      duration: '25 hours'
    }
  ];

  reviews = [
    {
      name: 'John Doe',
      rating: 5,
      comment: 'Excellent instructor! Very clear and professional.'
    },
    {
      name: 'Emma Smith',
      rating: 4,
      comment: 'Great course content and teaching style.'
    }
  ];
}