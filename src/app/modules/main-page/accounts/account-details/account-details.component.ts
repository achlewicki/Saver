import { AppMessageDialogComponent, AppMessageDialogData } from '#dialogs/app-message-dialog/app-message-dialog.component';
import { AccountService } from '#services/account-service/account.service';
import { ProcessDialogComponent, ProcessDialogData } from '#dialogs/process-dialog/process-dialog.component';
import { MatDialog } from '@angular/material';
import { AccountModel } from '#models/account.model';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'svr-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss']
})
export class AccountDetailsComponent {

  @Input()
  protected account: AccountModel;

  @Input()
  private canDelete: boolean;

  constructor(
    private readonly dialogs: MatDialog,
    private readonly accService: AccountService
  ) { }

  protected deleteAccountProcess(account: AccountModel): void {

    if (!this.canDelete) {
      const messageDialogData = new AppMessageDialogData(
        'Nie możesz usunąć ostatniego konta',
        'Musisz posiadać co najmniej jedno aktywne konto'
      );
      this.dialogs.open(AppMessageDialogComponent, {
        data: messageDialogData
      });
      return;
    }

    const processDialogData: ProcessDialogData = {
      title: 'Czy na pewno chcesz usunąć konto?',
      initializeMessage: 'Wraz z kontem usunięte zostaną wszystkie powiązane z nim dane takie jak transakcje czy raporty!',
      successMessage: 'Konto zostało usunięte',
      failureMessage: 'Wystąpił błąd podczas usuwania konta',
      process: this.accService.deleteAccount(account.id)
    };
    const processDialog = this.dialogs.open(ProcessDialogComponent, {
      data: processDialogData
    });
    processDialog.afterClosed().subscribe(
      result => {
        if (result) {
          alert('Konto zostanie usunięte');
        } else {
          alert('Konto NIE zostanie usunięte');
        }
      }
    );

  }

}
