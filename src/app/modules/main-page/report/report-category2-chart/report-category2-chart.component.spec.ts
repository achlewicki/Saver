import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportCategory2ChartComponent } from './report-category2-chart.component';

describe('RaportCategory2ChartComponent', () => {
  let component: ReportCategory2ChartComponent;
  let fixture: ComponentFixture<ReportCategory2ChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportCategory2ChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportCategory2ChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
