import { TestBed } from '@angular/core/testing';

import { StahnitymprogramService } from './stahnitymprogram.service';

describe('StahnitymprogramService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StahnitymprogramService = TestBed.get(StahnitymprogramService);
    expect(service).toBeTruthy();
  });
});
