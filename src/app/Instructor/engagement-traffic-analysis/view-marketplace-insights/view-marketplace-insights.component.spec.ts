import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMarketplaceInsightsComponent } from './view-marketplace-insights.component';

describe('ViewMarketplaceInsightsComponent', () => {
  let component: ViewMarketplaceInsightsComponent;
  let fixture: ComponentFixture<ViewMarketplaceInsightsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewMarketplaceInsightsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewMarketplaceInsightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
