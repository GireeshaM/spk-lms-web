import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonEngine } from '@angular/ssr/node';

@Component({
  selector: 'app-rajesh',
  imports: [CommonModule,FormsModule],
  templateUrl: './rajesh.component.html',
  styleUrl: './rajesh.component.css'
})
export class RajeshComponent {
  showMore = false;

  skills = [
    "Big Data", "Business Analysis", "Data Analysis", "Data Management",
    "Decision Making", "Data Visualization", "Data Analysis Software", "Data Structures"
  ];

  showModal: boolean = false;
  isAccepted: boolean = false;

  constructor(private router: Router) {}

  // Open Terms & Conditions Modal
  openTermsModal() {
    this.showModal = true;
  }

  // Close the modal
  closeTermsModal() {
    this.showModal = false;
    this.isAccepted = false; // Reset checkbox
  }

  // Proceed to course page
  proceedToCourse() {
    if (this.isAccepted) {
      this.showModal = false;
      this.router.navigate(['/Instructor/course-marketing/promotions-page']); // Replace with actual course page route
    }
  }

  modules = [
    {
      title: 'Introduction to Data Analytics',
      time: 'Module 1 • 3 hours to complete',
      description: 'Learn the basics of data analytics and its role in decision-making.',
      expanded: false,
      detailsExpanded: false,
      videos: [
        { title: 'Specialization overview', duration: 7 },
        { title: 'Welcome to Data Driven Decision Making', duration: 2 },
        { title: 'What is Data Analytics?', duration: 7 },
        { title: 'Solving business problems using data analytics', duration: 4 },
        { title: 'Making business-defining decisions using data analytics', duration: 4 },
        { title: 'Why do you need a data and analytics framework?', duration: 3 },
        { title: 'The 4 aspects of the data and analytics framework', duration: 3 },
        { title: 'Data and analytics framework: tools and techniques', duration: 12 },
        { title: 'Make better and faster decisions with data and analytics', duration: 4 },
        { title: 'Data and analytics at PwC', duration: 5 },
        { title: 'Week 1 recap with Amity and Mike', duration: 1 }
      ],
      readings: [
        { title: 'Course overview and syllabus', duration: 10 },
        { title: 'Updating your profile', duration: 10 },
        { title: 'The value delivered by analytics', duration: 10 },
        { title: "PwC’s Global Data and Analytics Survey 2018", duration: 10 },
        { title: 'The data and analytics framework', duration: 10 },
        { title: 'Types of analytics', duration: 10 },
        { title: 'Careers and roles in a professional services firm', duration: 20 },
        { title: 'Learn more about PwC and our career opportunities', duration: 10 }
      ],
      assignments: [{ title: 'Week 1 Quiz', duration: 15 }],
      discussions: [
        { title: 'Discussion Prompt 1', duration: 10 },
        { title: 'Discussion Prompt 2', duration: 10 }
      ]
    },
    {
      title: 'Introduction to Data Analytics',
      time: 'Module 1 • 3 hours to complete',
      description: 'Learn the basics of data analytics and its role in decision-making.',
      expanded: false,
      detailsExpanded: false,
      videos: [
        { title: 'Specialization overview', duration: 7 },
        { title: 'Welcome to Data Driven Decision Making', duration: 2 },
        { title: 'What is Data Analytics?', duration: 7 },
        { title: 'Solving business problems using data analytics', duration: 4 },
        { title: 'Making business-defining decisions using data analytics', duration: 4 },
        { title: 'Why do you need a data and analytics framework?', duration: 3 },
        { title: 'The 4 aspects of the data and analytics framework', duration: 3 },
        { title: 'Data and analytics framework: tools and techniques', duration: 12 },
        { title: 'Make better and faster decisions with data and analytics', duration: 4 },
        { title: 'Data and analytics at PwC', duration: 5 },
        { title: 'Week 1 recap with Amity and Mike', duration: 1 }
      ],
      readings: [
        { title: 'Course overview and syllabus', duration: 10 },
        { title: 'Updating your profile', duration: 10 },
        { title: 'The value delivered by analytics', duration: 10 },
        { title: "PwC’s Global Data and Analytics Survey 2018", duration: 10 },
        { title: 'The data and analytics framework', duration: 10 },
        { title: 'Types of analytics', duration: 10 },
        { title: 'Careers and roles in a professional services firm', duration: 20 },
        { title: 'Learn more about PwC and our career opportunities', duration: 10 }
      ],
      assignments: [{ title: 'Week 1 Quiz', duration: 15 }],
      discussions: [
        { title: 'Discussion Prompt 1', duration: 10 },
        { title: 'Discussion Prompt 2', duration: 10 }
      ]
    },
    {
      title: 'Introduction to Data Analytics',
      time: 'Module 1 • 3 hours to complete',
      description: 'Learn the basics of data analytics and its role in decision-making.',
      expanded: false,
      detailsExpanded: false,
      videos: [
        { title: 'Specialization overview', duration: 7 },
        { title: 'Welcome to Data Driven Decision Making', duration: 2 },
        { title: 'What is Data Analytics?', duration: 7 },
        { title: 'Solving business problems using data analytics', duration: 4 },
        { title: 'Making business-defining decisions using data analytics', duration: 4 },
        { title: 'Why do you need a data and analytics framework?', duration: 3 },
        { title: 'The 4 aspects of the data and analytics framework', duration: 3 },
        { title: 'Data and analytics framework: tools and techniques', duration: 12 },
        { title: 'Make better and faster decisions with data and analytics', duration: 4 },
        { title: 'Data and analytics at PwC', duration: 5 },
        { title: 'Week 1 recap with Amity and Mike', duration: 1 }
      ],
      readings: [
        { title: 'Course overview and syllabus', duration: 10 },
        { title: 'Updating your profile', duration: 10 },
        { title: 'The value delivered by analytics', duration: 10 },
        { title: "Global Data and Analytics Survey 2018", duration: 10 },
        { title: 'The data and analytics framework', duration: 10 },
        { title: 'Types of analytics', duration: 10 },
        { title: 'Careers and roles in a professional services firm', duration: 20 },
        { title: 'Learn more about PwC and our career opportunities', duration: 10 }
      ],
      assignments: [{ title: 'Week 1 Quiz', duration: 15 }],
      discussions: [
        { title: 'Discussion Prompt 1', duration: 10 },
        { title: 'Discussion Prompt 2', duration: 10 }
      ]
    } 
  ];

  displayedModules = this.modules.slice(0, 4);
  hiddenModules = this.modules.slice(4);
  showMoreText = 'Show More';

  toggleModule(index: number) {
    this.displayedModules[index].expanded = !this.displayedModules[index].expanded;
  }

  toggleModuleDetails(index: number, event: Event) {
    event.stopPropagation();
    this.displayedModules[index].detailsExpanded = !this.displayedModules[index].detailsExpanded;
  }

  showMoreModules() {
    if (this.hiddenModules.length > 0) {
      this.displayedModules = [...this.modules];
      this.hiddenModules = [];
      this.showMoreText = 'Show Less';
    } else {
      this.displayedModules = this.modules.slice(0, 4);
      this.hiddenModules = this.modules.slice(4);
      this.showMoreText = 'Show More';
    }
  }

  getTotalTime(items: { duration: number }[]) {
    return items.reduce((total, item) => total + item.duration, 0);
  }

    // Recommended Courses Section
    courses = [
      { title: 'Data Analysis for Business', university: 'Fundação Instituto de Administração', image: 'assets/course1.jpg' },
      { title: 'Data Driven Decision Making', university: 'University of Colorado Boulder', image: 'assets/course2.jpg' },
      { title: 'Intro to Data Analytics, SQL, and EDA Using Python', university: 'University of Pennsylvania', image: 'assets/course3.jpg' },
      { title: 'Data Science for Agile Decision-Making', university: 'Duke University', image: 'assets/course4.jpg' },
    ];
  
    showMoreCourses = false;
  
    toggleCourses() {
      this.showMoreCourses = !this.showMoreCourses;
    }

  
  

    courseSections = [
      {
        title: 'Introduction',
        length: '30m',
        lectures: [
          '🔒 Welcome to the Course',
          '🔒 How to use this Course',
          '🔒 Tools and Resources Overview'
        ]
      },
      {
        title: 'Python Basics & Setup',
        length: '1h 15m',
        lectures: [
          '🔒 Installing Python and Required Libraries',
          '🔒 Python Basics for Trading',
          '🔒 Data Structures and APIs',
          '🔒 Project Setup'
        ]
      },
      {
        title: 'Algorithmic Trading Fundamentals',
        length: '2h 30m',
        lectures: [
          '🔒 What is Algorithmic Trading?',
          '🔒 Backtesting Basics',
          '🔒 Forward Testing and Live Testing',
          '🔒 Common Pitfalls and How to Avoid Them'
        ]
      },
      {
        title: 'Machine Learning for Trading',
        length: '3h',
        lectures: [
          '🔒 Introduction to ML in Finance',
          '🔒 Feature Engineering',
          '🔒 Building Predictive Models',
          '🔒 Evaluating Model Performance'
        ]
      },
      {
        title: 'AWS Cloud Deployment',
        length: '2h',
        lectures: [
          '🔒 AWS Account Setup',
          '🔒 Deploying Your Bot to EC2',
          '🔒 Scheduling Trades with AWS Lambda',
          '🔒 Monitoring and Logging'
        ]
      }
    ];

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

  // Define Reviews Array
reviews = [
  {
    name: "Alice Johnson",
    profilePic: "https://i.pravatar.cc/40?img=1",
    rating: 5,
    message: "Amazing course! Helped me a lot in understanding Gen AI.",
    date: "March 22, 2025",
    likes: 12,
  },
  {
    name: "Michael Smith",
    profilePic: "https://i.pravatar.cc/40?img=2",
    rating: 4,
    message: "Great content, but would love more real-world examples.",
    date: "March 21, 2025",
    likes: 8,
  },
  {
    name: "Sophia Davis",
    profilePic: "https://i.pravatar.cc/40?img=3",
    rating: 5,
    message: "The instructor explains everything so clearly. Highly recommend!",
    date: "March 20, 2025",
    likes: 15,
  },
];

// Like Button Function
likeReview(review: any) {
  review.likes++;
}


}