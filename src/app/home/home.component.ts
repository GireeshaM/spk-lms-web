import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HeadComponent } from "../head/head.component";
import { CarouselComponent } from "../carousel/carousel.component";
import { CourseListComponent } from "../courses/course-list/course-list.component";

@Component({
  selector: 'app-home',
  imports: [ CarouselComponent, CourseListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
 @ViewChild('carousel', { static: false }) carousel: ElementRef | undefined;

  ngAfterViewInit() {
    const carouselElement = this.carousel?.nativeElement;

    carouselElement.addEventListener('mouseenter', () => {
      carouselElement.style.animationPlayState = 'paused';
    });

    carouselElement.addEventListener('mouseleave', () => {
      carouselElement.style.animationPlayState = 'running';
    });
  }
}