import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountsModuleComponent } from './discounts-module.component';

describe('DiscountsModuleComponent', () => {
  let component: DiscountsModuleComponent;
  let fixture: ComponentFixture<DiscountsModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiscountsModuleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiscountsModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
