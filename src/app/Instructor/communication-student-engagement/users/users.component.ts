import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [MatCardModule, MatTableModule, CommonModule, FormsModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  selectedActionStudent: any = null;

  toggleActionMenu(student: any, event?: Event) {
    if (event) event.stopPropagation();
    this.selectedActionStudent = this.selectedActionStudent === student ? null : student;
  }

  sendMessage(student: any) {
    alert(`Message sent to ${student.name}`);
    this.selectedActionStudent = null;
  }

  suspendStudent(student: any) {
    student.status = 'Suspended';
    this.selectedActionStudent = null;
  }

  displayedColumns: string[] = ['user', 'course', 'phone', 'country', 'payment', 'status'];
  searchTerm: string = '';
  filterOpen = false;
  selectedStatus: string | null = null;
  selectedStudent: any = null;

  students = [
    { name: 'Abu Bin Ishtiyak', email: 'info@softnio.com', course: 'Front-end Development', phone: '+811 847-4958', country: 'United States', payment: 'Due', status: 'Active', initials: 'AB', color: '#8E44AD' },
    { name: 'Ashley Lawson', email: 'ashley@softnio.com', course: 'Responsive Design', phone: '+124 394-1787', country: 'United Kingdom', payment: 'Paid', status: 'Inactive', initials: 'AL', color: '#16A085' },
    { name: 'Joe Larson', email: 'larson@example.com', course: 'Mobile Application', phone: '+168 603-2320', country: 'India', payment: 'Paid', status: 'Active', initials: 'JL', color: '#3498DB' },
    { name: 'Jane Montgomery', email: 'jane84@example.com', course: 'UI/UX Design with Adobe XD', phone: '+439 271-5360', country: 'Canada', payment: 'Cancelled', status: 'Suspended', initials: 'JM', color: '#E74C3C' },
    { name: 'Liam Peterson', email: 'liam@example.com', course: 'Data Science', phone: '+512 983-7421', country: 'Germany', payment: 'Due', status: 'Active', initials: 'LP', color: '#F39C12' },
    { name: 'Sophia Reed', email: 'sophia@example.com', course: 'Machine Learning', phone: '+917 204-6523', country: 'India', payment: 'Paid', status: 'Inactive', initials: 'SR', color: '#1ABC9C' },
    { name: 'Ethan Carter', email: 'ethan@example.com', course: 'Cyber Security', phone: '+621 458-9876', country: 'Singapore', payment: 'Paid', status: 'Active', initials: 'EC', color: '#9B59B6' },
    { name: 'Olivia Martinez', email: 'olivia@example.com', course: 'Cloud Computing', phone: '+330 948-1023', country: 'France', payment: 'Due', status: 'Active', initials: 'OM', color: '#D35400' },
    { name: 'Mason Thompson', email: 'mason@example.com', course: 'Software Engineering', phone: '+154 673-8764', country: 'United States', payment: 'Paid', status: 'Active', initials: 'MT', color: '#C0392B' },
    { name: 'Ava White', email: 'ava@example.com', course: 'AI & Deep Learning', phone: '+292 456-3421', country: 'United Kingdom', payment: 'Cancelled', status: 'Suspended', initials: 'AW', color: '#34495E' },
    { name: 'Noah Wilson', email: 'noah@example.com', course: 'Blockchain Technology', phone: '+720 901-4512', country: 'Netherlands', payment: 'Paid', status: 'Active', initials: 'NW', color: '#2980B9' },
    { name: 'Mia Rodriguez', email: 'mia@example.com', course: 'Ethical Hacking', phone: '+886 395-2214', country: 'Spain', payment: 'Due', status: 'Inactive', initials: 'MR', color: '#8E44AD' },
    { name: 'William Turner', email: 'william@example.com', course: 'Business Analytics', phone: '+416 229-6453', country: 'Canada', payment: 'Paid', status: 'Active', initials: 'WT', color: '#27AE60' }
  ];

  filteredStudents = [...this.students];
  statusOptions = ['All', 'Active', 'Inactive', 'Suspended'];

  applyFilter() {
    this.filteredStudents = this.students.filter(student =>
      student.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  toggleFilter() {
    this.filterOpen = !this.filterOpen;
  }

  filterByStatus(status: string) {
    this.selectedStatus = status === 'All' ? null : status;
    this.filteredStudents = this.selectedStatus
      ? this.students.filter(student => student.status === this.selectedStatus)
      : [...this.students];
    this.filterOpen = false;
  }

  openDetails(student: any, event?: Event) {
    if (event) event.stopPropagation();
    this.selectedStudent = student;
  }

  closeModal() {
    this.selectedStudent = null;
  }
}
