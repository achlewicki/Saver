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
  private accountId: number;
  private httpHeader = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private readonly http: HttpClient
  ) {
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

  private handleError() {
    let message: string;
    message = 'blad';
    return throwError(message);
  }
}
