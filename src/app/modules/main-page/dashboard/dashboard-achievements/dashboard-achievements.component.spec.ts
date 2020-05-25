import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardAchievementsComponent } from './dashboard-achievements.component';

describe('DashboardAchievementsComponent', () => {
  let component: DashboardAchievementsComponent;
  let fixture: ComponentFixture<DashboardAchievementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardAchievementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardAchievementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
