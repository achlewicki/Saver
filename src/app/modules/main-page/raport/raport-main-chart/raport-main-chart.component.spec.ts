import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaportMainChartComponent } from './raport-main-chart.component';

describe('RaportMainChartComponent', () => {
  let component: RaportMainChartComponent;
  let fixture: ComponentFixture<RaportMainChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaportMainChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaportMainChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
