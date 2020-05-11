import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'svr-add-edit-event-dialog',
  templateUrl: './add-edit-event-dialog.component.html',
  styleUrls: ['./add-edit-event-dialog.component.scss']
})
export class AddEditEventDialogComponent {

  constructor(
    private readonly dialogRef: MatDialogRef<AddEditEventDialogComponent, void>
  ) { }
}

enum DialogMode {
  EDIT = 'edit',
  ADD = 'add'
}
