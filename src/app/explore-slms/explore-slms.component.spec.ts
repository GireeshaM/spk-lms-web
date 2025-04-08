import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExploreSlmsComponent } from './explore-slms.component';

describe('ExploreSlmsComponent', () => {
  let component: ExploreSlmsComponent;
  let fixture: ComponentFixture<ExploreSlmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExploreSlmsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExploreSlmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
