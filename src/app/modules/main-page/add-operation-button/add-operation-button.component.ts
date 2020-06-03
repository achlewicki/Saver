import { AddOperationDialogComponent } from '#dialogs/add-operation-dialog/add-operation-dialog.component';
import { Component } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { MatDialog, MatSnackBar } from '@angular/material';

@Component({
  selector: 'svr-add-operation-button',
  templateUrl: './add-operation-button.component.html',
  styleUrls: ['./add-operation-button.component.scss']
})
export class AddOperationButtonComponent {
  protected plusIcon = faPlus;

  constructor(
    private readonly dialogs: MatDialog,
    private readonly snackBar: MatSnackBar
  ) { }

  protected openAddOperationDialog(): void {
    const operationAddDialog = this.dialogs.open(AddOperationDialogComponent, {
      hasBackdrop: true,
      maxHeight: '850px',
      disableClose: true
    });

    operationAddDialog.afterClosed().subscribe(
      response => {
        if (response) {
          const snackBarRef = this.snackBar.open('Nowa operacja dodana', 'Dodaj kolejną operację', {
            duration: 5000
          });
          snackBarRef.onAction().subscribe(
            () => this.openAddOperationDialog()
          );
        }
      }
    );
  }
}
