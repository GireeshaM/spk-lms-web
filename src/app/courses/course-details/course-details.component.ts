import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import * as bs from 'bootstrap';

declare var bootstrap: any;

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css'],
  imports:[CommonModule,FormsModule]
})
export class CourseDetailsComponent {

  
  // Hero / Top Section Data
  ratingValue = 4.5;
  ratingCount = 3546;
  studentsCount = 41194;
 studentFeedback = 4.7;
  courseTitle = 'Algorithmic Trading with Python and AWS';
  courseSubtitle = 'Build your own automated trading bot in Python with AWS';
  courseImage = 'assets/course.jpg';
  coursePrice = 99.99;
  discountPrice = 9.99;
  discountPercentage = 90;
  courseRating = 4.5;
  courseReviews = 3546;
  courseStudents = 41194;
  courseFeedback = 4.7;
  courseLevel = 'Intermediate';
  courseLanguage = 'English';
  courseVideo = 'assets/video.mp4';
  courseDuration = '9.5 hours';
  courseLectures = 42;    
  courseArticles = 59;
  courseResources = 45;   
  courseTests = 2;
  courseExercises = 42;
  courseCertificate = true;
  courseMobile = true;
  courseAccess = 'Lifetime access';
  courseUpdates = 'Lifetime updates';
  courseSupport = '24/7 support';
  courseInstructor = 'Alexander Hagmann';
  courseLastUpdated = '2/2025';
  courseLanguages = 'English [Auto], Korean [Auto], 4 more';
  instructorName = 'Alexander Hagmann';
  lastUpdated = '2/2025';
  languages = 'English [Auto], Korean [Auto], 4 more';

  showTerms = false;
  isChecked = false;

  constructor(private router: Router) {}

  openTermsDialog() {
    this.showTerms = true;
  }

  closeDialog() {
    this.showTerms = false;
  }

  proceed() {
    if (this.isChecked) {
      this.showTerms = false;
      this.router.navigate(['/Instructor/course-marketing/promotions-page']);
    }
  }


  // "This course includes" items
  courseIncludes = [
    '📺 44 hours on-demand video',
    '📄 59 articles',
    '📥 45 downloadable resources',
    '📝 2 practice tests',
    '💻 42 coding exercises',
    '📱 Access on mobile',
    '🎓Certificate of completion'
  ];
  reviewer = {
    name: 'Surya A.',
    courses: 56,
    reviews: 1,
    time: '4 years ago',
    comment:
      'This course is very concise and constructive. I like the way the topics were organized by the instructor and the fact that there is no time wasted in writing every code snippet from scratch every time. The legacy concepts like native JDBC and vanilla Hibernate usages are briefly explained first, followed by a deep-dive into Hibernate with JPA usage. Recommended!',
  };

  likeReview() {
    alert('You liked the review!');
  }

  dislikeReview() {
    alert('You disliked the review.');
  }


  // "What you’ll learn"
  whatYouWillLearn = [
    'Build automated Trading Bots with Python and AWS',
    'Rigorous Testing of Strategies: Backtesting, Forward Testing, Live Testing',
    'Create powerful and unique Trading Strategies using ML',
    'Fully automate and schedule your Trades in the AWS Cloud'
  ];

  // "Requirements"
  requirements = [
    'Basic Python knowledge is helpful but not mandatory',
    'AWS account for deployment (free tier possible)',
    'Curiosity for Algorithmic Trading & Data-Driven Strategies'
  ];

  // Description (short & full)
  shortDescription = `This course will teach you how to build your own algorithmic trading bot using Python, Machine Learning, and AWS. You'll learn how to test and deploy your trading strategies.`;
  fullDescription = `This course will teach you how to build your own algorithmic trading bot using Python, Machine Learning, and AWS. You'll learn how to test and deploy your trading strategies with a thorough understanding of backtesting, forward testing, and live deployment. We will also cover advanced strategies to automate your workflow in the AWS Cloud. By the end of this course, you will have a fully functional and automated trading bot capable of handling real-world market conditions. 
  \n\nYou’ll also gain valuable experience in applying machine learning techniques to identify profitable trades, mitigate risks, and handle large-scale data in a cloud environment. Whether you’re a beginner looking to get into algorithmic trading or an experienced trader seeking to automate your strategies, this course is designed to provide a comprehensive, hands-on learning experience.`;

  showFullDescription = false;

  toggleDescription() {
    this.showFullDescription = !this.showFullDescription;
  }

  // COURSE CONTENT
  courseSections = [
    {
      title: 'Introduction',
      length: '30m',
      lectures: [
        'Welcome to the Course',
        'How to use this Course',
        'Tools and Resources Overview'
      ]
    },
    {
      title: 'Python Basics & Setup',
      length: '1h 15m',
      lectures: [
        'Installing Python and Required Libraries',
        'Python Basics for Trading',
        'Data Structures and APIs',
        'Project Setup'
      ]
    },
    {
      title: 'Algorithmic Trading Fundamentals',
      length: '2h 30m',
      lectures: [
        'What is Algorithmic Trading?',
        'Backtesting Basics',
        'Forward Testing and Live Testing',
        'Common Pitfalls and How to Avoid Them'
      ]
    },
    {
      title: 'Machine Learning for Trading',
      length: '3h',
      lectures: [
        'Introduction to ML in Finance',
        'Feature Engineering',
        'Building Predictive Models',
        'Evaluating Model Performance'
      ]
    },
    {
      title: 'AWS Cloud Deployment',
      length: '2h',
      lectures: [
        'AWS Account Setup',
        'Deploying Your Bot to EC2',
        'Scheduling Trades with AWS Lambda',
        'Monitoring and Logging'
      ]
    }
  ];

  // Track which sections are open
  openSections: boolean[] = this.courseSections.map(() => false);
  expandAll = false;

  get totalLectures(): number {
    return this.courseSections.reduce((acc, section) => acc + section.lectures.length, 0);
  }

  get totalLength(): string {
    // Just a placeholder – in a real scenario, you'd sum up the times
    return '~9h 15m';
  }

  toggleSection(index: number) {
    this.openSections[index] = !this.openSections[index];
  }

  expandAllSections() {
    this.expandAll = !this.expandAll;
    this.openSections = this.openSections.map(() => this.expandAll);
  }

  // INSTRUCTOR
  instructorTitle = 'PhD, Financial Economist & Data Scientist';
  instructorBio = `Alexander is passionate about bridging the gap between academic research
    and real-world applications in finance. With a PhD in Finance and years of experience 
    in data science, he specializes in quantitative trading and machine learning.`;

  instructorImage = 'assets/instructor.png';

  // REVIEWS (OPTIONAL)
  reviews = [
    {
      name: 'John Doe',
      comment:  `Excellent course! Learned so much about AWS and how to backtest strategies.`
    },
    {
      name: 'Jane Smith',
      comment: `Great content and hands-on examples. Instructor's explanations are crystal clear.`
    }
  ];
  @ViewChild('videoPlayer') videoPlayer!: ElementRef;
  @ViewChild('videoModal') videoModalElement!: ElementRef;
  modalInstance!: bootstrap.Modal;

  ngAfterViewInit() {
    // Initialize Bootstrap Modal instance
    this.modalInstance = new bootstrap.Modal(this.videoModalElement.nativeElement);
  }

  // Open the modal and play the video
  openVideoModal() {
    this.modalInstance.show();
    this.videoPlayer.nativeElement.play();
  }

  // Close the modal and pause the video
  closeVideoModal() {
    this.videoPlayer.nativeElement.pause();
    this.modalInstance.hide();
  }
  leftColumnPoints = [
    "By the end of this course, you'll have a strong foundation on Java Persistence with Hibernate",
    "The fundamentals of First & Second Level Caching, N+1 Selects Problem & Batch Fetching, Optimistic Locking & Versioning",
    "The fundamentals of Querying database using JPQL and Criteria API (JPA)",
    "The fundamentals of Database Isolation Rules, some of the Best Practices of Java Persistence with Hibernate"
  ];

  rightColumnPoints = [
    "The fundamentals and some of the advanced JPA features for Object/Relational Mapping, Querying, Caching, Performance and Concurrency",
    "The fundamentals of Entity Relationships, Inheritance Mapping & Polymorphic Queries",
    "The fundamentals of Handling Long Conversations with Merging Detached Object and Extended Persistence Context",
    "Some of the Best Practices of Java Persistence with Hibernate"
  ];
}