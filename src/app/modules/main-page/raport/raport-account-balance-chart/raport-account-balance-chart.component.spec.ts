import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaportAccountBalanceChartComponent } from './raport-account-balance-chart.component';

describe('RaportAccountBalanceChartComponent', () => {
  let component: RaportAccountBalanceChartComponent;
  let fixture: ComponentFixture<RaportAccountBalanceChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaportAccountBalanceChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaportAccountBalanceChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
