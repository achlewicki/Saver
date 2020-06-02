import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { MainPageService } from '#services/main-page-service/main-page.service';
import { AccountModel } from '#models/account.model';
import { InstalmentBasicModel } from '#models/instalment.model';
import { InstalmentsService } from '#services/instalments-service/instalments.service';

@Component({
  selector: 'svr-instalments-list',
  templateUrl: './instalments-list.component.html',
  styleUrls: ['./instalments-list.component.scss']
})
export class InstalmentsListComponent implements OnInit {

  protected account: AccountModel;
  protected instalmentList$: Observable<InstalmentBasicModel[]>;
  protected selectedInstalment: InstalmentBasicModel;

  constructor(
    private readonly mainPageService: MainPageService,
    private readonly instlamentsService: InstalmentsService
  ) { }

  ngOnInit() {
    this.mainPageService.activeAccount.subscribe(
      account => {
        this.account = account;
        this.getInstalmentList(account.id);
      }
    );
  }

  protected getInstalmentList(accountId: number): void {
    this.instalmentList$ = this.instlamentsService.getInstalmentsByAccount(accountId);
  }

  protected instalmentsRemainingValueToPaid(instalments: InstalmentBasicModel[]): number {
    const totalValue = this.instalmentsTotalValue(instalments);

    const paidValue = instalments.map(
      element => {
        return element.paidValue || 0;
      }
    ).reduce(
      (previous, current) => {
        return previous + current;
      }, 0
    );

    return totalValue - paidValue;
  }

  protected instalmentsTotalValue(instalments: InstalmentBasicModel[]): number {
    return instalments.map(
      element => {
        return element.totalValue || 0;
      }
    ).reduce(
      (previous, current) => {
        return previous + current;
      }, 0
    );
  }

}
