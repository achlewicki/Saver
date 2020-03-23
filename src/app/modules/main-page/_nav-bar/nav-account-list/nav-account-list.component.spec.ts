import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavAccountListComponent } from './nav-account-list.component';

describe('NavAccountListComponent', () => {
  let component: NavAccountListComponent;
  let fixture: ComponentFixture<NavAccountListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavAccountListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavAccountListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
