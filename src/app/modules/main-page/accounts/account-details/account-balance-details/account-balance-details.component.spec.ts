import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountBalanceDetailsComponent } from './account-balance-details.component';

describe('AccountBalanceDetailsComponent', () => {
  let component: AccountBalanceDetailsComponent;
  let fixture: ComponentFixture<AccountBalanceDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountBalanceDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountBalanceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
