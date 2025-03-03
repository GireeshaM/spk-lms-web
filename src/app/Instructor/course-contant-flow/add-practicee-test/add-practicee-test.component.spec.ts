import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPracticeeTestComponent } from './add-practicee-test.component';

describe('AddPracticeeTestComponent', () => {
  let component: AddPracticeeTestComponent;
  let fixture: ComponentFixture<AddPracticeeTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddPracticeeTestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPracticeeTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
