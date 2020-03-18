import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { config } from '#config/config';
import { OperationModel } from '#models/operations.model';
import { Subcategory } from '#models/subcategory.model';

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
        map<OperationResult[], OperationModel[]>(x => {
          return x.map<OperationModel>(item => ({
            ...item,
            date: new Date(item.date)
          })
          );
        }),
        tap(a => console.log(a))
      );
  }
}

export interface OperationResult {
  title: string;
  description: string;
  type: number;
  value: number;
  date: string;
  intoAccount: boolean;
  guarantyDays: number;
  subcategory: Subcategory;
}
