import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavAccountItemComponent } from './nav-account-item.component';

describe('NavAccountItemComponent', () => {
  let component: NavAccountItemComponent;
  let fixture: ComponentFixture<NavAccountItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavAccountItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavAccountItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
