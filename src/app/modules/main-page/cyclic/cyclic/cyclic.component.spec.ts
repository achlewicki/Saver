import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CyclicComponent } from './cyclic.component';

describe('CyclicComponent', () => {
  let component: CyclicComponent;
  let fixture: ComponentFixture<CyclicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CyclicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CyclicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
