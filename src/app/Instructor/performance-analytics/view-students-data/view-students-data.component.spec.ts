import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewStudentsDataComponent } from './view-students-data.component';

describe('ViewStudentsDataComponent', () => {
  let component: ViewStudentsDataComponent;
  let fixture: ComponentFixture<ViewStudentsDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewStudentsDataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewStudentsDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
