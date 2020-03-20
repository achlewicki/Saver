import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AchievementsLastComponent } from './achievements-last.component';

describe('AchievementsLastComponent', () => {
  let component: AchievementsLastComponent;
  let fixture: ComponentFixture<AchievementsLastComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AchievementsLastComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AchievementsLastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
