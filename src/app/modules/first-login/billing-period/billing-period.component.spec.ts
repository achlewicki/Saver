import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingPeriodComponent } from './billing-period.component';

describe('BillingPeriodComponent', () => {
  let component: BillingPeriodComponent;
  let fixture: ComponentFixture<BillingPeriodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillingPeriodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillingPeriodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
