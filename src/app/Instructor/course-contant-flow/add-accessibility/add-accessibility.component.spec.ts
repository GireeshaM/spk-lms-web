import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAccessibilityComponent } from './add-accessibility.component';

describe('AddAccessibilityComponent', () => {
  let component: AddAccessibilityComponent;
  let fixture: ComponentFixture<AddAccessibilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddAccessibilityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAccessibilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
