import { MainPageService } from '#services/main-page-service/main-page.service';
import { MatDialog } from '@angular/material';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AccountModel } from '#models/account.model';
import { AddAccountDialogComponent, AddAccountDialogType } from '#dialogs/add-account-dialog/add-account-dialog.component';
import {NavAccountListComponent} from '#modules/main-page/_nav-bar/nav-account-list/nav-account-list.component';

@Component({
  selector: 'svr-accounts-list',
  templateUrl: './accounts-list.component.html',
  styleUrls: ['./accounts-list.component.scss']
})
export class AccountsListComponent {

  @Input()
  protected accounts: AccountModel[];

  @Input()
  protected possibleAccounts = 0;

  @Output()
  public accountSelected = new EventEmitter<AccountModel>();

  constructor(
    private readonly dialogs: MatDialog,
    private readonly mainPageService: MainPageService,
    private readonly navAccountListComponent: NavAccountListComponent,
  ) { }

  protected selectAccount(account: AccountModel) {
    this.accountSelected.emit(account);
  }

  protected addAccount() {
    if (this.possibleAccounts > 0) {
      this.dialogs.open<AddAccountDialogComponent, AddAccountDialogType, boolean>(AddAccountDialogComponent, {
        minWidth: '560px',
        disableClose: true,
        data: {
          type: 'add'
        }
      });
    }
  }
}
