import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { faCheckCircle, faTimesCircle, faInfoCircle, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'svr-app-message-dialog',
  templateUrl: './app-message-dialog.component.html',
  styleUrls: ['./app-message-dialog.component.scss']
})
export class AppMessageDialogComponent {

  protected icon: IconDefinition;

  constructor(
    private readonly dialogRef: MatDialogRef<AppMessageDialogComponent, void>,
    @Inject(MAT_DIALOG_DATA) public data: AppMessageDialogData
  ) {
    switch (data.type) {
      case 'success': this.icon = faCheckCircle; break;
      case 'failure': this.icon = faTimesCircle; break;
      default: this.icon = faInfoCircle; break;
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}

export class AppMessageDialogData {

  public message: string;

  constructor(
    public type: 'success' | 'failure' | 'info',
    message?: string,
    public tip?: string,
  ) {
    if (!message) {
      switch (type) {
        case 'success':
          this.message = 'Operacja wykonana pomyślnie';
          break;
        case 'failure':
          this.message = 'Coś poszło nie tak';
          break;
        default:
          this.message = 'Informacja dla użytkownika';
          break;
      }
    } else {
      this.message = message;
    }
  }
}
