import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportAccountBalanceChartComponent } from './report-account-balance-chart.component';

describe('RaportAccountBalanceChartComponent', () => {
  let component: ReportAccountBalanceChartComponent;
  let fixture: ComponentFixture<ReportAccountBalanceChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportAccountBalanceChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportAccountBalanceChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
