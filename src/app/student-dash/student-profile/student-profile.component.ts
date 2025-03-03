import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-student-profile',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css']
})
export class StudentProfileComponent implements OnInit {
  activeTab: string = 'basic';
  basicForm!: FormGroup;
  professionalForm!: FormGroup;
  academicForm!: FormGroup;
  contactForm!: FormGroup;
  learningForm!: FormGroup;
  profileCompletion = 55;
  profileName: string = 'Yahen Y';
  profilePicture: string = 'https://i.pravatar.cc/150?img=3';
 
  countryCodes = [
    { country: 'India', code: '+91' },
    { country: 'United States', code: '+1' },
    { country: 'United Kingdom', code: '+44' },
    { country: 'Canada', code: '+1' },
    { country: 'Australia', code: '+61' },
    { country: 'Germany', code: '+49' },
    { country: 'France', code: '+33' },
    { country: 'United Arab Emirates', code: '+971' }
  ];

  constructor(private fb: FormBuilder) {
    this.basicForm = this.fb.group({
      title: ['', Validators.required],
      firstName: ['', Validators.required],
      middleName: [''],
      lastName: ['', Validators.required],
      gender: ['', Validators.required],
      dob: ['', Validators.required],
      linkedIn: ['']
    });

    this.professionalForm = this.fb.group({
      experience: ['', Validators.required],
      workExperiences: this.fb.array([])
    });

    this.academicForm = this.fb.group({
      educationLevel: ['', Validators.required],
      academicExperiences: this.fb.array([])
    });

    this.contactForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      countryCode: ['+91', Validators.required],
      contactNumber: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      state: ['', Validators.required]
    });

    this.learningForm = this.fb.group({
      learningOutcome: ['', Validators.required]
    });

    this.academicForm = this.fb.group({
      educationLevel: ['', Validators.required],
      academicExperiences: this.fb.array([]),
    });
   
  }

  ngOnInit() {
    this.loadStoredData();

    // Auto-update profile name in the sidebar
    this.basicForm.valueChanges.subscribe(() => {
      this.updateProfileName();
      this.saveToLocalStorage('basicFormData', this.basicForm.value);
    });

    // Auto-save form changes
    this.professionalForm.valueChanges.subscribe(() =>
      this.saveToLocalStorage('professionalFormData', this.professionalForm.value)
    );

    this.academicForm.valueChanges.subscribe(() =>
      this.saveToLocalStorage('academicFormData', this.academicForm.value)
    );

    this.contactForm.valueChanges.subscribe(() =>
      this.saveToLocalStorage('contactFormData', this.contactForm.value)
    );

    this.learningForm.valueChanges.subscribe(() =>
      this.saveToLocalStorage('learningFormData', this.learningForm.value)
    );
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  saveChanges() {
    let currentForm: FormGroup;
    switch (this.activeTab) {
      case 'basic': currentForm = this.basicForm; break;
      case 'contact': currentForm = this.contactForm; break;
      case 'professional': currentForm = this.professionalForm; break;
      case 'academics': currentForm = this.academicForm; break;
      case 'learning': currentForm = this.learningForm; break;
      default: return;
    }

    if (currentForm.invalid) {
      currentForm.markAllAsTouched();
      alert('Please fill in all required fields before saving.');
      return;
    }

    console.log(`${this.activeTab} Details Submitted:`, currentForm.value);
    alert('Changes saved successfully!');
  }

  updateProfileName() {
    const firstName = this.basicForm.get('firstName')?.value || '';
    const lastName = this.basicForm.get('lastName')?.value || '';
    this.profileName = `${firstName} ${lastName}`.trim();
  }

  discardChanges() {
    switch (this.activeTab) {
      case 'basic':
        this.basicForm.reset();
        localStorage.removeItem('basicFormData');
        break;
      case 'contact':
        this.contactForm.reset();
        localStorage.removeItem('contactFormData');
        break;
      case 'professional':
        this.professionalForm.reset();
        localStorage.removeItem('professionalFormData');
        break;
      case 'academics':
        this.academicForm.reset();
        localStorage.removeItem('academicFormData');
        break;
      case 'learning':
        this.learningForm.reset();
        localStorage.removeItem('learningFormData');
        break;
    }
    alert('Changes discarded!');
  }

  onProfilePicChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.profilePicture = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  removePhoto() {
    this.profilePicture = 'https://i.pravatar.cc/150?img=3';
  }

  saveToLocalStorage(key: string, data: any) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  loadStoredData() {
    this.patchFormFromLocalStorage('basicFormData', this.basicForm);
    this.patchFormFromLocalStorage('professionalFormData', this.professionalForm);
    this.patchFormFromLocalStorage('academicFormData', this.academicForm);
    this.patchFormFromLocalStorage('contactFormData', this.contactForm);
    this.patchFormFromLocalStorage('learningFormData', this.learningForm);
  }

  patchFormFromLocalStorage(key: string, form: FormGroup) {
    const storedData = localStorage.getItem(key);
    if (storedData) {
      form.patchValue(JSON.parse(storedData));
    }
  }

  get workExperiences(): FormArray {
    return this.professionalForm.get('workExperiences') as FormArray;
  }

  addWorkExperience() {
    this.workExperiences.push(this.fb.group({
      companyName: ['', Validators.required],
      position: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['']
    }));
  }

  removeWorkExperience(index: number) {
    this.workExperiences.removeAt(index);
  }

  get academicExperiences(): FormArray {
    return this.academicForm.get('academicExperiences') as FormArray;
  }

  addAcademicExperience() {
    this.academicExperiences.push(this.fb.group({
      institution: ['', Validators.required],
      degree: ['', Validators.required],
      year: ['', Validators.required]
    }));
  }

  removeAcademicExperience(index: number) {
    this.academicExperiences.removeAt(index);
  }
  saveLearningOutcome() {
    if (this.learningForm.valid) {
      console.log('Learning Outcome Form Data:', this.learningForm.value);
    } else {
      alert('Please fill in the required fields.');
    }
  }

  saveAcademics() {
    if (this.academicForm.valid) {
      console.log('Academics Form Data:', this.academicForm.value);
    } else {
      alert('Please fill in the required fields.');
    }
  }
}
