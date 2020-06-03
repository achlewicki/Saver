import { CategoryModel } from '#models/category.model';
import { CategoryService } from '#services/category-service/category.service';
import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { OperationFilters } from '#models/operations-filters.model';

@Component({
  selector: 'svr-operation-filters',
  templateUrl: './operation-filters.component.html',
  styleUrls: ['./operation-filters.component.scss']
})
export class OperationFiltersComponent implements OnInit {

  @Output()
  public filtersConfirmed = new EventEmitter<OperationFilters>();

  protected filters: OperationFilters;
  protected categories: CategoryModel[];

  protected opeartionTypes: OperationTypesFilter;
  protected dateTo: Date;
  protected dateFrom: Date;
  protected operationType: 'all' | 'in' | 'out' = 'all';

  constructor(
    private readonly categoryService: CategoryService
  ) {
    this.categoryService.getAllCategories().subscribe(
      result => this.categories = result
    );
  }

  ngOnInit(): void {
    this.opeartionTypes = {
      regular: true,
      cyclic: true,
      instalment: true
    };
  }

  // updateSubcategoryArray(array: number[]) {
  //   console.log(array);
  // }

  protected saveFilters(): void {
    const filters: OperationFilters = {
      dateFrom: this.dateFrom,
      dateTo: this.dateTo,
      type: [],
      operationType: this.operationType
    };
    if (this.opeartionTypes.regular) { filters.type.push('regular'); }
    if (this.opeartionTypes.cyclic) { filters.type.push('cyclic'); }
    if (this.opeartionTypes.instalment) { filters.type.push('instalment'); }
    this.filtersConfirmed.emit(filters);
  }
}

interface OperationTypesFilter {
  regular: boolean;
  cyclic: boolean;
  instalment: boolean;
}
