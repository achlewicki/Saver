import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditEventDialogComponent } from './add-edit-event-dialog.component';

describe('AddEditEventDialogComponent', () => {
  let component: AddEditEventDialogComponent;
  let fixture: ComponentFixture<AddEditEventDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditEventDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditEventDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
