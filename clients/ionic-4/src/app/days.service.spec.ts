import { TestBed } from '@angular/core/testing';

import { DaysService } from './days.service';

describe('DaysService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DaysService = TestBed.get(DaysService);
    expect(service).toBeTruthy();
  });
});
