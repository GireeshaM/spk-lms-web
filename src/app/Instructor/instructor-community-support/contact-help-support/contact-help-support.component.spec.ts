import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactHelpSupportComponent } from './contact-help-support.component';

describe('ContactHelpSupportComponent', () => {
  let component: ContactHelpSupportComponent;
  let fixture: ComponentFixture<ContactHelpSupportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactHelpSupportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactHelpSupportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
