import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-promotions-page',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './promotions-page.component.html',
  styleUrls: ['./promotions-page.component.css']
})
export class PromotionsPageComponent {
  courseTitle = 'Maya Quick Start Program';
  courseDescription = 'Learn 3D modeling from scratch with Maya.';
  totalRatings = 345;
  enrolledStudents = 4500;
  timeSpent = 5; // time spent by the student in hours
  totalCourseTime = 10; // total hours for the course
  starsArray = new Array(5); // Create an array of 5 stars
  selectedLesson: any = null;
  showOverlay = false;
  activeTab = 'overview'; // Default active tab
  showRatingDropdown = false;
  isShareVisible: boolean = false;
  pageUrl: string = window.location.href;
  encodedPageUrl: string = encodeURIComponent(window.location.href);
  isContentVisible: boolean = true;
  isSidebarVisible: boolean = true; // Initially, the sidebar is visible
  reminders: any[] = [
    { title: 'Complete Section 1', dueDate: '2023-10-10' },
    { title: 'Submit Quiz', dueDate: '2023-10-12' }
  ];
  isLearningReminderModalVisible: boolean = false;

  toggleShare(): void {
    this.isShareVisible = !this.isShareVisible;
  }


  toggleOverlay(state: boolean) {
    this.showOverlay = state;
  }
  // Get Share URLs
  getWhatsAppShareUrl(): string {
    return `https://wa.me/?text=${this.encodedPageUrl}`;
  }

  getFacebookShareUrl(): string {
    return `https://www.facebook.com/sharer/sharer.php?u=${this.encodedPageUrl}`;
  }

  getTwitterShareUrl(): string {
    return `https://twitter.com/intent/tweet?url=${this.encodedPageUrl}&text=Check%20this%20out!`;
  } 
  getLinkedInShareUrl(): string {
    return `https://www.linkedin.com/shareArticle?mini=true&url=${this.encodedPageUrl}&title=Check%20this%20out!`;
  }  
  getInstagramShareUrl(): string {
    return `https://www.instagram.com/?url=${this.encodedPageUrl}`;
  }
  
  copyLink(inputElement: HTMLInputElement) {
    inputElement.select();
    navigator.clipboard.writeText(inputElement.value)
      .then(() => alert('Link copied to clipboard!'))
      .catch(err => console.error('Failed to copy link: ', err));
  }
  sections: any[] = [
    {
      title: 'Section 1: Getting Started',
      isExpanded: true,
      lessons: [
        { title: 'Introduction', resourceType: 'video', resourceUrl: 'images/rishita.mp4', duration:10 },
        { title: 'Software Installation', resourceType: 'video', resourceUrl: 'images/rishita1.mp4', duration:20 },
        {title:'Basic Quiz', resourceType: 'quiz', resourceUrl: '', duration:5}
      ]
    },
    {
      title: 'Section 2: Modeling',
      isExpanded: false,
      lessons: [
        { title: 'Basic Modeling Concepts', resourceType: 'video', resourceUrl: 'assets/videos/modeling-concepts.mp4',duration:10  },
        { title: 'Modeling Tools Overview', resourceType: 'doc', resourceUrl: 'assets/docs/modeling-tools.docx', duration:2 },
        {title:'Basic Quiz', resourceType: 'quiz', resourceUrl: '', duration:5}
      ]
    },
    {
      title: 'Section 3: Magnification',
      isExpanded: false,
      lessons: [
        { title: 'Basic Modeling Concepts', resourceType: 'video', resourceUrl: 'assets/videos/modeling-concepts.mp4', duration:20 },
        { title: 'Modeling Tools Overview', resourceType: 'doc', resourceUrl: 'assets/docs/modeling-tools.docx', duration:2},
          {title:'Basic Quiz', resourceType: 'quiz', resourceUrl: '', duration:5}
         
      ]
    },
    {
      title: 'Section 4: Working with Maya',
      isExpanded: false,
      lessons: [
        { title: 'Basic Modeling Concepts', resourceType: 'video', resourceUrl: 'assets/videos/modeling-concepts.mp4' , duration:20},
        { title: 'Modeling Tools Overview', resourceType: 'doc', resourceUrl: 'assets/docs/modeling-tools.docx', duration:2 },
        {title:'Basic Quiz', resourceType: 'quiz', resourceUrl: '', duration:5}
      ]
    }
   
  ];

  instructorName = 'John Doe';
  instructorBio = 'John Doe is an experienced 3D artist and animator, with over 10 years of expertise in using Maya for creating stunning visual effects and animations. He has worked with top studios and is passionate about teaching others the skills needed to succeed in the world of 3D design.';
instructorImage="https://img-c.udemycdn.com/user/200_H/209434302_76cb_2.jpg";
  constructor(private router: Router) {}

  getCircleBackground(progress: number): string {
    return `conic-gradient(#007bff ${progress}%, #ccc ${progress}%)`;
  }

  ngOnInit(): void {
    const firstSection = this.sections[0];
    if (firstSection && firstSection.lessons.length > 0) {
      this.selectedLesson = firstSection.lessons[0];
    }
  }

  toggleSection(section: any): void {
    section.isExpanded = !section.isExpanded;
  }

  selectLesson(lesson: any): void {
    this.selectedLesson = lesson;
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  progress = 20;
  isDropdownOpen = false;
  isMenuOpen = false;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    const navLinks = document.querySelector('.nav-links');
    if (navLinks) {
      navLinks.classList.toggle('show', this.isMenuOpen);
    }
  }
  onShareClick() {
    // Add share logic here
    alert('Shared!');
  }

  onLearnMoreClick() {
    // Add learn more logic here
    alert('Learn more clicked!');
  }
  rating = 1;
  review = '';
  stars = [1, 2, 3, 4, 5];
  isRatingDropdownOpen = false;
   // Toggle the visibility of the rating dropdown
   toggleRatingDropdown() {
    this.isRatingDropdownOpen = !this.isRatingDropdownOpen;
  }

  // Submit the review and rating (you can send this data to a backend)
  toggleRating() {
    this.showRatingDropdown = !this.showRatingDropdown;
  }

  rate(star: number) {
    this.rating = star;
  }

  submitReview() {
    console.log('Rating:', this.rating);
    console.log('Review:', this.review);
    // Submit the rating and review to the server here
    this.showRatingDropdown = false;
  }
  completedLessons: number = 7; // Example number of completed lessons
  totalLessons: number = 10; // Total lessons
  isDropdownVisible: boolean = false; // To toggle dropdown visibility

  // Calculate the progress percentage
  get progressPercentage(): number {
    return (this.completedLessons / this.totalLessons) * 100;
  }

  // Calculate the offset for the circular progress bar
  get offset(): number {
    const radius = 16;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (this.progressPercentage / 100) * circumference;
    return offset;
  }

  // Circumference of the circle (fixed value for radius = 16)
  get circumference(): number {
    return 2 * Math.PI * 16;
  }

  // Function to toggle the dropdown visibility
  toggleProgressDropdown() {
    this.isDropdownVisible = !this.isDropdownVisible;
  }

  noteText: string = '';        // Holds the note text
  selectedStyle: string = 'normal';  // Holds selected style
  timer: string = '0:00';        // Timer placeholder
  isEditing: boolean = true;     // Flag to toggle between editing and viewing modes

  // Method to apply selected text style
  applyStyle() {
    // Additional logic to apply selected style can be implemented here
  }


  saveNote() {

    console.log('Note saved:', this.noteText);
  }

  // Dynamically apply text style based on selected style
  applyTextStyle() {
    let style = {};
    if (this.selectedStyle === 'bold') {
      style = { 'font-weight': 'bold' };
    } else if (this.selectedStyle === 'italic') {
      style = { 'font-style': 'italic' };
    } else if (this.selectedStyle === 'underline') {
      style = { 'text-decoration': 'underline' };
    }
    return style;
  }
  
  editNote() {
    this.isEditing = true;
  }

  deleteNote() {
    this.noteText = '';
    this.isEditing = true;
  }
  announcements = [
    {
      logo: 'path/to/logo1.png',
      title: '3D Career Webinar',
      date: '9 years ago',
      author: '3DTraining',
      content: '3DTraining.com is hosting a 3D Career Webinar...',
      comments: [
        { author: 'RK', text: 'Great opportunity!' }
      ],
      showComments: false
    },
    {
      logo: 'path/to/logo2.png',
      title: 'New Course Released',
      date: '10 years ago',
      author: '3DTraining',
      content: 'Are you interested in working in the gaming industry?',
      comments: [],
      showComments: false
    }
  ];

  toggleComments(announcement: any) {
    announcement.showComments = !announcement.showComments;
  }

  addComment(announcement: any) {
    const commentText = prompt("Enter your comment:");
    if (commentText) {
      announcement.comments.push({ author: 'Guest', text: commentText });
    }
  }

  createAnnouncement() {
    console.log('Create new announcement');
  }
  reviews = [
    {
      userImage: 'path/to/user1.png',
      username: 'John Doe',
      rating: 5,
      content: 'This course was amazing! Learned so much!',
      date: '2 days ago',
      showReply: false,
      reply: ''
    },
    {
      userImage: 'path/to/user2.png',
      username: 'Jane Smith',
      rating: 4,
      content: 'Great content, but could use more examples.',
      date: '1 week ago',
      showReply: false,
      reply: ''
    }
  ];

  // Get an array of stars based on rating
  getStars(rating: number): number[] {
    return new Array(rating);  // Creates an array with 'rating' number of stars
  }

  addReview() {
    console.log('Add a new review');
  }

  replyToReview(review: any) {
    review.showReply = !review.showReply;
  }

  submitReply(review: any) {
    if (review.reply) {
      console.log('Reply submitted:', review.reply);
      review.showReply = false;
      review.reply = '';  // Clear the reply input after submitting
    }
  }
  
  goToNextLesson() {
    const currentSection = this.sections.find(section => 
      section.lessons.includes(this.selectedLesson)
    );
    const currentLessonIndex = currentSection.lessons.indexOf(this.selectedLesson);

    if (currentLessonIndex !== -1 && currentLessonIndex < currentSection.lessons.length - 1) {
      this.selectedLesson = currentSection.lessons[currentLessonIndex + 1];
    } else {
      console.log('No more lessons in this section.');
    }
  }
  goToPreviousLesson() {
    const currentSection = this.sections.find(section => 
      section.lessons.includes(this.selectedLesson)
    );
    const currentLessonIndex = currentSection.lessons.indexOf(this.selectedLesson);

    if (currentLessonIndex > 0) {
      this.selectedLesson = currentSection.lessons[currentLessonIndex - 1]; // Move to the previous lesson
    } else {
      console.log("This is the first lesson in this section.");
    }
  }

  @ViewChild('videoPlayer') videoPlayer!: ElementRef;

  ngOnChanges() {
    if (this.videoPlayer) {
      this.videoPlayer.nativeElement.load(); // Reloads the video source
    }
  }

  isBioExpanded: boolean = false;

  toggleBio(): void {
    this.isBioExpanded = !this.isBioExpanded;
  }

  navigateHome() {
    this.router.navigate(['/home']);
  }

  addReminder() {
    const title = prompt('Enter reminder title:');
    const dueDate = prompt('Enter due date (YYYY-MM-DD):');
    const dueTime = prompt('Enter due time (HH:MM):');
    if (title && dueDate && dueTime) {
      this.reminders.push({ title, dueDate, dueTime });
    }
  }

  showLearningReminderModal() {
    this.isLearningReminderModalVisible = true;
  }

  hideLearningReminderModal() {
    this.isLearningReminderModalVisible = false;
  }
}