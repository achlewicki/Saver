import { Component, Input, OnChanges  } from '@angular/core';
import { AccountModel } from '#models/account.model';
import { OperationModel } from '#models/operations.model';
import { OperationsService } from '#services/operations-service/operations.service';
import { OperationFilters } from '#models/operations-filters.model';

@Component({
  selector: 'svr-dashboard-operations',
  templateUrl: './dashboard-operations.component.html',
  styleUrls: ['./dashboard-operations.component.scss']
})
export class DashboardOperationsComponent implements OnChanges {
  @Input() protected account: AccountModel;

  protected operations: OperationModel[] = [];
  protected sortType: 'asc';
  private operationsFilters: OperationFilters = {};

  constructor(
    private readonly operationsService: OperationsService
  ) { }

  ngOnChanges() {
    this.operations = [];
    this.operationsService.getOperationsByAccount(
      this.account.id,
      {
        length: 7,
        startIndex: 0,
        sort: this.sortType,
        type: this.operationsFilters.type,
        dateFrom: this.operationsFilters.dateFrom,
        dateTo: this.operationsFilters.dateTo
      }
    ).subscribe(
      result => {
        this.operations.push(...result);
        // this.viewState = result.length === 0 ? 'no-more' : 'ready';
      });
  }
}
