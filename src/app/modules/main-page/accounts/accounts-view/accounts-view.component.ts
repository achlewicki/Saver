import { AccountModel } from '#models/account.model';
import { AccountService } from '#services/account-service/account.service';
import { MainPageService } from '#services/main-page-service/main-page.service';
import { Component, OnInit } from '@angular/core';
import { faWallet } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'svr-accounts-view',
  templateUrl: './accounts-view.component.html',
  styleUrls: ['./accounts-view.component.scss']
})
export class AccountsViewComponent implements OnInit {

  protected accounts: AccountModel[];
  protected selectedAccount: AccountModel;
  protected canDelete: boolean;
  protected possibleAccountsToCreate: number;

  constructor(
    private readonly mpService: MainPageService,
    private readonly accountService: AccountService,
  ) { }

  ngOnInit(): void {
    this.mpService.activeView.next({
      name: 'accounts',
      title: 'Moje konta',
      icon: faWallet
    });

    this.mpService.activeAccount.subscribe(
      account => {
        this.selectedAccount = account;
      }
    );
    this.getAccounts();

    this.getNumberOfAccountsToCreate();
    this.mpService.accountAdded.subscribe(
      () => {
        this.getAccounts();
        this.getNumberOfAccountsToCreate();
      }
    );
    this.mpService.accountChanged.subscribe(
      () => {
        this.getAccounts();
        this.accountService.getAccountInfo(this.selectedAccount.id).subscribe(
          accountInfo => this.selectedAccount = accountInfo
        );
      }
    );
  }

  protected accountDeletedHandler(account: AccountModel): void {
    this.accounts = this.accounts.slice(this.accounts.indexOf(account), 1);
    this.getAccounts();
    this.getNumberOfAccountsToCreate();
  }

  private getAccounts(): void {
    this.accountService.listAccounts(localStorage.getItem('user.id')).subscribe(
      result => {
        this.accounts = result;
        this.canDelete = this.accounts.length > 1;
        if (!this.selectedAccount) {
          this.selectedAccount = result[0];
        }
      }
    );
  }

  private getNumberOfAccountsToCreate(): void {
    this.accountService.accountsToCreate().subscribe(
      numberOfAccounts => this.possibleAccountsToCreate = numberOfAccounts
    );
  }

}
