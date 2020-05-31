import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstalmentsListDetailsComponent } from './instalments-list-details.component';

describe('InstalmentsListDetailsComponent', () => {
  let component: InstalmentsListDetailsComponent;
  let fixture: ComponentFixture<InstalmentsListDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstalmentsListDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstalmentsListDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
