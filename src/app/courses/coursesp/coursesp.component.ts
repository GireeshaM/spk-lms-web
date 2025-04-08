import { CommonModule } from '@angular/common';

import { Component, OnInit } from '@angular/core';

import { CourseService } from '../../services/course.service';

import { ActivatedRoute, RouterLink } from '@angular/router';



@Component({

  selector: 'app-coursesp',

  imports: [CommonModule, RouterLink],

  templateUrl: './coursesp.component.html',

  styleUrl: './coursesp.component.css'

})

export class CoursespComponent implements OnInit {

  student = {

    enrolledCourses: [

      { name: 'Advanced JavaScript', status: 'active', rating: 4.7, reviews: 1500, duration: '50', lectures: '140', level: 'Intermediate', progress: 30 },

      { name: 'HTML & CSS Mastery', status: 'completed', rating: 4.8, reviews: 1800, duration: '45', lectures: '130', level: 'Beginner', progress: 100 }

    ]

  };

  displayedCourses: {

    name: string;

    image: string;

    progress: number;

    status: string;

    instructor: string;

    enrolled: number;

    views: number;

    completed: number;

    rating: number;

  }[] = [];



  courseType: string = '';

  constructor(private route: ActivatedRoute, private courseService: CourseService) { }



  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {

      this.courseType = params['status'] || 'enrolled';

      this.filterCourses();

    });

  }



  trendingTopics: string[] = [

    'Artificial Intelligence',

    'Machine Learning',

    'Blockchain Technology',

    'Cybersecurity',

    'Cloud Computing',

    'Full-Stack Development',

    'Data Science & Analytics'

  ];



  filterCourses(): void {

    const allCourses = this.courseService.getEnrolledCourses();

  

    this.displayedCourses = allCourses

      .filter(course => 

        course.status === this.courseType || 

        course.status === 'completed' || 

        course.status === 'active'

      )

      .map(course => ({

        name: course.name,

        image: course.image || 'assets/default-course.png',

        progress: course.progress || 0,

        status: course.status,

        instructor: course.instructor || 'Unknown Instructor',

        enrolled: course.reviews || 0,

        views: Math.floor(Math.random() * 10000) + 1000,

        completed: Math.floor((course.reviews || 0) * 0.7),

        rating: course.rating || 0

      }));

  }



  downloadCertificate(course: any) {

    const certificateUrl = `images/certificates/${course.name}.pdf`;

    const link = document.createElement('a');

    link.href = certificateUrl;

    link.download = `${course.name}_Certificate.pdf`;

    link.click();

  }



  courses = [

    {

      image: 'images/cpp.jpg',

      title: 'C++ Programming Bootcamp - The Complete C++ Language Course',

      description: 'Raya Rajesh',

      rating: 4.5,

      reviews: '8,676',

      details: '44 total hours · 396 lectures · All Levels',

      isWishlisted: false,

      isPopular: true

    },

    {

      image: 'images/dscpp.jpg',

      title: 'Mastering Data Structures & Algorithms using C and C++',

      description: 'Chinvi',

      rating: 4.6,

      reviews: '52,767',

      details: '58.5 total hours · 390 lectures · All Levels',

      isWishlisted: false,

      isPopular: true

    },

    {

      image: 'images/masterc.jpg',

      title: 'Mastering C',

      description: 'U Shushma',

      rating: 4.3,

      reviews: '73',

      details: '37 total hours · 313 lectures · Beginner',

      isWishlisted: false,

      isPopular: true

    },

    {

      image: 'images/python.png',

      title: 'Learn Python Programming',

      description: 'B Revathi',

      rating: 4.7,

      reviews: '15,892',

      details: '30 total hours · 150 lectures · Beginner',

      isWishlisted: false,

      isPopular: true

    },

    {

      image: 'images/dspython.jpg',

      title: 'Data Science with Python',

      description: 'K Risitha',

      rating: 4.8,

      reviews: '22,342',

      details: '50 total hours · 200 lectures · Intermediate',

      isWishlisted: false,

      isPopular: false

    }

  ];



  toggleWishlist(course: any) {

    course.isWishlisted = !course.isWishlisted;

  }



  addToCart(course: any) {

    alert(`Added "${course.title}" to your cart!`);

  }

}