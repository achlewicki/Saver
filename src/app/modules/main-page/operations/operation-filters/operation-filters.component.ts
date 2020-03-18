import { Component, Input, OnInit } from '@angular/core';
import { OperationFilters } from '#models/operations-filters.model';

@Component({
  selector: 'svr-operation-filters',
  templateUrl: './operation-filters.component.html',
  styleUrls: ['./operation-filters.component.scss']
})
export class OperationFiltersComponent implements OnInit {

  @Input()
  protected filters: OperationFilters;

  constructor() {

  }

  ngOnInit(): void {
  }

}
