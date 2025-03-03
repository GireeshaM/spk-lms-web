import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursespComponent } from './coursesp.component';

describe('CoursespComponent', () => {
  let component: CoursespComponent;
  let fixture: ComponentFixture<CoursespComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoursespComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoursespComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
