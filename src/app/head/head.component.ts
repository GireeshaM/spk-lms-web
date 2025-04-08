import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CourseListComponent } from "../courses/course-list/course-list.component";
import { CoursespComponent } from "../courses/coursesp/coursesp.component";
import { CommonModule } from '@angular/common';
import { CarouselComponent } from "../carousel/carousel.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-head',
  imports: [CourseListComponent, CommonModule, ],
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.css']
})
export class HeadComponent implements AfterViewInit {
  @ViewChild('carousel', { static: false }) carousel: ElementRef | undefined;

  ngAfterViewInit() {
    const carouselElement = this.carousel?.nativeElement;

    carouselElement.addEventListener('mouseenter', () => {
      carouselElement.style.animationPlayState = 'paused';
    });

    carouselElement.addEventListener('mouseleave', () => {
      carouselElement.style.animationPlayState = 'running';
    });
    const videos = document.querySelectorAll('.carousel-item video');
    videos.forEach((video, index) => {
      video.addEventListener('ended', () => {
        if (this.carousel?.nativeElement) {
          const nextButton = this.carousel.nativeElement.querySelector('.carousel-control-next');
          const isLastVideo = index === videos.length - 1;

          if (isLastVideo) {
            // If it's the last video, go back to the first slide
            const firstButton = this.carousel.nativeElement.querySelector('.carousel-indicators button[data-bs-slide-to="0"]');
            if (firstButton) {
              firstButton.click();
            }
          } else if (nextButton) {
            // Otherwise, move to the next slide
            nextButton.click();
          }
        }
      });
    });

    // Play the first video on load
    const activeVideo = document.querySelector('.carousel-item.active video') as HTMLVideoElement;
    if (activeVideo) {
      activeVideo.play();
    }
  }
  dynamicText = {
    title: 'Advance Your Career with Software Courses',
    description: 'Enroll in top-rated software courses and enhance your skills for a bright future in tech!'
  };

  termsAccepted = false;
  selectedCourse: string | null = null;

  constructor(private router: Router) {}

  courses = [
    {
      image: 'https://img.freepik.com/free-vector/programming-concept-illustration_114360-1351.jpg',
      title: 'Full Stack Web Development',
      description: 'Learn to build complete web applications with front-end and back-end technologies.',
      link: '/courses/fullstack'
    },
    {
      image: 'https://img.freepik.com/free-vector/data-science-concept-illustration_114360-1196.jpg',
      title: 'Data Science & AI',
      description: 'Master data analysis, machine learning, and AI technologies for real-world applications.',
      link: '/courses/datascience'
    },
    {
      image: 'https://img.freepik.com/free-vector/cyber-security-illustration-concept_114360-797.jpg',
      title: 'Cyber Security & Ethical Hacking',
      description: 'Understand cybersecurity fundamentals and ethical hacking techniques.',
      link: '/courses/cybersecurity'
    },
    {
      image: 'https://img.freepik.com/free-vector/mobile-app-development-concept_23-2148681230.jpg',
      title: 'Mobile App Development',
      description: 'Develop Android and iOS applications using Flutter and React Native.',
      link: '/courses/mobileapp'
    }
  ];

  openTermsAndConditions(courseLink: string) {
    this.selectedCourse = courseLink;
    this.termsAccepted = false;
    document.getElementById("termsModal")!.style.display = "flex";
  }

  closeModal() {
    document.getElementById("termsModal")!.style.display = "none";
  }

  acceptTerms() {
    if (this.termsAccepted && this.selectedCourse) {
      this.router.navigate([this.selectedCourse]);
      this.closeModal();
    }
  }

  openLoginModal() {
    const loginModal = document.getElementById("loginModal");
    if (loginModal) {
      loginModal.style.display = "flex"; // Display the login modal
    }
  }

  closeLoginModal() {
    document.getElementById("loginModal")!.style.display = "none";
  }

  onLoginSubmit(event: Event) {
    event.preventDefault(); // Prevent the default form submission behavior
    console.log('Login form submitted');
    // Add your login logic here
  }

  onSlide(event: any) {
    const slideIndex = event.to;
    const videos = document.querySelectorAll('.carousel-item video');

    // Pause all videos
    videos.forEach((video) => (video as HTMLVideoElement).pause());

    // Play the video in the active slide
    const activeVideo = videos[slideIndex] as HTMLVideoElement;
    if (activeVideo) {
      activeVideo.play();
    }

    // Update dynamic text
    switch (slideIndex) {
      case 0:
        this.dynamicText = {
          title: 'Unlocking the Future of Learning with AI',
          description: 'AI-powered learning management systems (LMS) are transforming education by personalizing learning, providing real-time feedback, and automating tasks.'
        };
        
        break;
      case 1:
        this.dynamicText = {
          title: 'The Importance of Certification.',
          description: 'Certification enhances your skills, increases job opportunities, and boosts credibility. It can lead to higher earnings, greater job security.'
        };
        break;
      case 2:
        this.dynamicText = {
          title: 'Personalized learning with technology',
          description: 'Personalized learning with technology adapts education to each candidate needs and pace. AI and learning platforms help track progress and provide tailored content.'
        };
        break;
    }
  }



  onSearch(): void {
    console.log('Search button clicked');
    // Add your search logic here
  }
}