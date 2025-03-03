import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendCourseForReviewComponent } from './send-course-for-review.component';

describe('SendCourseForReviewComponent', () => {
  let component: SendCourseForReviewComponent;
  let fixture: ComponentFixture<SendCourseForReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SendCourseForReviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SendCourseForReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
