import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InstructorNavbarComponent } from "../../instructor-navbar/instructor-navbar.component";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-course',
  imports: [CommonModule, FormsModule, InstructorNavbarComponent,ReactiveFormsModule],
  templateUrl: './create-course.component.html',
  styleUrl: './create-course.component.css'
})
export class CreateCourseComponent {
  courseForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.courseForm = this.fb.group({
      courseName: ['', Validators.required],
      domainName: ['', Validators.required],
      whatYouLearn: ['', Validators.required],
      preRequirements: this.fb.array([]),
      description: ['', Validators.required],
      demoVideo: [null, Validators.required],
      duration: ['', [Validators.required, Validators.min(1)]],
      courseThumbnail: [null, Validators.required]
    });

    // Add one pre-requirement field by default
    this.addPreRequirement();
  }

  // Getter for preRequirements FormArray
  get preRequirements(): FormArray {
    return this.courseForm.get('preRequirements') as FormArray;
  }

  addPreRequirement(): void {
    this.preRequirements.push(this.fb.control('', Validators.required));
  }

  removePreRequirement(index: number): void {
    this.preRequirements.removeAt(index);
  }

  // Handle file input change for course thumbnail
  onThumbnailChange(event: any): void {
    const file = event.target.files && event.target.files.length ? event.target.files[0] : null;
    this.courseForm.patchValue({ courseThumbnail: file });
  }

  // Handle file input change for demo video (only accept mp4)
  onDemoVideoChange(event: any): void {
    const file = event.target.files && event.target.files.length ? event.target.files[0] : null;
    if (file && file.type === 'video/mp4') {
      this.courseForm.patchValue({ demoVideo: file });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Invalid File',
        text: 'Please upload a valid MP4 video file.'
      });
      event.target.value = '';
      this.courseForm.patchValue({ demoVideo: null });
    }
  }

  // On form submission, validate and show SweetAlert2
  onSubmit(): void {
    if (this.courseForm.valid) {
      console.log('Course Data:', this.courseForm.value);
      Swal.fire({
        icon: 'success',
        title: 'Submitted Successfully',
        text: 'Start your journey from now!',
        confirmButtonText: 'OK'
      }).then(() => {
        this.courseForm.reset();
        // Clear preRequirements and add one default field
        while (this.preRequirements.length !== 0) {
          this.preRequirements.removeAt(0);
        }
        this.addPreRequirement();
      });
    } else {
      this.courseForm.markAllAsTouched();
      Swal.fire({
        icon: 'error',
        title: 'Incomplete Form',
        text: 'Please fill in all required fields!'
      });
    }
  }
}