import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCourseContantComponent } from './create-course-contant.component';

describe('CreateCourseContantComponent', () => {
  let component: CreateCourseContantComponent;
  let fixture: ComponentFixture<CreateCourseContantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateCourseContantComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateCourseContantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
