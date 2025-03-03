import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseMessageComponent } from './course-message.component';

describe('CourseMessageComponent', () => {
  let component: CourseMessageComponent;
  let fixture: ComponentFixture<CourseMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseMessageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
