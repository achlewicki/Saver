import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstLoginCoreComponent } from './first-login-core.component';

describe('FirstLoginCoreComponent', () => {
  let component: FirstLoginCoreComponent;
  let fixture: ComponentFixture<FirstLoginCoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirstLoginCoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstLoginCoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
