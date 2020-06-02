import { AccountAndAccountHistoryModel } from '#models/account-and-account-history.model';
import { AccountHistoryService } from '#services/account-history-service/account-history.service';
import { AccountHistoryModel } from '#models/account-history.model';
import { AppMessageDialogComponent, AppMessageDialogData } from '#dialogs/app-message-dialog/app-message-dialog.component';
import { AccountService } from '#services/account-service/account.service';
import { ProcessDialogComponent, ProcessDialogData } from '#dialogs/process-dialog/process-dialog.component';
import { MatDialog } from '@angular/material';
import { AccountModel } from '#models/account.model';
import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { AddAccountDialogComponent, AddAccountDialogType } from '#dialogs/add-account-dialog/add-account-dialog.component';
import { MainPageService } from '#services/main-page-service/main-page.service';


@Component({
  selector: 'svr-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss']
})
export class AccountDetailsComponent implements OnChanges {

  @Input()
  public account: AccountModel;

  @Input()
  public canDelete: boolean;

  @Output()
  public accountDeleted = new EventEmitter<AccountModel>();

  protected accountHistoryData: AccountHistoryModel[];
  protected accountHistoryDataWithAccount: AccountAndAccountHistoryModel[];

  constructor(
    private readonly dialogs: MatDialog,
    private readonly accountService: AccountService,
    private readonly accountHistoryService: AccountHistoryService,
    private readonly mainPageService: MainPageService
  ) { }

  ngOnChanges(): void {
    this.accountHistoryData = null;
    this.accountHistoryDataWithAccount = null;
    const today = new Date();
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 6);
    this.accountHistoryService.getInfo(this.account.id, weekAgo, today).subscribe(
      data => {
        this.accountHistoryData = data;
        this.accountHistoryDataWithAccount = [
          {
            account: this.account,
            accountHistory: this.accountHistoryData
          }
        ];
      }
    );
  }

  protected deleteAccountProcess(account: AccountModel): void {

    if (!this.canDelete) {
      const messageDialogData = new AppMessageDialogData(
        'info',
        'Nie możesz usunąć ostatniego konta',
        'Musisz posiadać co najmniej jedno aktywne konto'
      );
      this.dialogs.open<AppMessageDialogComponent, AppMessageDialogData, void>(AppMessageDialogComponent, {
        data: messageDialogData
      });
      return;
    }
    const processDialogData: ProcessDialogData = {
      title: 'Czy na pewno chcesz usunąć konto?',
      initializeMessage: 'Wraz z kontem usunięte zostaną wszystkie powiązane z nim dane takie jak transakcje czy raporty!',
      successMessage: 'Konto zostało usunięte',
      failureMessage: 'Wystąpił błąd podczas usuwania konta',
      process: this.accountService.deleteAccount(account.id)
    };
    const processDialog = this.dialogs.open<ProcessDialogComponent, ProcessDialogData, any | null>(ProcessDialogComponent, {
      data: processDialogData
    });
    processDialog.afterClosed().subscribe(
      result => {
        if (result) {
          this.accountDeleted.emit(this.account);
          this.mainPageService.accountDeleted.next(this.account);
        }
      }
    );
  }

  protected editAccount(): void {
    const editDialog = this.dialogs.open<AddAccountDialogComponent, AddAccountDialogType, boolean>(
      AddAccountDialogComponent,
      {
        data: {
          type: 'edit',
          account: this.account
        }
      }
    );
    editDialog.afterClosed().subscribe(
      closeResult => {
        if (closeResult) {
          this.mainPageService.accountChanged.next(this.account);
        }
      }
    );
  }

}
