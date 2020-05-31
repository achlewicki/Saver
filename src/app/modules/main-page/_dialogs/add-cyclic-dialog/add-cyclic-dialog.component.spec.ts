import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCyclicDialogComponent } from './add-cyclic-dialog.component';

describe('AddOperationDialogComponent', () => {
  let component: AddCyclicDialogComponent;
  let fixture: ComponentFixture<AddCyclicDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCyclicDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCyclicDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
