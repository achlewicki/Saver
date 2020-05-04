import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportCategoryChartComponent } from './report-category-chart.component';

describe('RaportCategoryChartComponent', () => {
  let component: ReportCategoryChartComponent;
  let fixture: ComponentFixture<ReportCategoryChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportCategoryChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportCategoryChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
