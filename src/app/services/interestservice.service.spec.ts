import { TestBed } from '@angular/core/testing';

import { InterestserviceService } from './interestservice.service';

describe('InterestserviceService', () => {
  let service: InterestserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InterestserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
