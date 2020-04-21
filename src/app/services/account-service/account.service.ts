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
    this.listAccountURL = config.backendUrl + '/user/';
    this.getFirstAccountURL = config.backendUrl + '/user/';
    this.getAccountNameURL = config.backendUrl + '/account/info/' + localStorage.getItem('user.id');
  }

  public listAccounts(userId: number): Observable<AccountModel[]> {
    return this.http.get<AccountModel[]>(this.listAccountURL + userId + '/accountlist')
      .pipe(
        catchError(this.handleError)
      );
  }

  public getFirstAccount(userId: number): Observable<AccountModel> {
    return this.http.get<AccountModel>(this.getFirstAccountURL + userId + '/account')
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
