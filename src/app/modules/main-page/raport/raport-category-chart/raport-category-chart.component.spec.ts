import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaportCategoryChartComponent } from './raport-category-chart.component';

describe('RaportCategoryChartComponent', () => {
  let component: RaportCategoryChartComponent;
  let fixture: ComponentFixture<RaportCategoryChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaportCategoryChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaportCategoryChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
