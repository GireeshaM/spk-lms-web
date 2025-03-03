import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CouresefoundComponent } from './couresefound.component';

describe('CouresefoundComponent', () => {
  let component: CouresefoundComponent;
  let fixture: ComponentFixture<CouresefoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CouresefoundComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CouresefoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
