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
      case AppMessageDialogType.SUCCESS: this.icon = faCheckCircle; break;
      case AppMessageDialogType.FAILURE: this.icon = faTimesCircle; break;
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
    message?: string,
    public tip?: string,
    public type = AppMessageDialogType.INFO
  ) {
    if (!message) {
      switch (type) {
        case AppMessageDialogType.SUCCESS:
          this.message = 'Operacja wykonana pomyślnie';
          break;
        case AppMessageDialogType.FAILURE:
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

export enum AppMessageDialogType {
  SUCCESS = 'success',
  FAILURE = 'failure',
  INFO = 'info'
}
