import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AccountModel} from '#models/account.model';
import {AccountService} from '#services/account-service/account.service';
import {MainPageService} from '#services/main-page-service/main-page.service';

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
  protected accountName: string;
  protected account: AccountModel;

  constructor(
    private mpservice: MainPageService,
    private readonly accountService: AccountService,
  ) { }

  ngOnInit() {
    this.accountService.listAccounts(1)
      .subscribe(
        (response) => {
          this.accounts = response;
        },
        (error) => {
          this.errorInfo = error;
        });
    this.mpservice.activeAccount.subscribe(
      (result) => this.account = result
    );
  }

  onAccountSelectionClick(): void {
    this.accountSelectionClicked = !this.accountSelectionClicked;
    console.log(this.expanded);
  }
}
