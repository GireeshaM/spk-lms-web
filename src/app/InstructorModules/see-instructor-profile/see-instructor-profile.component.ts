import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AdminNavComponent } from '../../admin/admin-nav/admin-nav.component';

@Component({
  selector: 'app-see-instructor-profile',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule,AdminNavComponent],
  templateUrl: './see-instructor-profile.component.html',
  styleUrl: './see-instructor-profile.component.css'
})
export class SeeInstructorProfileComponent {
  searchTerm: string = '';
  sortOption: string = 'rating';

  instructors = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      specialization: 'Web Development',
      bio: 'Experienced web developer with expertise in front-end frameworks and modern web technologies.',
      profileImage: 'https://geekyants.com/_next/image?url=https%3A%2F%2Fstatic-cdn.geekyants.com%2Fuser%2F771%2F2024-07-03%2F166260721-1719994001.png&w=3840&q=75',
      rating: 4.7,
      studentsEnrolled: 350,
      qualifications: ['B.Sc. in Computer Science', 'Certified Angular Developer'],
      experience: 8,
      availability: 'Monday to Friday, 9 AM - 5 PM',
      socialLinks: [
        { platform: 'LinkedIn', url: 'https://www.linkedin.com/in/johndoe' },
        { platform: 'GitHub', url: 'https://github.com/johndoe' }
      ],
      courses: [
        { id: 101, name: 'Angular Basics', description: 'Learn the fundamentals of Angular.', uploaded: true, review: '', image: 'https://ionic.io/blog/wp-content/uploads/2023/12/angular-feature-image.png', popular: true },
        { id: 102, name: 'Advanced JavaScript', description: 'Deep dive into modern JavaScript features.', uploaded: false, review: '', image: 'https://ionic.io/blog/wp-content/uploads/2023/12/angular-feature-image.png' }
      ]
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      specialization: 'Data Science',
      bio: 'Passionate data scientist specializing in machine learning and AI.',
      profileImage: 'https://femalecricket.com/wp-content/uploads/2024/03/Smriti-Mandhana-answers-the-most-Googled-Questions-about-her-1200x788.jpg',
      rating: 4.9,
      studentsEnrolled: 480,
      qualifications: ['M.Sc. in Data Science', 'Certified ML Engineer'],
      experience: 5,
      availability: 'Tuesday to Saturday, 10 AM - 6 PM',
      socialLinks: [
        { platform: 'LinkedIn', url: 'https://www.linkedin.com/in/janesmith' },
        { platform: 'GitHub', url: 'https://github.com/janesmith' }
      ],
      courses: [
        { id: 201, name: 'Python for Data Science', description: 'Master data analysis with Python.', uploaded: true, review: '', image: 'https://ionic.io/blog/wp-content/uploads/2023/12/angular-feature-image.png', popular: true },
        { id: 202, name: 'Machine Learning Essentials', description: 'Core ML algorithms and techniques.', uploaded: false, review: '', image: 'https://ionic.io/blog/wp-content/uploads/2023/12/angular-feature-image.png' }
      ]
    }
  ];

  filteredInstructors = [...this.instructors];
  selectedInstructor: any = null;

  // View instructor profile
  viewInstructor(instructor: any): void {
    this.selectedInstructor = instructor;
  }

  // Upload course (simulated)
  uploadCourse(course: any): void {
    if (!course.uploaded) {
      course.uploaded = true;
      alert(`Course "${course.name}" has been uploaded successfully!`);
    }
  }

  // Go back to instructor list
  backToList(): void {
    this.selectedInstructor = null;
  }

  // Count uploaded courses
  getUploadedCourseCount(instructor: any): number {
    return instructor.courses.filter((course: any) => course.uploaded).length;
  }

  // Count in-progress courses
  getInProgressCourseCount(instructor: any): number {
    return instructor.courses.filter((course: any) => !course.uploaded).length;
  }

  // Sort instructors based on filter
  sortInstructors(): void {
    this.filteredInstructors = [...this.instructors];

    switch (this.sortOption) {
      case 'rating':
        this.filteredInstructors.sort((a, b) => b.rating - a.rating);
        break;
      case 'courses':
        this.filteredInstructors.sort((a, b) => this.getUploadedCourseCount(b) - this.getUploadedCourseCount(a));
        break;
      case 'popularity':
        this.filteredInstructors.sort((a, b) => (b.courses.filter((c: any) => c.popular).length) - (a.courses.filter((c: any) => c.popular).length));
        break;
      case 'students':
        this.filteredInstructors.sort((a, b) => b.studentsEnrolled - a.studentsEnrolled);
        break;
    }

    if (this.searchTerm) {
      this.filteredInstructors = this.filteredInstructors.filter((instructor) =>
        instructor.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  // Send review
  sendReview(course: any): void {
    alert(`Review for "${course.name}" sent successfully!`);
  }
}