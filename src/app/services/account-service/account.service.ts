import { map } from 'rxjs/operators';
import { AccountStatistics } from '#models/account.model';
import { CurrencyModel } from '#models/currency.model';
import { Injectable } from '@angular/core';
import { Observable, throwError, forkJoin, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    this.listAccountURL = config.backendUrl + '/user/';
    this.getFirstAccountURL = config.backendUrl + '/user/';
    this.getAccountNameURL = config.backendUrl + '/account/info/' + localStorage.getItem('user.id');
  }

  public listAccounts(userId: string): Observable<AccountModel[]> {
    return this.http.get<AccountModel[]>(this.listAccountURL + userId + '/accountlist')
      .pipe(
        // catchError(this.handleError)
      );
  }

  // { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } }
  public getFirstAccount(userId: number): Observable<AccountModel> {
    return this.http.get<AccountModel>(this.getFirstAccountURL + userId + '/account')
      .pipe(
        // catchError(this.handleError)
      );
  }

  public getAccountInfo(accountId: number): Observable<AccountModel> {
    const url = config.backendUrl + '/account/' + accountId;
    return this.http.get<AccountModel>(url);
  }

  public createAccount(account: AccountModel): Observable<AccountModel> {
    const url = config.backendUrl + '/account/add/' + localStorage.getItem('user.id') + '/' + account.currency.id;
    return this.http.post<AccountModel>(url, account, this.authHeader);
  }

  public editAccount(account: AccountModel): Observable<AccountModel> {
    const url = config.backendUrl + '/account/update/' + account.id;
    console.log({ ...account, currId: 81 });
    return this.http.post<AccountModel>(url, { ...account, currId: 81 }); // account.currency.id
  }

  public getAllCurrencies(): Observable<CurrencyModel[]> {
    const url = config.backendUrl + '/currency/all';
    return this.http.get<CurrencyModel[]>(url);
  }

  public deleteAccount(accountId: number): Observable<any> {
    const url = config.backendUrl + '/account/delete/' + accountId;
    return this.http.delete(url);
  }

  public accountsToCreate(): Observable<number> {
    const url = config.backendUrl + '/account/possibleAccs/' + localStorage.getItem('user.id');
    return this.http.get<number>(url);
  }

  public getIncomeOfAccount(accountId: number): Observable<number> {
    const url = config.backendUrl + '/account/income/' + accountId;
    return this.http.get<number>(url);
  }

  public getExpenseOfAccount(accountId: number): Observable<number> {
    const url = config.backendUrl + '/account/expense/' + accountId;
    return this.http.get<number>(url);
  }

  public getEstimatedIncomeOfAccount(accountId: number): Observable<number> {
    const url = config.backendUrl + '/account/estincome/' + accountId;
    return this.http.get<number>(url);
  }

  public getEstimatedExpenseOfAccount(accountId: number): Observable<number> {
    const url = config.backendUrl + '/account/estexpense/' + accountId;
    return this.http.get<number>(url);
  }

  public getAccountStatistics(accountId: number): Observable<AccountStatistics> {
    const totalOperationsUrl = config.backendUrl + '/account/totalOperations/' + accountId;
    const cyclicUrl = config.backendUrl + '/account/totalCyclics/' + accountId;
    const billsUrl = config.backendUrl + '/account/totalCyclicsBill/' + accountId;

    return forkJoin(
      this.http.get<number>(totalOperationsUrl),
      this.http.get<number>(cyclicUrl),
      this.http.get<number>(billsUrl),
    ).pipe(
      map(([operations, cyclic, bills]) => {
        return {
          totalOperations: operations,
          totalCyclics: cyclic,
          totalCyclicsBill: bills
        } as AccountStatistics;
      })
    );
  }

}
