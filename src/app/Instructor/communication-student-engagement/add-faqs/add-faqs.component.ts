import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { InstructorNavbarComponent } from "../../instructor-navbar/instructor-navbar.component";

@Component({
  selector: 'app-add-faqs',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InstructorNavbarComponent],
  templateUrl: './add-faqs.component.html',
  styleUrl: './add-faqs.component.css'
})
export class AddFaqsComponent {

  faqForm: FormGroup;
  courses = ['Angular', 'React', 'Vue', 'Node.js'];

  constructor(private fb: FormBuilder) {
    this.faqForm = this.fb.group({
      course: ['', Validators.required],
      faqs: this.fb.array([])
    });
  }

  get faqs(): FormArray {
    return this.faqForm.get('faqs') as FormArray;
  }

  addFaq() {
    this.faqs.push(
      this.fb.group({
        question: ['', Validators.required],
        answer: ['', Validators.required]
      })
    );
  }

  removeFaq(index: number) {
    this.faqs.removeAt(index);
  }

  submit() {
    if (this.faqForm.valid) {
      console.log('Submitted FAQs:', this.faqForm.value);
      
      // Show SweetAlert success message
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'FAQs submitted successfully!',
        showConfirmButton: false,
        timer: 2000, // Auto-close after 2 seconds
        customClass: {
          popup: 'swal-wide'
        }
      });

      // Reset form after submission
      this.faqForm.reset();
      this.faqs.clear();
    }
  }
}