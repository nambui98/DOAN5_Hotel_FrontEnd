import { TestBed } from '@angular/core/testing';

import { RoomManageService } from './room-manage.service';

describe('RoomManageService', () => {
  let service: RoomManageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoomManageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
