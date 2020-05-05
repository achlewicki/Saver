import { TestBed } from '@angular/core/testing';

import { AccountHistoryService } from './account-history.service';

describe('AccountHistoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AccountHistoryService = TestBed.get(AccountHistoryService);
    expect(service).toBeTruthy();
  });
});
