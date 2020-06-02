import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInstalmentsComponent } from './add-instalments.component';

describe('AddInstalmentsComponent', () => {
  let component: AddInstalmentsComponent;
  let fixture: ComponentFixture<AddInstalmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddInstalmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddInstalmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
