import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeStudentInterestComponent } from './see-student-interest.component';

describe('SeeStudentInterestComponent', () => {
  let component: SeeStudentInterestComponent;
  let fixture: ComponentFixture<SeeStudentInterestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeeStudentInterestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeeStudentInterestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
