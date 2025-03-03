import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOverviewComponent } from './view-overview.component';

describe('ViewOverviewComponent', () => {
  let component: ViewOverviewComponent;
  let fixture: ComponentFixture<ViewOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewOverviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
