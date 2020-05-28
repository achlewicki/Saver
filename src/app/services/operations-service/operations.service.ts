import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { config } from '#config/config';
import { OperationModel } from '#models/operations.model';

@Injectable({
  providedIn: 'root'
})
export class OperationsService {

  constructor(
    private readonly http: HttpClient
  ) { }

  public getOperationsByAccount(
    accountId: number,
    options?: {
      length?: number | string,
      startIndex?: number | string,
      sort?: 'asc' | 'dsc' | 'valdsc' | 'valasc',
      type?: string[],
      dateTo?: Date,
      dateFrom?: Date,
      categoriesId?: number[],
      operationType?: 'all' | 'in' | 'out'
    }
  ): Observable<OperationModel[]> {

    const url = config.backendUrl + '/operation/get-by-acc/' + accountId;
    const dateFormatter = (date: Date): string => {
      return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    };

    const params: { [param: string]: string } = {};
    Object.assign(params, options.length ? { len: options.length.toString() } : null);
    Object.assign(params, options.startIndex ? { start: options.startIndex.toString() } : null);
    Object.assign(params, options.sort ? { sort: options.sort } : null);
    Object.assign(params, options.type ? { dist: options.type.join(',') } : null);
    Object.assign(params, options.dateTo ? { dateTo: dateFormatter(options.dateTo) } : null);
    Object.assign(params, options.dateFrom ? { dateFrom: dateFormatter(options.dateFrom) } : null);
    Object.assign(params, options.categoriesId ? { categoriesId: options.categoriesId.join(',') } : null);
    Object.assign(params, options.operationType ? { type: options.operationType } : null);

    return this.http.get<OperationModel[]>(url, { params });
  }

  public addOperation(accountId: number, operation: OperationModel): Observable<OperationModel> {
    const url = config.backendUrl + '/operation/add/' + accountId + '/' + operation.subcategory.id;
    return this.http.post<OperationModel>(url, operation);
  }

  public saveEventOperation(accountId: number, operation: OperationModel): Observable<OperationModel> {
    const url = config.backendUrl + '/operation/add/' + localStorage.getItem('user.id') + '/' + '0';
    return this.http.post<OperationModel>(url, operation);
  }
}
