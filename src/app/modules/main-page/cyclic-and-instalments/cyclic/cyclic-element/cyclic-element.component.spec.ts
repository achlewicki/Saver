import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CyclicElementComponent } from './cyclic-element.component';

describe('CyclicElementComponent', () => {
  let component: CyclicElementComponent;
  let fixture: ComponentFixture<CyclicElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CyclicElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CyclicElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
