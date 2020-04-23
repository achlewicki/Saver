import { AddAccountDialogComponent } from '#dialogs/add-account-dialog/add-account-dialog.component';
import { AccountModel } from '#models/account.model';
import { AccountService } from '#services/account-service/account.service';
import { MainPageService } from '#services/main-page-service/main-page.service';
import { Component, OnInit, AfterContentInit } from '@angular/core';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'svr-accounts-view',
  templateUrl: './accounts-view.component.html',
  styleUrls: ['./accounts-view.component.scss']
})
export class AccountsViewComponent implements OnInit, AfterContentInit {

  protected accounts: AccountModel[];
  protected selectedAccount: AccountModel;
  protected canDelete: boolean;

  constructor(
    private readonly mpService: MainPageService,
    private readonly accountService: AccountService,
    private readonly dialogs: MatDialog
  ) {
    this.getAccounts();
  }

  ngOnInit(): void {
    this.mpService.activeView.next({
      name: 'accounts',
      title: 'Moje konta',
      icon: 'null'
    });
  }

  ngAfterContentInit(): void {
    this.mpService.activeAccount.subscribe(
      account => {
        this.selectedAccount = account;
        this.mpService.activeAccount.unsubscribe();
      }
    );
  }

  protected selectAccount(account: AccountModel): void {
    // ? this.selectedAccount.next(account);
    this.selectedAccount = account;
  }

  protected openAddAccountDialog(): void {
    this.dialogs.open(AddAccountDialogComponent);
  }

  private getAccounts(): void {
    this.accountService.listAccounts(localStorage.getItem('user.id')).subscribe(
      result => {
        this.accounts = result;
        this.canDelete = this.accounts.length > 1;
      }
    );
  }
}
