import { AccountModel } from '#models/account.model';
import { OperationModel } from '#models/operations.model';
import { OperationsService } from '#services/operations-service/operations.service';
import { Component, OnInit } from '@angular/core';
import { OperationFilters } from '#models/operations-filters.model';
import { MainPageService } from '#services/main-page-service/main-page.service';
import { faChevronDown, faExchangeAlt } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'svr-operations',
  templateUrl: './operations-view.component.html',
  styleUrls: ['./operations-view.component.scss']
})
export class OperationsViewComponent implements OnInit {

  private operationsFilters: OperationFilters = {};

  protected account: AccountModel;
  protected operations: OperationModel[];

  protected errorInfo: string;

  protected showFilters: boolean;
  protected sortType: 'asc' | 'dsc' | 'valdsc' | 'valasc' = 'asc';

  protected viewState: 'ready' | 'loading' | 'error' | 'no-more' = 'ready';

  protected dropIcon = faChevronDown;

  constructor(
    private readonly mainPageService: MainPageService,
    private readonly operationsService: OperationsService
  ) {
    this.showFilters = false;
  }

  ngOnInit(): void {
    this.mainPageService.activeView.next({
      name: 'operations',
      title: 'Operacje',
      icon: faExchangeAlt
    });
    this.mainPageService.activeAccount.subscribe(
      result => {
        this.account = result;
        this.refetchData();
      }
    );
  }

  protected toogleFiltersWindow(): void {
    this.showFilters = !this.showFilters;
  }

  protected refetchData(): void {
    this.operations = [];
    this.fetchData();
  }

  protected fetchData(): void {
    this.viewState = 'loading';
    this.operationsService.getOperationsByAccount2(
      this.account.id,
      {
        length: 10,
        startIndex: this.operations.length,
        sort: this.sortType,
        type: this.operationsFilters.type,
        dateFrom: this.operationsFilters.dateFrom,
        dateTo: this.operationsFilters.dateTo
      }
    ).subscribe(
      result => {
        this.operations.push(...result);
        this.viewState = result.length === 0 ? 'no-more' : 'ready';
      },
      error => {
        console.log(error);
        this.errorInfo = 'Wystąpił błąd';
        this.viewState = 'error';
      }
    );
  }

  protected reSortOperations(): void {
    this.refetchData();
  }

  protected applyFilters(filters: OperationFilters): void {
    this.operationsFilters = filters;
    this.refetchData();
  }

}
