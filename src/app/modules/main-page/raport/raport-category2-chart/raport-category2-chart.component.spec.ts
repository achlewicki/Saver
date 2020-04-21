import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaportCategory2ChartComponent } from './raport-category2-chart.component';

describe('RaportCategory2ChartComponent', () => {
  let component: RaportCategory2ChartComponent;
  let fixture: ComponentFixture<RaportCategory2ChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaportCategory2ChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaportCategory2ChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
