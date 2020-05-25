import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardBalanceComponent } from './dashboard-balance.component';

describe('DashboardBalanceComponent', () => {
  let component: DashboardBalanceComponent;
  let fixture: ComponentFixture<DashboardBalanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardBalanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
