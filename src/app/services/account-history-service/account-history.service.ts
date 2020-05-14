import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AccountHistoryModel } from '#models/account-history.model';
import { Observable } from 'rxjs';
import { config } from '#config/config';

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

  public getInfo(accountId: number, dateFrom: Date, dateTo: Date): Observable<AccountHistoryModel[]> {
    const dateFormatter = (date: Date): string => {
      return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    };
    const params = {
      from: dateFormatter(dateFrom),
      to: dateFormatter(dateTo)
    };
    const url = config.backendUrl + '/account-history/' + accountId;
    return this.http.get<AccountHistoryModel[]>(url, { params });
  }


}
