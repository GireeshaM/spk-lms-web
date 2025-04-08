import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-explore-slms',
  imports: [CommonModule],
  templateUrl: './explore-slms.component.html',
  styleUrl: './explore-slms.component.css'
})
export class ExploreSlmsComponent {
  categories = [
    { title: '.NET', courses: 425, image: "images/s1.png" },
    { title: 'ARTIFICIAL ', courses: 1095, image: "images/s2.webp" },
    { title: 'MACHINE ', courses: 668, image: "images/s3.jpg" },
    { title: 'DATA SCIENCE', courses: 471, image: "images/s4.webp" },
    { title: 'INFORMATION', courses: 401, image: "images/s5.jpg" },
    { title: '5G', courses: 137, image: "images/s6.jpeg" },
    { title: 'SAP', courses: 338, image: "images/s7.png" },
    { title: 'SALESFORCE', courses: 413, image: "images/s8.webp" },
    { title: 'NETWORKING', courses: 150, image: "images/s9.jpg" },
    { title: 'SECURITY', courses: 145, image: "images/s10.jpg" },
    { title: 'ETHICAL', courses: 70, image: "images/s11.png" }
  ];
}