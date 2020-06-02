import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstalmentsListComponent } from './instalments-list.component';

describe('InstalmentsListComponent', () => {
  let component: InstalmentsListComponent;
  let fixture: ComponentFixture<InstalmentsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstalmentsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstalmentsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
