import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseDiaplayComponent } from './course-diaplay.component';

describe('CourseDiaplayComponent', () => {
  let component: CourseDiaplayComponent;
  let fixture: ComponentFixture<CourseDiaplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseDiaplayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseDiaplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
