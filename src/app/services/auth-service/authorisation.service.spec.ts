import { TestBed } from '@angular/core/testing';

import { AuthorisationService } from './authorisation.service';

describe('LoginService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthorisationService = TestBed.get(AuthorisationService);
    expect(service).toBeTruthy();
  });
});
