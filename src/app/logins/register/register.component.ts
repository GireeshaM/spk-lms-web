import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  step: number = 1;
  errorFlag: boolean = false;
  selectedInterests: string[] = [];
  selectedSkills: string[] = [];
  showDialog: boolean = true; // ✅ Added for controlling dialog visibility

  areasOfInterest = [
    { name: 'Web Development', skills: ['HTML', 'CSS', 'JavaScript', 'Angular', 'React'] },
    { name: 'Data Science', skills: ['Python', 'Pandas', 'Machine Learning', 'SQL'] },
    { name: 'Artificial Intelligence', skills: ['Deep Learning', 'TensorFlow', 'Python'] },
    { name: 'Cybersecurity', skills: ['Network Security', 'Ethical Hacking', 'Cryptography'] }
  ];

  filteredSkills: string[] = []; // ✅ Fixed: Initialize filteredSkills

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      areaOfInterest: [[]], // ✅ Updated to be an empty array
      selectedSkills: [[]]
    });
  }

  nextStep() {
    this.errorFlag = false;

    if (this.step === 1) {
      if (this.registerForm.invalid) {
        this.errorFlag = true;
        Swal.fire('Error', 'Please fill all required fields correctly.', 'error');
        return;
      }
    } else if (this.step === 2) {
      if (this.selectedInterests.length === 0) {
        this.errorFlag = true;
        Swal.fire('Error', 'Please select at least one area of interest.', 'error');
        return;
      }
      this.updateFilteredSkills();
    } else if (this.step === 3) {
      if (this.selectedSkills.length === 0) {
        this.errorFlag = true;
        Swal.fire('Error', 'Please select at least one skill.', 'error');
        return;
      }
    }

    this.step++;
  }

  prevStep() {
    if (this.step > 1) this.step--;
  }

  closeDialog() {
    this.showDialog = false; // ✅ Close dialog when 'X' is clicked
  }

  toggleInterest(area: string) {
    if (this.selectedInterests.includes(area)) {
      this.selectedInterests = this.selectedInterests.filter(a => a !== area);
    } else {
      this.selectedInterests.push(area);
    }
    this.updateFilteredSkills();
  }

  toggleSkill(skill: string) {
    if (this.selectedSkills.includes(skill)) {
      this.selectedSkills = this.selectedSkills.filter(s => s !== skill);
    } else {
      this.selectedSkills.push(skill);
    }
  }

  updateFilteredSkills() {
    this.filteredSkills = this.areasOfInterest
      .filter(area => this.selectedInterests.includes(area.name))
      .flatMap(area => area.skills);
  }

  isSelectedInterest(area: string) {
    return this.selectedInterests.includes(area);
  }

  isSelectedSkill(skill: string) {
    return this.selectedSkills.includes(skill);
  }

  register() {
    if (this.registerForm.valid) {
      this.registerForm.patchValue({
        areaOfInterest: this.selectedInterests,
        selectedSkills: this.selectedSkills
      });

      console.log('Registration Successful:', this.registerForm.value);
      Swal.fire('Success', 'Registration completed successfully!', 'success');
      this.closeDialog(); // ✅ Close dialog on successful registration
    } else {
      Swal.fire('Error', 'Please complete all steps before submitting.', 'error');
    }
  }
}
