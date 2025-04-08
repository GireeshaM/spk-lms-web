import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RajComponent } from './raj.component';

describe('RajComponent', () => {
  let component: RajComponent;
  let fixture: ComponentFixture<RajComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RajComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RajComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
