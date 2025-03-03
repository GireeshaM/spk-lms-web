import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CourseListComponent } from "../courses/course-list/course-list.component";
import { CoursespComponent } from "../courses/coursesp/coursesp.component";
import { CommonModule } from '@angular/common';
import { CarouselComponent } from "../carousel/carousel.component";

@Component({
  selector: 'app-head',
  imports: [CourseListComponent, CommonModule, CarouselComponent],
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
  }
}