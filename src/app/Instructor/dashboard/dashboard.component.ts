import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);


@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  courses = [
    { title: 'Angular Fundamentals', category: 'Web Development', instructor: 'John Doe', students: 120, active: true, updated: false, views: 5000, completed: 300, ratings: 4.5, image: 'https://5mins.org/wp-content/uploads/2020/09/Why-are-more-and-more-developers-learning-AngularJS.jpg', showMenu: false },
    { title: 'React for Beginners', category: 'Web Development', instructor: 'Jane Smith', students: 90, active: false, updated: true, views: 4000, completed: 250, ratings: 4.7, image: 'https://www.tatvasoft.com/blog/wp-content/uploads/2022/07/Why-Use-React.jpg', showMenu: false },
    { title: 'Vue.js Mastery', category: 'Web Development', instructor: 'Mark Wilson', students: 75, active: true, updated: true, views: 3000, completed: 200, ratings: 4.6, image: 'https://codingmart.com/wp-content/uploads/2024/01/image_2024-01-24_142224335.png', showMenu: false },
    { title: 'Node.js & Express', category: 'Backend Development', instructor: 'Emily Brown', students: 110, active: false, updated: true, views: 6000, completed: 350, ratings: 4.8, image: 'https://railsware.com/blog/wp-content/uploads/2018/09/2400%D1%851260-rw-blog-node-js.png', showMenu: false },
    { title: 'Data Science with Python', category: 'Data Science', instructor: 'Michael Johnson', students: 150, active: true, updated: false, views: 7000, completed: 500, ratings: 4.9, image: 'https://www.datasciencecentral.com/wp-content/uploads/2021/10/9430449274.png', showMenu: false }
  ];
  constructor() {}
  ngOnInit() {
    this.renderCourseProgressChart();
    this.renderEngagementChart();
  }
  filteredCourses = [...this.courses];
  renderCourseProgressChart() {
    new Chart("courseProgressChart", {
      type: 'bar',
      data: {
        labels: ["Python", "Angular", "ML", "React", "NodeJS"],
        datasets: [{
          label: "Completion %",
          data: [85, 60, 75, 50, 90],
          backgroundColor: ['#74b9ff', '#55efc4', '#fdcb6e', '#e17055', '#6c5ce7']
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        }
      }
    });
  }

  renderEngagementChart() {
    new Chart("engagementChart", {
      type: 'pie',
      data: {
        labels: ["Quizzes", "Notes", "Assignments", "Videos"],
        datasets: [{
          data: [30, 20, 25, 25],
          backgroundColor: ['#a29bfe', '#00cec9', '#fab1a0', '#81ecec']
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom' }
        }
      }
    });

   
  }
}