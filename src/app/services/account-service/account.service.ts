import { CurrencyModel } from './../../models/currency.model';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { config } from '#config/config';
import { AccountModel } from '#models/account.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private listAccountURL: string;
  private getFirstAccountURL: string;
  private getAccountNameURL: string;
  private createAccountURL: string;
  private authHeader = {
    headers: new HttpHeaders({ Authorization: 'Bearer' + localStorage.getItem('token') })
  };

  constructor(
    private readonly http: HttpClient
  ) {
    this.createAccountURL = config.backendUrl + '/account/add/' + localStorage.getItem('user.id') + '/81';  // TEMP CURRENCY ID
    this.listAccountURL = config.backendUrl + '/user/accounts/';
    this.getFirstAccountURL = config.backendUrl + '/user/get-one-acc/';
    this.getAccountNameURL = config.backendUrl + '/account/info/' + localStorage.getItem('user.id');
  }

  public listAccounts(userId: string): Observable<AccountModel[]> {
    return this.http.get<AccountModel[]>(this.listAccountURL + userId)
      .pipe(
        catchError(this.handleError)
      );
  }

  // { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } }
  public getFirstAccount(userId: number): Observable<AccountModel> {
    return this.http.get<AccountModel>(this.getFirstAccountURL + userId)
      .pipe(
        catchError(this.handleError)
      );
  }

  public createAccount(account: AccountModel): Observable<AccountModel> {
    return this.http.post<AccountModel>(this.createAccountURL, account, this.authHeader);
  }

  public getAllCurrencies(): Observable<CurrencyModel[]> {
    const url = config.backendUrl + '/currency/all';
    return this.http.get<CurrencyModel[]>(url);
  }

  public deleteAccount(accountId: number): Observable<any> {
    const url = config.backendUrl + '/account/delete/' + accountId;
    return this.http.delete(url);
  }

  private handleError() {
    let message: string;
    message = 'blad';
    return throwError(message);
  }
}
