import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AchievementsLevelComponent } from './achievements-level.component';

describe('AchievementsLevelComponent', () => {
  let component: AchievementsLevelComponent;
  let fixture: ComponentFixture<AchievementsLevelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AchievementsLevelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AchievementsLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
