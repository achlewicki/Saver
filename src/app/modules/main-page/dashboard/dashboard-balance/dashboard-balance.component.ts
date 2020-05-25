import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {AccountModel} from '#models/account.model';
import {Observable} from 'rxjs';
import {AccountService} from '#services/account-service/account.service';

@Component({
  selector: 'svr-dashboard-balance',
  templateUrl: './dashboard-balance.component.html',
  styleUrls: ['./dashboard-balance.component.scss']
})
export class DashboardBalanceComponent implements OnChanges {
  @Input() protected account: AccountModel;
  protected income$: Observable<number>;
  protected expense$: Observable<number>;
  constructor(
    private readonly accountService: AccountService
  ) { }

  ngOnChanges() {
    this.income$ = this.accountService.getIncomeOfAccount(this.account.id);
    this.expense$ = this.accountService.getExpenseOfAccount(this.account.id);
  }
}
