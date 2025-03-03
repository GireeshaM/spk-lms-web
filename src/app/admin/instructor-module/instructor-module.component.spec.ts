import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorModuleComponent } from './instructor-module.component';

describe('InstructorModuleComponent', () => {
  let component: InstructorModuleComponent;
  let fixture: ComponentFixture<InstructorModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstructorModuleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstructorModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
