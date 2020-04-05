import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOperationDialogComponent } from './add-operation-dialog.component';

describe('AddOperationDialogComponent', () => {
  let component: AddOperationDialogComponent;
  let fixture: ComponentFixture<AddOperationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOperationDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOperationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
