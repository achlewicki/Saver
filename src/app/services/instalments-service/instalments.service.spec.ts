import { TestBed } from '@angular/core/testing';

import { InstalmentsService } from './instalments.service';

describe('InstalmentsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InstalmentsService = TestBed.get(InstalmentsService);
    expect(service).toBeTruthy();
  });
});
