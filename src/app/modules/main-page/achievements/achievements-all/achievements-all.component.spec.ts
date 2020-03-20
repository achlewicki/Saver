import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AchievementsAllComponent } from './achievements-all.component';

describe('AchievementsComponent', () => {
  let component: AchievementsAllComponent;
  let fixture: ComponentFixture<AchievementsAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AchievementsAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AchievementsAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
