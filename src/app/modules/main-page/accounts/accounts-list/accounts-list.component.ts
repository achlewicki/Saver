import { MatDialog } from '@angular/material';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AccountModel } from '#models/account.model';
import { AddAccountDialogComponent } from '#dialogs/add-account-dialog/add-account-dialog.component';

@Component({
  selector: 'svr-accounts-list',
  templateUrl: './accounts-list.component.html',
  styleUrls: ['./accounts-list.component.scss']
})
export class AccountsListComponent {

  @Input()
  protected accounts: AccountModel[];

  @Output()
  accountSelected = new EventEmitter<AccountModel>();

  protected addAccountDisabled = false;

  constructor(
    private readonly dialogs: MatDialog
  ) { }

  protected selectAccount(account: AccountModel) {
    this.accountSelected.emit(account);
  }

  protected addAccount() {
    if (!this.addAccountDisabled) {
      this.dialogs.open(AddAccountDialogComponent, {
        minWidth: '560px'
      });
    }
  }
}
