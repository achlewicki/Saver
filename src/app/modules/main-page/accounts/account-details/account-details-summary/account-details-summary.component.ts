import { Observable } from 'rxjs';
import { AccountService } from '#services/account-service/account.service';
import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { AccountModel, AccountStatistics } from '#models/account.model';

@Component({
  selector: 'svr-account-details-summary',
  templateUrl: './account-details-summary.component.html',
  styleUrls: ['./account-details-summary.component.scss']
})
export class AccountDetailsSummaryComponent implements OnInit, OnChanges {

  @Input()
  public account: AccountModel;

  protected statistics$: Observable<AccountStatistics>;

  constructor(
    private readonly accountService: AccountService
  ) { }

  ngOnInit(): void {
    this.statistics$ = this.accountService.getAccountStatistics(this.account.id);
  }

  ngOnChanges(): void {
    this.ngOnInit();
  }
}
