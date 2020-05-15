import { Observable } from 'rxjs';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {
  faQuestionCircle,
  faCheck,
  faTimes
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'svr-process-dialog',
  templateUrl: './process-dialog.component.html',
  styleUrls: ['./process-dialog.component.scss']
})
export class ProcessDialogComponent {

  protected questionIcon = faQuestionCircle;
  protected successIcon = faCheck;
  protected failureIcon = faTimes;

  protected state: ProcessDialogState = ProcessDialogState.INITIALIZATION;
  protected processResult: any | null;

  constructor(
    private readonly dialogRef: MatDialogRef<ProcessDialogComponent, any | null>,
    @Inject(MAT_DIALOG_DATA) public data: ProcessDialogData
  ) {
    this.processResult = null;
  }

  closeDialog(forceResult?: boolean): void {
    const dialogResult = forceResult || this.processResult ? this.processResult || forceResult : false;
    this.dialogRef.close(dialogResult);
  }

  protected async startProcess(): Promise<void> {
    this.state = ProcessDialogState.PROCESSING;
    try {
      this.processResult = await this.data.process.toPromise();
      this.state = ProcessDialogState.SUCCESS;
    } catch (error) {
      console.error(error);
      this.state = ProcessDialogState.FAILURE;
    }
  }
}

export interface ProcessDialogData {
  title: string;
  initializeMessage: string;
  successMessage: string;
  failureMessage: string;
  process: Observable<any>;
}

enum ProcessDialogState {
  INITIALIZATION = 'initialization',
  PROCESSING = 'processing',
  FAILURE = 'failure',
  SUCCESS = 'success'
}
