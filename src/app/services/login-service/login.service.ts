import { Config } from '#config/config';
import { LoginModel } from '#models/login.model';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  private loginURL: string;
  httpHeader = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private readonly http: HttpClient
  ) {
    this.loginURL = Config.backendUrl + '/login';
  }

  verifyUser(user: LoginModel): Observable<{ status: string, jwt?: string }> {
    return this.http.post<{ status: string, jwt?: string }>(this.loginURL, user, this.httpHeader)
      .pipe(

      );
  }
}
