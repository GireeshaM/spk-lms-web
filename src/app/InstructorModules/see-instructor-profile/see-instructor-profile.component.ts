import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AdminNavComponent } from '../../admin/admin-nav/admin-nav.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-see-instructor-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, AdminNavComponent,RouterLink],
  templateUrl: './see-instructor-profile.component.html',
  styleUrl: './see-instructor-profile.component.css'
})
export class SeeInstructorProfileComponent {
  searchText: string = '';
  sortBy: string = '';
  selectedInstructor: any = null;
  currentPage: number = 1;
  instructorsPerPage: number = 6;

  constructor(private router: Router) {}
  
  instructors = [
    { id: 1, name: 'Monish', email: 'monish@gmail.com', specialization: 'Web Development', rating: 4.7, studentsEnrolled: 350, 
      profileImage: 'https://img.freepik.com/free-photo/successful-businessman_1098-18155.jpg',
      courses: [{ id: 101, name: 'Angular Basics', uploaded: true }, { id: 102, name: 'Advanced JavaScript', uploaded: false }] },

    { id: 2, name: 'Kranthi Kumar', email: 'Kranthi@gmail.com', specialization: 'Data Science', rating: 4.9, studentsEnrolled: 480, 
      profileImage: 'https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?q=80&w=2106&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      courses: [{ id: 201, name: 'Python for Data Science', uploaded: true }, { id: 202, name: 'Machine Learning Essentials', uploaded: false }] },

    { id: 3, name: 'Naveen', email: 'naveen@gmail.com', specialization: 'Cybersecurity', rating: 4.6, studentsEnrolled: 290, 
      profileImage: 'https://images.unsplash.com/photo-1618926749434-0578ceecdfab?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      courses: [{ id: 301, name: 'Ethical Hacking', uploaded: false }, { id: 302, name: 'Cybersecurity Basics', uploaded: true }] },

    { id: 4, name: 'Teja', email: 'teja@gmail.com', specialization: 'Cloud Computing', rating: 4.8, studentsEnrolled: 500, 
      profileImage: 'https://plus.unsplash.com/premium_photo-1682089810582-f7b200217b67?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      courses: [{ id: 401, name: 'AWS Essentials', uploaded: true }, { id: 402, name: 'Azure Fundamentals', uploaded: false }] },

    { id: 5, name: 'Mounika', email: 'mounika@gmail.com', specialization: 'AI & ML', rating: 4.9, studentsEnrolled: 600, 
      profileImage: 'https://images.unsplash.com/photo-1573165850883-9b0e18c44bd2?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      courses: [{ id: 501, name: 'Deep Learning', uploaded: true }, { id: 502, name: 'Neural Networks', uploaded: false }] },

    { id: 6, name: 'kusuma', email: 'kusuma@gmail.com', specialization: 'Blockchain', rating: 4.5, studentsEnrolled: 270, 
      profileImage: 'https://images.unsplash.com/photo-1573497019707-1c04de26e58c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      courses: [{ id: 601, name: 'Blockchain Basics', uploaded: false }, { id: 602, name: 'Ethereum Smart Contracts', uploaded: true }] },

    { id: 7, name: 'Virat', email: 'virat@gmail.com', specialization: 'Network Security', rating: 4.6, studentsEnrolled: 320, 
      profileImage: 'https://media.istockphoto.com/id/1587315781/photo/happy-laughing-guy-posing-with-arms-folded.jpg?s=1024x1024&w=is&k=20&c=PhlH8J6fq8OjC67fvza6GLCqot3VCsm-YbOv14_CAfc=',
      courses: [{ id: 701, name: 'Network Penetration Testing', uploaded: true }, { id: 702, name: 'Firewalls and IDS', uploaded: false }] },

    { id: 8, name: 'Siraj', email: 'siraj@gmail.com', specialization: 'Big Data', rating: 4.7, studentsEnrolled: 400, 
      profileImage: 'https://media.istockphoto.com/id/628330656/photo/smiling-man-with-laptop-on-rooftop.jpg?s=1024x1024&w=is&k=20&c=u7C5CgiOiYgw20o1xVCZVuaCWi3kH1SZAHQCfOBEG_0=',
      courses: [{ id: 801, name: 'Hadoop & Spark', uploaded: true }, { id: 802, name: 'Data Warehousing', uploaded: false }] },

    { id: 9, name: 'K L Rahul', email: 'klrahul@gmail.com', specialization: 'DevOps', rating: 4.8, studentsEnrolled: 450, 
      profileImage: 'https://media.istockphoto.com/id/1369199360/photo/portrait-of-a-handsome-young-businessman-working-in-office.jpg?s=1024x1024&w=is&k=20&c=-xjY_sj5IU0ibPJn3t8Qf63XyBlunViU3oeT2RwJ3RE=',
      courses: [{ id: 901, name: 'Docker & Kubernetes', uploaded: true }, { id: 902, name: 'CI/CD Pipelines', uploaded: false }] },

    { id: 10, name: 'Smithi', email: 'smithi@gmail.com', specialization: 'UI/UX Design', rating: 4.7, studentsEnrolled: 310, 
      profileImage: 'https://images.pexels.com/photos/18536022/pexels-photo-18536022/free-photo-of-beautiful-indian-woman-fixing-her-hair.jpeg',
      courses: [{ id: 1001, name: 'Figma Mastery', uploaded: true }, { id: 1002, name: 'Adobe XD Basics', uploaded: false }] }
  ];

  get filteredInstructors() {
    return this.instructors
      .filter(i => i.name.toLowerCase().includes(this.searchText.toLowerCase()))
      .sort((a, b) => {
        if (this.sortBy === 'name') return a.name.localeCompare(b.name);
        if (this.sortBy === 'rating') return b.rating - a.rating;
        if (this.sortBy === 'totalCourses') return b.courses.length - a.courses.length;
        if (this.sortBy === 'studentsEnrolled') return b.studentsEnrolled - a.studentsEnrolled;
        return 0;
      })
      .slice((this.currentPage - 1) * this.instructorsPerPage, this.currentPage * this.instructorsPerPage);
  }

  get totalPages(): number {
    return Math.ceil(this.instructors.length / this.instructorsPerPage);
  }

  changePage(page: number) {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  viewInstructor(instructor: any) {
    this.selectedInstructor = instructor;
  }

  uploadCourse(course: any) {
    course.uploaded = true;
    Swal.fire({
      icon: 'success',
      title: 'Course Uploaded Successfully!',
      text: `${course.name} has been uploaded.`,
      confirmButtonColor: '#28a745',
    });
  }

  getPendingUploads(instructor: any): number {
    return instructor.courses.filter((c: any) => !c.uploaded).length;
  }
  
}