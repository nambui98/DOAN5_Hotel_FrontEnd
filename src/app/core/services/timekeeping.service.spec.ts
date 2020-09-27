import { TestBed } from '@angular/core/testing';

import { TimekeepingService } from './timekeeping.service';

describe('TimekeepingService', () => {
  let service: TimekeepingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimekeepingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
