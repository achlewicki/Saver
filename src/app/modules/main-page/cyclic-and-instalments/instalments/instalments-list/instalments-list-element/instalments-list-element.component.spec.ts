import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstalmentsListElementComponent } from './instalments-list-element.component';

describe('InstalmentsListElementComponent', () => {
  let component: InstalmentsListElementComponent;
  let fixture: ComponentFixture<InstalmentsListElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstalmentsListElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstalmentsListElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
