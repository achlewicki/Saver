import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { faExclamationTriangle, faQuestionCircle, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'svr-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent {

  protected icon: IconDefinition;

  constructor(
    private readonly dialogRef: MatDialogRef<ConfirmDialogComponent, boolean>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData
  ) {
    switch (data.type) {
      case 'warning': this.icon = faExclamationTriangle; break;
      case 'question': this.icon = faQuestionCircle; break;
      default: this.icon = faExclamationTriangle; break;
    }
  }

  closeDialog(confirmed: boolean): void {
    this.dialogRef.close(confirmed);
  }
}

export class ConfirmDialogData {

  constructor(
    public message: string,
    public type: 'warning' | 'question' = 'warning',
    public buttonsText?: {
      cancelText: string,
      submitText: string
    }
  ) {
    if (!buttonsText) {
      this.buttonsText = {
        cancelText: 'Anuluj',
        submitText: 'Tak'
      };
    }
  }
}
