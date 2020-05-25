import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardCyclicComponent } from './dashboard-cyclic.component';

describe('DashboardCyclicComponent', () => {
  let component: DashboardCyclicComponent;
  let fixture: ComponentFixture<DashboardCyclicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardCyclicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardCyclicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
