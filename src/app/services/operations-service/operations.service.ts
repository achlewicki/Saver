import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { config } from '#config/config';
import { OperationModel } from '#models/operations.model';
import { SubcategoryModel } from '#models/subcategory.model';

@Injectable({
  providedIn: 'root'
})
export class OperationsService {

  private httpHeader = {
    headers: new HttpHeaders({ Authorization: 'Bearer ' + localStorage.getItem('token') })
  };

  constructor(
    private readonly http: HttpClient
  ) { }

  public getOperationsByAccount(accountId: number): Observable<OperationModel[]> {
    return this.http.get<OperationResult[]>(config.backendUrl + '/operation/get-by-acc/' + accountId, this.httpHeader)
      .pipe(
        map<OperationResult[], OperationModel[]>(result => {
          return result.map<OperationModel>(item => ({
            ...item,
            date: new Date(item.date)
          })
          );
        })
      );
  }

  public addOperation(accountId: number, operation: OperationModel): Observable<OperationModel> {
    const url = config.backendUrl + '/operation/add/' + localStorage.getItem('user.id') + '/' + operation.subcategory.id;
    return this.http.post<OperationModel>(url, operation, this.httpHeader);
  }
}

export interface OperationResult {
  title: string;
  description: string;
  type: number;
  value: number;
  date: string;
  intoAccount: string;
  guarantyDays: number;
  distinction: string;
  subcategory: SubcategoryModel;
}
