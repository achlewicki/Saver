import { Observable } from 'rxjs';
import { AccountService } from '#services/account-service/account.service';
import { AccountModel } from '#models/account.model';
import { Component, Input, OnInit, OnChanges } from '@angular/core';

@Component({
  selector: 'svr-account-balance-details',
  templateUrl: './account-balance-details.component.html',
  styleUrls: ['./account-balance-details.component.scss']
})
export class AccountBalanceDetailsComponent implements OnInit, OnChanges {

  @Input()
  public account: AccountModel;

  protected income$: Observable<number>;
  protected expense$: Observable<number>;
  protected estimatedIncome$: Observable<number>;
  protected estimatedExpense$: Observable<number>;

  constructor(
    private readonly accountService: AccountService
  ) { }

  ngOnInit(): void {
    this.income$ = this.accountService.getIncomeOfAccount(this.account.id);
    this.expense$ = this.accountService.getExpenseOfAccount(this.account.id);
    this.estimatedIncome$ = this.accountService.getEstimatedIncomeOfAccount(this.account.id);
    this.estimatedExpense$ = this.accountService.getEstimatedExpenseOfAccount(this.account.id);
  }

  ngOnChanges(): void {
    this.ngOnInit();
  }

}
