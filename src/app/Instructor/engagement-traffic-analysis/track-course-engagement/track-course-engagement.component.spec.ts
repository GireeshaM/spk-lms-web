import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackCourseEngagementComponent } from './track-course-engagement.component';

describe('TrackCourseEngagementComponent', () => {
  let component: TrackCourseEngagementComponent;
  let fixture: ComponentFixture<TrackCourseEngagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrackCourseEngagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrackCourseEngagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
