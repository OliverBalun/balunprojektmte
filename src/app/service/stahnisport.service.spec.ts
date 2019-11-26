import { TestBed } from '@angular/core/testing';

import { StahnisportService } from './stahnisport.service';

describe('StahnisportService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StahnisportService = TestBed.get(StahnisportService);
    expect(service).toBeTruthy();
  });
});
