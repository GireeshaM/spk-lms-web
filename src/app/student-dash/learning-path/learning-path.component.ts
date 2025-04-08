import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { HnavComponent } from "../../hnav/hnav.component";
interface LearningPath {
  title: string;
  author: string;
  duration: number;
  enrollments: number;
  privacy: string;
  description: string;
  sections: Section[];
  enrolled?: boolean; 
}

interface Section {
  title: string;
  description: string;
  duration: number;
  items: SLMSCourse[];
}

interface SLMSCourse {
  title: string;
  description: string;
  duration: number;
  image: string;
}
@Component({
  selector: 'app-learning-path',
  imports: [CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatSelectModule,
    MatListModule, HnavComponent],
  templateUrl: './learning-path.component.html',
  styleUrl: './learning-path.component.css'
})
export class LearningPathComponent implements OnInit {
  selectedTab: string = 'all';
  searchQuery: string = '';
  sortBy: string = 'newest';
  selectedPath: LearningPath | null = null;
  isCreatingPath: boolean = false;
  isEditingPath: boolean = false;
  isAddingContent: boolean = false;
  showError: boolean = false;
  hasChanges: boolean = false; 
  activePathMenu: LearningPath | null = null; 
  enrolledPaths: LearningPath[] = [];
  Title: string = '';
  description: string = '';
  editorName: string = 'Rishita Rishita';
  duration: number = 0;
  privacySetting: string = 'Private';

  allPaths: LearningPath[] = [
    {
      title: 'Java Basics for Beginners',
      author: 'Ankit Chauhan',
      duration: 60,
      enrollments: 25,
      privacy: 'Public',
      description: 'Learn the basics of Java programming.',
      sections: [
        {
          title: 'Introduction to Java',
          description: 'Basics of Java programming language.',
          duration: 30,
          items: [
            {
              title: 'Java Basics',
              description: 'Introduction to Java programming.',
              duration: 15,
              image: 'https://via.placeholder.com/100'
            },
            {
              title: 'Java Syntax',
              description: 'Understanding Java syntax.',
              duration: 15,
              image: 'https://via.placeholder.com/100'
            }
          ]
        },
        {
          title: 'Advanced Java',
          description: 'Advanced concepts in Java programming.',
          duration: 30,
          items: [
            {
              title: 'Java Collections',
              description: 'Understanding Java collections framework.',
              duration: 15,
              image: 'https://via.placeholder.com/100'
            },
            {
              title: 'Java Streams',
              description: 'Introduction to Java streams.',
              duration: 15,
              image: 'https://via.placeholder.com/100'
            }
          ]
        }
      ]
    },
    {
      title: 'Advanced Python',
      author: 'Rohith CR',
      duration: 75,
      enrollments: 30,
      privacy: 'Public',
      description: 'Advanced concepts in Python programming.',
      sections: [
        {
          title: 'Python Basics',
          description: 'Basics of Python programming language.',
          duration: 30,
          items: [
            {
              title: 'Python Basics',
              description: 'Introduction to Python programming.',
              duration: 15,
              image: 'https://via.placeholder.com/100'
            },
            {
              title: 'Python Syntax',
              description: 'Understanding Python syntax.',
              duration: 15,
              image: 'https://via.placeholder.com/100'
            }
          ]
        },
        {
          title: 'Advanced Python',
          description: 'Advanced concepts in Python programming.',
          duration: 45,
          items: [
            {
              title: 'Python Collections',
              description: 'Understanding Python collections framework.',
              duration: 20,
              image: 'https://via.placeholder.com/100'
            },
            {
              title: 'Python Streams',
              description: 'Introduction to Python streams.',
              duration: 25,
              image: 'https://via.placeholder.com/100'
            }
          ]
        }
      ]
    },
    {
      title: 'Angular Fundamentals',
      author: 'John Doe',
      duration: 45,
      enrollments: 40,
      privacy: 'Public',
      description: 'Fundamentals of Angular framework.',
      sections: [
        {
          title: 'Introduction to Angular',
          description: 'Basics of Angular framework.',
          duration: 20,
          items: [
            {
              title: 'Angular Basics',
              description: 'Introduction to Angular framework.',
              duration: 10,
              image: 'https://via.placeholder.com/100'
            },
            {
              title: 'Angular Components',
              description: 'Understanding Angular components.',
              duration: 10,
              image: 'https://via.placeholder.com/100'
            }
          ]
        },
        {
          title: 'Advanced Angular',
          description: 'Advanced concepts in Angular framework.',
          duration: 25,
          items: [
            {
              title: 'Angular Services',
              description: 'Understanding Angular services.',
              duration: 15,
              image: 'https://via.placeholder.com/100'
            },
            {
              title: 'Angular Routing',
              description: 'Introduction to Angular routing.',
              duration: 10,
              image: 'https://via.placeholder.com/100'
            }
          ]
        }
      ]
    },
    {
      title: 'Machine Learning 101',
      author: 'Jane Smith',
      duration: 90,
      enrollments: 50,
      privacy: 'Public',
      description: 'Introduction to Machine Learning.',
      sections: [
        {
          title: 'Introduction to Machine Learning',
          description: 'Basics of Machine Learning.',
          duration: 45,
          items: [
            {
              title: 'Machine Learning Basics',
              description: 'Introduction to Machine Learning.',
              duration: 20,
              image: 'https://via.placeholder.com/100'
            },
            {
              title: 'Machine Learning Algorithms',
              description: 'Understanding Machine Learning algorithms.',
              duration: 25,
              image: 'https://via.placeholder.com/100'
            }
          ]
        },
        {
          title: 'Advanced Machine Learning',
          description: 'Advanced concepts in Machine Learning.',
          duration: 45,
          items: [
            {
              title: 'Deep Learning',
              description: 'Introduction to Deep Learning.',
              duration: 25,
              image: 'https://via.placeholder.com/100'
            },
            {
              title: 'Neural Networks',
              description: 'Understanding Neural Networks.',
              duration: 20,
              image: 'https://via.placeholder.com/100'
            }
          ]
        }
      ]
    }
  ];

  myEditedPaths: LearningPath[] = [
    {
      title: 'Deep Learning Masterclass',
      author: 'Rishita',
      duration: 120,
      enrollments: 10,
      privacy: 'Private',
      description: 'Masterclass on Deep Learning techniques.',
      sections: [
        {
          title: 'Introduction to Deep Learning',
          description: 'Basics of Deep Learning.',
          duration: 60,
          items: [
            {
              title: 'Deep Learning Basics',
              description: 'Introduction to Deep Learning.',
              duration: 30,
              image: 'https://via.placeholder.com/100'
            },
            {
              title: 'Deep Learning Algorithms',
              description: 'Understanding Deep Learning algorithms.',
              duration: 30,
              image: 'https://via.placeholder.com/100'
            }
          ]
        },
        {
          title: 'Advanced Deep Learning',
          description: 'Advanced concepts in Deep Learning.',
          duration: 60,
          items: [
            {
              title: 'Neural Networks',
              description: 'Introduction to Neural Networks.',
              duration: 30,
              image: 'https://via.placeholder.com/100'
            },
            {
              title: 'Convolutional Neural Networks',
              description: 'Understanding Convolutional Neural Networks.',
              duration: 30,
              image: 'https://via.placeholder.com/100'
            }
          ]
        }
      ]
    },
    {
      title: 'Full-Stack Web Development',
      author: 'Rishita',
      duration: 90,
      enrollments: 15,
      privacy: 'Private',
      description: 'Comprehensive guide to full-stack web development.',
      sections: [
        {
          title: 'Frontend Development',
          description: 'Basics of frontend development.',
          duration: 45,
          items: [
            {
              title: 'HTML & CSS',
              description: 'Introduction to HTML & CSS.',
              duration: 20,
              image: 'https://via.placeholder.com/100'
            },
            {
              title: 'JavaScript',
              description: 'Understanding JavaScript.',
              duration: 25,
              image: 'https://via.placeholder.com/100'
            }
          ]
        },
        {
          title: 'Backend Development',
          description: 'Basics of backend development.',
          duration: 45,
          items: [
            {
              title: 'Node.js',
              description: 'Introduction to Node.js.',
              duration: 20,
              image: 'https://via.placeholder.com/100'
            },
            {
              title: 'Express.js',
              description: 'Understanding Express.js.',
              duration: 25,
              image: 'https://via.placeholder.com/100'
            }
          ]
        }
      ]
    }
  ];

  filteredPaths: LearningPath[] = [];

  sections: Section[] = [];

  isSlmsModalOpen: boolean = false;
  searchQuerySlms: string = '';
  SlmsSearchResults: SLMSCourse[] = [];
  selectedSlmsCourses: SLMSCourse[] = [];
  isContentMenuOpen: boolean = false;
  activeSectionMenu: number | null = null;

  ngOnInit() {
    this.updateFilteredPaths();
  }

  setTab(tab: string) {
    this.selectedTab = tab;
    this.updateFilteredPaths();
  }
  updateFilteredPaths() {
    if (this.selectedTab === 'all') {
      this.filteredPaths = [...this.allPaths];
    } else if (this.selectedTab === 'edited') {
      this.filteredPaths = [...this.myEditedPaths];
    } else if (this.selectedTab === 'enrolled') {
      this.filteredPaths = [...this.enrolledPaths];
    }
    this.sortPaths();
  }


  filterPaths() {
    this.filteredPaths = (this.selectedTab === 'all' ? this.allPaths : this.myEditedPaths).filter(path =>
      path.title.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
    this.sortPaths();
  }

  sortPaths() {
    this.filteredPaths.sort((a, b) => (this.sortBy === 'newest' ? b.duration - a.duration : a.duration - b.duration));
  }

  createPath() {
    this.isCreatingPath = true;
    this.isEditingPath = false;
    this.resetForm();
  }

  cancelPathCreation() {
    this.isCreatingPath = false;
    this.isEditingPath = false;
  }

  savePath() {
    if (!this.Title || !this.description) {
      this.showError = true;
      return;
    }

    const newPath: LearningPath = {
      title: this.Title,
      author: this.editorName,
      duration: this.duration,
      enrollments: 0,
      privacy: this.privacySetting,
      description: this.description,
      sections: this.sections
    };

    this.myEditedPaths.push(newPath);

    if (newPath.privacy === 'Public') {
      this.allPaths.push(newPath);
    }

    this.updateFilteredPaths();
    this.resetForm();
    this.isCreatingPath = false;
  }

  handleSave() {
    if (this.isEditingPath) {
      this.saveChanges();
    } else {
      this.savePath();
    }
    this.closePathDetail();
  }

  saveChanges() {
    if (!this.Title || !this.description) {
      this.showError = true;
      console.log('Error: Title or description is missing');
      return;
    }

    if (this.selectedPath) {
      this.selectedPath.title = this.Title;
      this.selectedPath.description = this.description;
      this.selectedPath.duration = this.sections.reduce((total, section) => total + section.duration, 0); 
      this.selectedPath.privacy = this.privacySetting;
      this.selectedPath.sections = this.sections;

      if (this.selectedPath.privacy === 'Public') {
        const index = this.allPaths.findIndex(path => path.title === this.selectedPath?.title);
        if (index !== -1) {
          this.allPaths[index] = { ...this.selectedPath };
        }
      }

      const editedIndex = this.myEditedPaths.findIndex(path => path.title === this.selectedPath?.title);
      if (editedIndex !== -1) {
        this.myEditedPaths[editedIndex] = { ...this.selectedPath };
      }

      this.updateFilteredPaths();
      this.resetForm();
      this.isEditingPath = false;
      this.selectedPath = null;
      this.isCreatingPath = false; 
      this.hasChanges = false; 
    }
  }

  resetForm() {
    this.Title = '';
    this.description = '';
    this.duration = 0;
    this.privacySetting = 'Private';
    this.sections = [];
    this.showError = false;
    this.hasChanges = false; 
  }

  toggleContentMenu() {
    this.isContentMenuOpen = !this.isContentMenuOpen;
  }

  addSectionHeading() {
    this.sections.push({ title: 'New Section', description: '', items: [], duration: 0 });
    this.isContentMenuOpen = false;
    this.onEdit(); 
  }

  openSlmsModal() {
    this.isSlmsModalOpen = true;
  }

  closeSlmsModal() {
    this.isSlmsModalOpen = false;
    this.searchQuerySlms = '';
    this.SlmsSearchResults = [];
  }

  fetchSlmsCourses(query: string): Promise<SLMSCourse[]> {
    return new Promise((resolve) => {
      const mockCourses: SLMSCourse[] = [
        {
          title: 'Frontend Web Developer - HTML, CSS, JavaScript',
          description: 'Quick guide for web development covering HTML, CSS, and JavaScript.',
          duration: 730,
          image: 'https://via.placeholder.com/100'
        },
        {
          title: 'Mastering Angular & TypeScript',
          description: 'Learn Angular and TypeScript for modern web development.',
          duration: 645,
          image: 'https://via.placeholder.com/100'
        }
      ];

      const filteredCourses = mockCourses.filter(course =>
        course.title.toLowerCase().includes(query.toLowerCase())
      );

      setTimeout(() => resolve(filteredCourses), 1000); 
    });
  }

  searchSlmsCourses() {
    this.fetchSlmsCourses(this.searchQuerySlms).then(courses => {
      this.SlmsSearchResults = courses;
    });
  }

  addSlmsCourseToPath(course: SLMSCourse) {
    if (this.sections.length === 0) {
      this.sections.push({ title: 'New Section', description: '', items: [], duration: 0 });
    }

    const lastSection = this.sections[this.sections.length - 1];
    lastSection.items.push(course);
    lastSection.duration += course.duration;
    this.duration += course.duration;

    this.isContentMenuOpen = false;
    this.closeSlmsModal();
    this.onEdit(); 
  }

  removeSlmsCourse(course: SLMSCourse, sectionIndex: number) {
    const section = this.sections[sectionIndex];
    section.items = section.items.filter(c => c !== course);
    section.duration -= course.duration;
    this.duration -= course.duration;
    this.onEdit(); 
  }

  deleteSection(index: number) {
    this.duration -= this.sections[index].duration;
    this.sections.splice(index, 1);
    this.onEdit(); 
  }

  toggleSectionMenu(index: number) {
    this.activeSectionMenu = this.activeSectionMenu === index ? null : index;
  }

  openPathDetail(path: LearningPath) {
    this.selectedPath = path;
  }

  closePathDetail() {
    this.selectedPath = null;
  }

  editPath(path: LearningPath) {
    this.isCreatingPath = true;
    this.isEditingPath = true;
    this.Title = path.title;
    this.description = path.description;
    this.duration = path.duration;
    this.privacySetting = path.privacy;
    this.sections = path.sections;
    this.hasChanges = false; 
    this.closePathDetail(); 
  }

  calculateProgress(path: LearningPath): number {
    const totalDuration = path.sections.reduce((sum, section) => sum + section.duration, 0);
    return (totalDuration / path.duration) * 100;
  }

  addRecommendedCourses() {
    const recommendedCourses: SLMSCourse[] = [
      {
        title: 'React for Beginners',
        description: 'Learn the basics of React.',
        duration: 120,
        image: 'https://via.placeholder.com/100'
      },
      {
        title: 'Advanced Node.js',
        description: 'Deep dive into Node.js.',
        duration: 180,
        image: 'https://via.placeholder.com/100'
      }
    ];

    if (this.sections.length === 0) {
      this.sections.push({ title: 'New Section', description: '', items: [], duration: 0 });
    }

    const lastSection = this.sections[this.sections.length - 1];
    recommendedCourses.forEach(course => {
      lastSection.items.push(course);
      lastSection.duration += course.duration;
      this.duration += course.duration;
    });

    this.isContentMenuOpen = false;
    this.onEdit(); 
  }

  addLink() {
    const linkItem: SLMSCourse = {
      title: 'External Resource',
      description: 'Link to an external resource.',
      duration: 0,
      image: 'https://via.placeholder.com/100'
    };

    if (this.sections.length === 0) {
      this.sections.push({ title: 'New Section', description: '', items: [], duration: 0 });
    }

    const lastSection = this.sections[this.sections.length - 1];
    lastSection.items.push(linkItem);

    this.isContentMenuOpen = false;
    this.onEdit(); 
  }
  enrollInPath(path: LearningPath, event: Event) {
    event.stopPropagation(); // Stop event propagation
    path.enrollments += 1;
    path.enrolled = true; // Mark as enrolled
    this.enrolledPaths.push(path); // Add to enrolled paths
  }
  showEnrolledCourses() {
    this.filteredPaths = this.enrolledPaths;
  }

  onEdit() {
    this.hasChanges = true; 
  }

  togglePathMenu(path: LearningPath) {
    this.activePathMenu = this.activePathMenu === path ? null : path;
  }

  addEditors(path: LearningPath) {
    console.log('Add editors to path:', path);
  }

  duplicatePath(path: LearningPath) {
    const duplicatedPath = { ...path, title: `${path.title} (Copy)` };
    this.myEditedPaths.push(duplicatedPath);
    if (duplicatedPath.privacy === 'Public') {
      this.allPaths.push(duplicatedPath);
    }
    this.updateFilteredPaths();
  }

  deletepath(path:LearningPath){
    this.myEditedPaths=this.myEditedPaths.filter(p => p!== p);
     this.allPaths=this.allPaths.filter(p => p ! == path);
     this.updateFilteredPaths();
  }
}