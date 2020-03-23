import { OperationModel, GroupedOperations } from '#models/operations.model';
import { OperationsService } from '#services/operations-service/operations.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { OperationFilters } from '#models/operations-filters.model';

import * as moment from 'moment';
@Component({
  selector: 'svr-operations',
  templateUrl: './operations-view.component.html',
  styleUrls: ['./operations-view.component.scss']
})
export class OperationsViewComponent implements OnInit {

  private accountId: number;

  private allOperations: OperationModel[];
  protected operations: OperationModel[];
  protected groupedOperations: GroupedOperations[];

  protected sortSelectValue: string;
  protected showGrouped: boolean;

  protected errorInfo: string;

  protected filters: OperationFilters;
  protected showFilters: boolean;
  protected filtersButtonText: string;

  constructor(
    private readonly operationsService: OperationsService
  ) {
    this.groupedOperations = [];
    this.accountId = 1;
    this.sortSelectValue = 'newest';
    this.showGrouped = true;
    this.showFilters = false;
    this.errorInfo = 'Nieznany błąd :(';
    this.filtersButtonText = 'Pokaż filtry';
    this.filters = {
      dateFrom: new Date(0),
      dateTo: new Date(),
      onlyCyclic: false,
      haveFile: true,
      haveGuaranty: true
    };
  }

  ngOnInit(): void {
    this.operationsService.getOperationsByAccount(this.accountId).subscribe(
      result => {
        this.allOperations = result;
        this.reSort();
      },
      err => {
        console.error(err);
        this.errorInfo = err.error.message;
      }
    );
  }

  protected reSort(): void {
    this.operations = this.allOperations.filter((operation) => this.filtrOperations(operation));
    this.operations = this.operations.sort((a: OperationModel, b: OperationModel) => this.sortOperations(a, b));
    this.groupedOperations = [];
    if (this.showGrouped) {
      this.groupOperations();
    }
  }

  protected toogleFiltersWindow(): void {
    this.showFilters = !this.showFilters;
    this.filtersButtonText = this.showFilters ? 'Ukryj filtry' : 'Pokaż filtry';
  }

  private groupOperations(): void {
    this.operations.map((operation) => {
      const date = moment(operation.date).format('DD.MM.YYYY');
      const group = this.groupedOperations.find(x => x.date === date);
      if (group) {
        group.operations.push(operation);
      } else {
        this.groupedOperations.push({ date, operations: [operation] });
      }
    });
  }

  private sortOperations(a: OperationModel, b: OperationModel): number {
    switch (this.sortSelectValue) {
      default:
      case 'newest':
        this.showGrouped = true;
        return ((a.date > b.date) ? -1 : ((a.date < b.date) ? 1 : 0));
      case 'oldest':
        this.showGrouped = true;
        return ((a.date < b.date) ? -1 : ((a.date > b.date) ? 1 : 0));
      case 'highestValue':
        this.showGrouped = false;
        return ((a.value * a.type > b.value * b.type) ? -1 : ((a.value * a.type > b.value * b.type) ? 1 : 0));
      case 'lowestValue':
        this.showGrouped = false;
        return ((a.value * a.type < b.value * b.type) ? -1 : ((a.value * a.type < b.value * b.type) ? 1 : 0));
    }
  }

  private filtrOperations(operation: OperationModel): boolean {
    return (
      operation.date >= this.filters.dateFrom
      && operation.date <= this.filters.dateTo
    );
  }
}
