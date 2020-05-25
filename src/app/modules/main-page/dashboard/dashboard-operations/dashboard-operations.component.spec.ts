import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardOperationsComponent } from './dashboard-operations.component';

describe('DashboardOperationsComponent', () => {
  let component: DashboardOperationsComponent;
  let fixture: ComponentFixture<DashboardOperationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardOperationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardOperationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
