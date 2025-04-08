import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-raj',
  imports: [CommonModule],
  templateUrl: './raj.component.html',
  styleUrl: './raj.component.css'
})
export class RajComponent {
  selectedVideo: string = 'assets/demo-video.mp4';  
  selectedDocument: string = '';
  
  courseSections = [
    {
      title: 'Introduction to Generative AI',
      length: '45m',
      isOpen: false,
      lectures: [
        { title: 'What is Generative AI?', type: 'video', url: 'assets/genai-intro.mp4', duration: '15m' },
        { title: 'Applications of Generative AI', type: 'video', url: 'assets/genai-applications.mp4', duration: '15m' },
        { title: 'Ethical Considerations in AI', type: 'document', url: 'assets/genai-ethics.pdf', duration: '15m' },
        { title: 'Introduction Quiz', type: 'quiz', url: '/quiz/genai-intro', duration: '15m' }
      ]
    },
    {
      title: 'Deep Learning Foundations',
      length: '1h 30m',
      isOpen: false,
      lectures: [
        { title: 'Neural Networks Basics', type: 'video', url: 'assets/neural-networks.mp4', duration: '25m' },
        { title: 'Backpropagation & Training', type: 'video', url: 'assets/backpropagation.mp4', duration: '30m' },
        { title: 'Activation Functions and Optimizers', type: 'document', url: 'assets/activation-functions.pdf', duration: '15m' },
        { title: 'Deep Learning Quiz', type: 'quiz', url: '/quiz/deep-learning', duration: '20m' }
      ]
    },
    {
      title: 'Generative Models Overview',
      length: '1h',
      isOpen: false,
      lectures: [
        { title: 'What are Generative Models?', type: 'video', url: 'assets/gen-models.mp4', duration: '20m' },
        { title: 'Types of Generative Models', type: 'video', url: 'assets/model-types.mp4', duration: '20m' },
        { title: 'Key Differences Between GANs and VAEs', type: 'document', url: 'assets/gan-vs-vae.pdf', duration: '20m' },
        { title: 'Generative Models Quiz', type: 'quiz', url: '/quiz/gen-models', duration: '20m' }
      ]
    },
    {
      title: 'Generative Adversarial Networks (GANs)',
      length: '2h',
      isOpen: false,
      lectures: [
        { title: 'Introduction to GANs', type: 'video', url: 'assets/gan-intro.mp4', duration: '30m' },
        { title: 'Training GANs', type: 'video', url: 'assets/gan-training.mp4', duration: '30m' },
        { title: 'Applications of GANs', type: 'document', url: 'assets/gan-applications.pdf', duration: '30m' },
        { title: 'GANs Quiz', type: 'quiz', url: '/quiz/gans', duration: '20m' }
      ]
    },
    {
      title: 'Building a Simple AI Model',
      length: '1h 15m',
      isOpen: false,
      lectures: [
        { title: 'Setting Up Your AI Environment', type: 'video', url: 'assets/setup-ai-env.mp4', duration: '25m' },
        { title: 'Training Your First Generative Model', type: 'video', url: 'assets/train-gen-model.mp4', duration: '30m' },
        { title: 'Evaluating Your AI Model', type: 'document', url: 'assets/evaluating-model.pdf', duration: '20m' },
        { title: 'AI Model Building Quiz', type: 'quiz', url: '/quiz/ai-model-building', duration: '15m' }
      ]
    }
  ];
  

  constructor(private router: Router) {}

  toggleSection(index: number) {
    this.courseSections[index].isOpen = !this.courseSections[index].isOpen;
  }

  playContent(lecture: any) {
    if (lecture.type === 'video') {
      this.selectedVideo = lecture.url;
      this.selectedDocument = '';
    } else if (lecture.type === 'document') {
      this.selectedDocument = lecture.url;
      this.selectedVideo = '';
    } else if (lecture.type === 'quiz') {
      this.router.navigate([lecture.url]);
    }
  }

  selectedTab: number = 0;

  tabs = [
    { label: 'Overview' },
    { label: 'Notes' },
    { label: 'Announcements' },
    { label: 'Reviews' },
    { label: 'Learning Tools' }
  ];

  selectTab(index: number) {
    this.selectedTab = index;
  }

  selectTab1(tab: string) {
    this.activeTab = tab;
  }

  
  allSkills = [
    '3D Modeling', 'Texturing', 'Lighting & Rendering', 'Rigging',
    'Animation', 'UV Mapping', 'Scene Composition', 'Maya Tools',
    'VFX Techniques', 'Shading & Materials', 'Character Design'
  ];

  displayedSkills = this.allSkills.slice(0, 4);
  showAllSkills = false;

  showMoreSkills() {
    this.displayedSkills = this.allSkills;
    this.showAllSkills = true;
  }

  whatYouWillLearn = [
    'Understand the basics of 3D design and modeling using Maya.',
    'Learn to create realistic 3D models and animations.',
    'Get familiar with Maya\'s interface, tools, and shortcuts.',
    'Master rendering and exporting techniques for different platforms.',
    'Develop problem-solving skills for 3D design challenges.',
    'Apply industry best practices in animation workflows.'
  ];
  
  prerequisites = [
    'Basic understanding of Machine Learning concepts',
    'Familiarity with Python programming',
    'Fundamental knowledge of Deep Learning frameworks like TensorFlow or PyTorch',
    'Interest in AI model training and data processing',
    'Willingness to explore prompt engineering and AI ethics'
  ];
  
  activeTab: string = 'overview';

  announcements = [
    {
      title: '🚀 New Course Update!',
      content: 'We have added a new section on advanced rendering techniques. Check it out!',
      date: 'March 20, 2025'
    },
    {
      title: '💡 Live Q&A Session',
      content: 'Join us for a live Q&A session with the instructor this Saturday at 5 PM.',
      date: 'March 18, 2025'
    },
    {
      title: '📢 Important: Course Completion Certificate',
      content: 'Remember to complete all quizzes to receive your course certificate.',
      date: 'March 15, 2025'
    }
  ];

  reviews = [
    {
      name: 'Alice Johnson',
      avatar: 'https://i.pravatar.cc/50?img=1',
      rating: 5,
      comment: 'Amazing course! The explanations are clear and practical. Highly recommended!'
    },
    {
      name: 'Mark Davis',
      avatar: 'https://i.pravatar.cc/50?img=2',
      rating: 4.5,
      comment: 'Really enjoyed this course. The instructor is very knowledgeable and explains concepts well.'
    },
    {
      name: 'Sophia Lee',
      avatar: 'https://i.pravatar.cc/50?img=3',
      rating: 4,
      comment: 'Good course overall, but I wish there were more hands-on projects.'
    }
  ];

 
}
