import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstalmentsComponent } from './instalments.component';

describe('InstalmentsComponent', () => {
  let component: InstalmentsComponent;
  let fixture: ComponentFixture<InstalmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstalmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstalmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
