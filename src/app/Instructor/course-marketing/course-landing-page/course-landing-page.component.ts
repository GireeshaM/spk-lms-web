import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-course-landing-page',
  imports: [CommonModule, FormsModule],
  templateUrl: './course-landing-page.component.html',
  styleUrl: './course-landing-page.component.css'
})
export class CourseLandingPageComponent {
  course = {
    title: '',
    description: '',
    price: null,
    imageUrl: '',
    videoUrl: '',
    features: [{ text: '', imageUrl: '' }]
  };

  showPreview = false; // Initially, the preview is hidden.

  onBannerUpload(event: any) {
    const file = event.target.files[0];
    this.course.imageUrl = URL.createObjectURL(file);
  }

  onFeatureImageUpload(event: any, index: number) {
    const file = event.target.files[0];
    this.course.features[index].imageUrl = URL.createObjectURL(file);
  }

  onVideoUpload(event: any) {
    const file = event.target.files[0];
    this.course.videoUrl = URL.createObjectURL(file);
  }

  addFeature() {
    this.course.features.push({ text: '', imageUrl: '' });
  }

  removeFeature(index: number) {
    this.course.features.splice(index, 1);
  }

  submitCourse() {
    this.showPreview = true; // Show preview after submission.
    console.log('Course Uploaded:', this.course);
    alert('Course Uploaded Successfully!');
  }


  
    // Reset the preview section visibility
    sendForReview() {
      alert('Course Sent for Review!');
    
      // Reset the course object to clear all form fields
      this.course = {
        title: '',
        description: '',
        price: null,
        imageUrl: '',
        videoUrl: '',
        features: [{ text: '', imageUrl: '' }]
      };
    
      // Reset the preview section visibility
      this.showPreview = false;
    
      // Reset the file inputs (banner, video, and feature images)
      const fileInputs = document.querySelectorAll('input[type="file"]');
      fileInputs.forEach((input: any) => {
        input.value = ''; // Reset file inputs
      });
    
      // Optionally clear any displayed images and videos in the preview
      this.course.imageUrl = '';
      this.course.videoUrl = '';
    
      // Reset the feature images in the preview
      this.course.features.forEach(feature => {
        feature.imageUrl = '';
      });
    
      // If you need to clear the course preview section in the HTML too, you can toggle showPreview
      // Resetting the form fields should now work as expected.
    }
  }