import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CourseService } from '../../services/course.service';
import { FaqsComponent } from "../../faqs/faqs.component";
import { SliderComponent } from "../../slider/slider.component";
import { ExploreSlmsComponent } from "../../explore-slms/explore-slms.component";
@Component({
  selector: 'app-course-list',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, FaqsComponent, SliderComponent, ExploreSlmsComponent],
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.css'
})
export class CourseListComponent {
  formData = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    organization: '',
    jobTitle: '',
    needs: '',
    country: '',
    termsAccepted: ''
  };

  submitForm() {
    console.log("Form submitted!", this.formData);
    alert("Your request has been submitted!");
  }

}