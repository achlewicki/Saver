import { Config } from '#config/config';
import { LoginModel } from '#models/login.model';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  private loginURL: string;
  private httpHeader = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private readonly http: HttpClient
  ) {
    this.loginURL = Config.backendUrl + '/login';
  }

  public verifyUser(user: LoginModel): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.loginURL, user, this.httpHeader)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    let message: string;
    if (error.error instanceof ErrorEvent) {
      message = 'Błąd połączenia z serwerem';
      console.error('Client error: ' + error.error.message);
    } else {
      console.error('Server error response');
      console.error(error);

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
}
