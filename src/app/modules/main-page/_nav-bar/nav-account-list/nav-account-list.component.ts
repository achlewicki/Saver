import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AccountModel } from '#models/account.model';
import { AccountService } from '#services/account-service/account.service';
import { MainPageService } from '#services/main-page-service/main-page.service';
import { Router } from '@angular/router';

@Component({
  selector: 'svr-nav-account-list',
  templateUrl: './nav-account-list.component.html',
  styleUrls: ['./nav-account-list.component.scss']
})
export class NavAccountListComponent implements OnInit {
  @Input()
  expanded: boolean;
  @Output()
  public closing: EventEmitter<boolean> = new EventEmitter();
  protected errorInfo = 'test';
  protected accountSelectionClicked: boolean;
  protected accounts: AccountModel[];
  protected account: AccountModel;

  constructor(
    private router: Router,
    private mpservice: MainPageService,
    private readonly accountService: AccountService,
  ) { }

  ngOnInit() {
    this.mpservice.accountAdded.subscribe(
      () => {
        this.accountService.listAccounts(localStorage.getItem('user.id')).subscribe(
          (response) => {
            this.accounts = response;
          }
        );
      }
    );
    this.mpservice.accountDeleted.subscribe(
      account => {
        this.accounts.splice(this.accounts.findIndex(element => element.id === account.id), 1);
      }
    );
    this.accountService.listAccounts(localStorage.getItem('user.id'))
      .subscribe(
        (response) => {
          this.accounts = response;
        },
        (error) => {
          this.errorInfo = error;
        });

    this.mpservice.activeAccount.subscribe(
      (result) => {
        this.account = result;
      }
    );
  }

  onAccountSelectionClick(): void {
    this.accountSelectionClicked = !this.accountSelectionClicked;
  }

  protected openAccountView() {
    this.router.navigateByUrl('/main/accounts');
  }
}
