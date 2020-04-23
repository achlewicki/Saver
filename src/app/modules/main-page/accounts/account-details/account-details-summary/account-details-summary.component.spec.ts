import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountDetailsSummaryComponent } from './account-details-summary.component';

describe('AccountDetailsSummaryComponent', () => {
  let component: AccountDetailsSummaryComponent;
  let fixture: ComponentFixture<AccountDetailsSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountDetailsSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountDetailsSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
