import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesModuleComponent } from './courses-module.component';

describe('CoursesModuleComponent', () => {
  let component: CoursesModuleComponent;
  let fixture: ComponentFixture<CoursesModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoursesModuleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoursesModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
