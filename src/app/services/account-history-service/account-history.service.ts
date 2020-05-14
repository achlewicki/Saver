import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AccountHistoryModel} from '#models/account-history.model';
import {Observable} from 'rxjs';
import {config} from '#config/config';

@Injectable({
  providedIn: 'root'
})
export class AccountHistoryService {
  private accountHistoryURL: string;
  private authHeader = {
    headers: new HttpHeaders({ Authorization: 'Bearer' + localStorage.getItem('token') })
  };

  constructor(
    private readonly http: HttpClient
  ) {
    this.accountHistoryURL = config.backendUrl + '/account-history/';
  }

  public getInfo(accountId: number, dateFrom: string, dateTo: string): Observable<AccountHistoryModel[]> {
    return this.http.get<AccountHistoryModel[]>(this.accountHistoryURL + accountId + '?from=' + dateFrom + '&to=' + dateTo);
  }


}
