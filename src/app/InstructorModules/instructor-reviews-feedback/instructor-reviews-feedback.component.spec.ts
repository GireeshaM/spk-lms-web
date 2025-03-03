import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorReviewsFeedbackComponent } from './instructor-reviews-feedback.component';

describe('InstructorReviewsFeedbackComponent', () => {
  let component: InstructorReviewsFeedbackComponent;
  let fixture: ComponentFixture<InstructorReviewsFeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstructorReviewsFeedbackComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstructorReviewsFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
