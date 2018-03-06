import { TestBed, inject } from '@angular/core/testing';

import { ChartsCalculationsService } from './charts-calculations.service';

describe('ChartsCalculationsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChartsCalculationsService]
    });
  });

  it('should be created', inject([ChartsCalculationsService], (service: ChartsCalculationsService) => {
    expect(service).toBeTruthy();
  }));
});
