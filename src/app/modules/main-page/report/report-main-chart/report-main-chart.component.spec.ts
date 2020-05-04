import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportMainChartComponent } from './report-main-chart.component';

describe('RaportMainChartComponent', () => {
  let component: ReportMainChartComponent;
  let fixture: ComponentFixture<ReportMainChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportMainChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportMainChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
