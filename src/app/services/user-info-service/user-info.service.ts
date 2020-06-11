import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from '#config/config';
import { Observable, throwError } from 'rxjs';
import { UserModel } from '#models/user.model';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

  private getUserInfoURL: string;
  private getUserAchisURL: string;
  private getUserEventsURL: string;

  constructor(
    private readonly http: HttpClient
  ) {
    this.getUserInfoURL = config.backendUrl + '/user/';
    this.getUserAchisURL = config.backendUrl + '/achievement/amount/';
    this.getUserEventsURL = config.backendUrl + '/event/amount/';
  }

  public getUserInfo(userId: number): Observable<UserModel> {
    return this.http.get<UserModel>(this.getUserInfoURL + userId + '/info')
      .pipe(
        catchError(this.handleError)
      );
  }

  public getUserAchis(userId: number): Observable<number> {
    return this.http.get<number>(this.getUserAchisURL + userId)
      .pipe(
        catchError(this.handleError)
      );
  }

  public getUserEvents(userId: number): Observable<number> {
    return this.http.get<number>(this.getUserEventsURL + userId)
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
