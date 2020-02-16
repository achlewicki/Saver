import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingPageCoreComponent } from './landing-page-core.component';

describe('LandingPageCoreComponent', () => {
  let component: LandingPageCoreComponent;
  let fixture: ComponentFixture<LandingPageCoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandingPageCoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingPageCoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
