import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentReviewsFeedbackComponent } from './student-reviews-feedback.component';

describe('StudentReviewsFeedbackComponent', () => {
  let component: StudentReviewsFeedbackComponent;
  let fixture: ComponentFixture<StudentReviewsFeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentReviewsFeedbackComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentReviewsFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
