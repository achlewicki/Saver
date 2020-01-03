import { LoginModel } from './../../login/login-model/login-model';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private users: LoginModel[] = [
    {
      login: 'test',
      password: 'test'
    },
    {
      login: 'user',
      password: '123'
    }
  ];

  constructor() { }

  public verifyUser(user: LoginModel): Observable<LoginModel> {
    return of(this.users.find((e) => JSON.stringify(e) === JSON.stringify(user)));
  }
}
