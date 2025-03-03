import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseReviewsFeedbackComponent } from './course-reviews-feedback.component';

describe('CourseReviewsFeedbackComponent', () => {
  let component: CourseReviewsFeedbackComponent;
  let fixture: ComponentFixture<CourseReviewsFeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseReviewsFeedbackComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseReviewsFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
