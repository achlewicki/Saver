import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { config } from '#config/config';
import { LoginModel } from '#models/login.model';
import { RegisterModel } from '#models/register.model';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AuthorisationService {

  private loginURL: string;
  private registerURL: string;
  private tokenAuthorisationURL: string;
  private httpHeader = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private readonly http: HttpClient
  ) {
    this.loginURL = config.backendUrl + '/login';
    this.tokenAuthorisationURL = config.backendUrl + '/auth/verify-token';
    this.registerURL = config.backendUrl + '/register';
  }

  public login(user: LoginModel): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.loginURL, user, this.httpHeader)
      .pipe(
        catchError(this.handleLoginError)
      );
  }

  public register(newUser: RegisterModel): Observable<any> {
    return this.http.post<any>(this.registerURL, newUser, this.httpHeader)
      .pipe(
        catchError(this.handleLoginError)
      );
  }

  public verifyToken(token: string): Observable<boolean> {
    return this.http.post<boolean>(this.tokenAuthorisationURL + '/' + localStorage.getItem('token'), token);
  }

  public logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user.id');
  }

  private handleLoginError(error: HttpErrorResponse) {
    let message: string;
    if (error.error instanceof ErrorEvent) {
      message = 'Błąd połączenia z serwerem';
      // console.error('Client error: ' + error.error.message);
    } else {
      // console.error('Server error response');
      // console.error(error);

      if (error.status === 400 || error.status === 401) {
        message = 'Nieprawidłowy login lub hasło';
      } else {
        message = 'Nieznany błąd serwera';
      }
    }
    return throwError(message);
  }
}

interface LoginResponse {
  user: {
    id: number
  };
  token: string;
  firstLogin: boolean;
}
