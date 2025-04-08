import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import internal from 'stream';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { InstructorNavbarComponent } from "../../instructor-navbar/instructor-navbar.component";  // ✅ Import Router

@Component({
  selector: 'app-define-course-learnings',
  imports: [CommonModule, FormsModule, CommonModule, ReactiveFormsModule, InstructorNavbarComponent],
  templateUrl: './define-course-learnings.component.html',
  styleUrl: './define-course-learnings.component.css'
})
export class DefineCourseLearningsComponent {
  cards = [
    {
      title: 'Create an Engaging Course',
      description:
        "Whether you've been teaching for years or are teaching for the first time, you can make an engaging course. We've compiled resources and best practices to help you get to the next level, no matter where you're starting.",
      image: 'assets/course-creation.png',
      link: '#'
    },
    {
      title: 'Get Started with Video',
      description:
        'Quality video lectures can set your course apart. Use our resources to learn the basics.',
      image: 'assets/video-creation.png',
      link: '#'
    },
    {
      title: 'Build Your Audience',
      description:
        'Set your course up for success by building your audience.',
      image: 'assets/audience-building.png',
      link: '#'
    },
    {
      title: 'Join the New Instructor Challenge!',
      description:
        'Get exclusive tips and resources designed to help you launch your first course faster! Eligible instructors who publish their first course on time will receive a special bonus to celebrate. Start today!',
      image: 'assets/instructor-challenge.png',
      link: '#'
    }
  ];
  
  }