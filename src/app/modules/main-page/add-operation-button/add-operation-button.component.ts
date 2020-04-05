import { AddOperationDialogComponent } from './../_dialogs/add-operation-dialog/add-operation-dialog.component';
import { Component } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'svr-add-operation-button',
  templateUrl: './add-operation-button.component.html',
  styleUrls: ['./add-operation-button.component.scss']
})
export class AddOperationButtonComponent {
  protected plusIcon = faPlus;

  constructor(private readonly dialogs: MatDialog) {

  }

  protected openAddOperationDialog(): void {
    this.dialogs.open(AddOperationDialogComponent, {
      hasBackdrop: true,
      maxHeight: '850px',
      disableClose: true
    });
  }
}
