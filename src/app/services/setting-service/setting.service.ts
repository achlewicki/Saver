import { UserModel } from '#models/user.model';
import { config } from '#config/config';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { EmailModel, InfoModel, PasswordModel } from '#models/setting.model';

@Injectable({
  providedIn: 'root'
})

export class SettingService {

  private changeEmailURL: string;
  private changePasswordURL: string;
  private changeInfoURL: string;
  private httpHeader = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private readonly http: HttpClient
  ) {
    this.changeEmailURL = config.backendUrl + '/user-settings/change-email/' + localStorage.getItem('user.id');
    this.changePasswordURL = config.backendUrl + '/user-settings/change-password/' + localStorage.getItem('user.id');
    this.changeInfoURL = config.backendUrl + '/user-settings/change-info/' + localStorage.getItem('user.id');
  }

  public changeEmail(email: EmailModel): Observable<UserResponse> {
    return this.http.post<any>(this.changeEmailURL, email, this.httpHeader)
      .pipe(
        catchError(this.errorHandling)
      );
  }

  public changePassword(password: PasswordModel): Observable<UserResponse> {
    return this.http.post<any>(this.changePasswordURL, password, this.httpHeader)
      .pipe(
        catchError(this.errorHandling)
      );
  }

  public changeInfo(userInfo: InfoModel): Observable<UserModel> {
    return this.http.post<UserModel>(this.changeInfoURL, userInfo, this.httpHeader);
  }

  protected errorHandling(error: HttpErrorResponse) {
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

interface UserResponse {
  user: {
    id: string,
    email: string,
    firstName: string,
    lastName: string,
    birthDate: Date,
    sex: string,
    registerDate: Date,
    level: number,
    experience: number,
    isActive: boolean,
    isPremium: boolean
  };
}
