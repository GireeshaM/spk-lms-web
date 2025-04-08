import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-c2',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './c2.component.html',
  styleUrls: ['./c2.component.css']
})
export class C2Component {
  courseTitle: string = '';
  courseSubtitle: string = '';
  courseDescription: string = '';
  primaryTopic: string = '';
  language: string = 'English';
  level: string = '';
  category: string = '';
  selectedFile: File | null = null;

  isUploading: boolean = false;

  sections: any[] = [
    {
      title: '',
      lectures: []
    }
  ];

  constructor(private router: Router) {}

  onFileSelect(event: Event, type: string) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];
      console.log(`${type} file selected:`, file.name);
      this.selectedFile = file;
    }
  }

  addSection() {
    this.sections.push({ title: '', lectures: [] });
  }

  addLecture(sectionIndex: number) {
    this.sections[sectionIndex].lectures.push({
      title: '',
      isVideo: false,
      isArticle: false,
      articleContent: ''
    });
  }

  removeLecture(sectionIndex: number, lectureIndex: number) {
    this.sections[sectionIndex].lectures.splice(lectureIndex, 1);
  }

  openVideoUpload(sectionIndex: number, lectureIndex: number) {
    this.sections[sectionIndex].lectures[lectureIndex].isVideo = true;
    this.sections[sectionIndex].lectures[lectureIndex].isArticle = false;
  }

  openArticleEditor(sectionIndex: number, lectureIndex: number) {
    this.sections[sectionIndex].lectures[lectureIndex].isArticle = true;
    this.sections[sectionIndex].lectures[lectureIndex].isVideo = false;
  }

  onVideoUpload(event: Event, sectionIndex: number, lectureIndex: number) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      console.log(`Video selected for Section ${sectionIndex + 1}, Lecture ${lectureIndex + 1}:`, file.name);
      // You can save it to lecture object here
    }
  }

  uploadVideo(sectionIndex: number, lectureIndex: number) {
    console.log(`Uploading video for Section ${sectionIndex + 1}, Lecture ${lectureIndex + 1}`);
    // Upload logic here
  }

  saveArticle(sectionIndex: number, lectureIndex: number) {
    const content = this.sections[sectionIndex].lectures[lectureIndex].articleContent;
    console.log(`Saved article content for Section ${sectionIndex + 1}, Lecture ${lectureIndex + 1}:`, content);
  }

  moveLecture(sectionIndex: number, from: number, to: number) {
    const lectures = this.sections[sectionIndex].lectures;
    if (to < 0 || to >= lectures.length) return;

    const [moved] = lectures.splice(from, 1);
    lectures.splice(to, 0, moved);
  }

  uploadCourseContent() {
    this.isUploading = true;
    setTimeout(() => {
      this.isUploading = false;
      alert("Course content uploaded successfully!");
    }, 2000);
  }

  submitCourse() {
    if (!this.courseTitle || !this.courseSubtitle || !this.courseDescription) {
      alert("Please fill all required fields before submitting.");
      return;
    }

    const courseData = {
      title: this.courseTitle,
      subtitle: this.courseSubtitle,
      description: this.courseDescription,
      topic: this.primaryTopic,
      language: this.language,
      level: this.level,
      category: this.category
    };

    console.log("Course Submitted:", courseData);

    this.router.navigate(['/Instructor/course-marketing/pricing-page'], {
      state: { courseData }
    });
  }

  cards = [
    { title: 'Customize Upload', route: '/Instructor/course-contant-flow/create-course-contant' },
    { title: 'Bulk Upload', route: '/Instructor/course-marketing/course-message' },
    { title: 'Quiz Upload', route: '/Instructor/communication-student-engagement/view-messages' }
  ];


  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
}