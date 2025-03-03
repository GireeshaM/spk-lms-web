import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessTeachingResourcesComponent } from './access-teaching-resources.component';

describe('AccessTeachingResourcesComponent', () => {
  let component: AccessTeachingResourcesComponent;
  let fixture: ComponentFixture<AccessTeachingResourcesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccessTeachingResourcesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccessTeachingResourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
