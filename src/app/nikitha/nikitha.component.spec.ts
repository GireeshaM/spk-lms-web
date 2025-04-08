import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NikithaComponent } from './nikitha.component';

describe('NikithaComponent', () => {
  let component: NikithaComponent;
  let fixture: ComponentFixture<NikithaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NikithaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NikithaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
