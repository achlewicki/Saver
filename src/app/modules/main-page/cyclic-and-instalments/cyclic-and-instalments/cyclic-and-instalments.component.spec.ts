import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CyclicAndInstalmentsComponent } from './cyclic-and-instalments.component';

describe('CyclicAndInstalmentsComponent', () => {
  let component: CyclicAndInstalmentsComponent;
  let fixture: ComponentFixture<CyclicAndInstalmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CyclicAndInstalmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CyclicAndInstalmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
