import { TestBed } from '@angular/core/testing';

import { CyclicService } from './cyclic.service';

describe('CyclicService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CyclicService = TestBed.get(CyclicService);
    expect(service).toBeTruthy();
  });
});
