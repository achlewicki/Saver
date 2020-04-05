import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOperationButtonComponent } from './add-operation-button.component';

describe('AddOperationButtonComponent', () => {
  let component: AddOperationButtonComponent;
  let fixture: ComponentFixture<AddOperationButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOperationButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOperationButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
