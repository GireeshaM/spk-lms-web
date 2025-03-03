import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-course-contant',
  imports: [CommonModule, FormsModule],
  templateUrl: './create-course-contant.component.html',
  styleUrl: './create-course-contant.component.css'
})
export class CreateCourseContantComponent {
  sections = [
    {
      title: 'Introduction',
      lectures: [
        { title: 'Lecture 1', contentType: null as string | null, isVideo: false, isArticle: false, articleContent: '' }
      ]
    }
  ];

  addSection() {
    this.sections.push({ title: `Section ${this.sections.length + 1}`, lectures: [] });
  }

  addLecture(sectionIndex: number) {
    this.sections[sectionIndex].lectures.push({
      title: `Lecture ${this.sections[sectionIndex].lectures.length + 1}`,
      contentType: null,
      isVideo: false,
      isArticle: false,
      articleContent: ''
    });
  }

  removeSection(index: number) {
    this.sections.splice(index, 1);
  }

  removeLecture(sectionIndex: number, lectureIndex: number) {
    this.sections[sectionIndex].lectures.splice(lectureIndex, 1);
  }

  moveSection(fromIndex: number, toIndex: number) {
    const [movedSection] = this.sections.splice(fromIndex, 1);
    this.sections.splice(toIndex, 0, movedSection);
  }

  moveLecture(sectionIndex: number, fromIndex: number, toIndex: number) {
    const [movedLecture] = this.sections[sectionIndex].lectures.splice(fromIndex, 1);
    this.sections[sectionIndex].lectures.splice(toIndex, 0, movedLecture);
  }

  openVideoUpload(sectionIndex: number, lectureIndex: number) {
    // Show video upload input and hide article editor if it's not open already
    this.sections[sectionIndex].lectures[lectureIndex].isVideo = true;
    this.sections[sectionIndex].lectures[lectureIndex].isArticle = false;
  }

  openArticleEditor(sectionIndex: number, lectureIndex: number) {
    // Show article editor and hide video upload if it's not open already
    this.sections[sectionIndex].lectures[lectureIndex].isArticle = true;
    this.sections[sectionIndex].lectures[lectureIndex].isVideo = false;
  }

  onVideoUpload(event: any, sectionIndex: number, lectureIndex: number) {
    // Handle file input (video)
    const file = event.target.files[0];
    if (file) {
      console.log("Video file selected:", file);
      // You can upload the file or store it in your lecture object as needed
    }
  }

  uploadVideo(sectionIndex: number, lectureIndex: number) {
    // Handle video upload action (e.g., send it to a server)
    console.log("Video uploaded for:", this.sections[sectionIndex].lectures[lectureIndex].title);
  }

  saveArticle(sectionIndex: number, lectureIndex: number) {
    // Save the article content
    console.log("Article saved for:", this.sections[sectionIndex].lectures[lectureIndex].title);
    console.log("Article content:", this.sections[sectionIndex].lectures[lectureIndex].articleContent);
  }
}