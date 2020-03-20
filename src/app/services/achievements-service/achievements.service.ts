import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UserModel} from '#models/user.model';
import {config} from '#config/config';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AchievementsService {
  private httpHeader = {
    headers: new HttpHeaders({ Authorization: 'Bearer ' + localStorage.getItem('token') })
  };
  constructor(
    private readonly http: HttpClient
  ) { }

  public getUserInfo(userId: number): Observable<UserModel> {
    return this.http.get<UserModel>(config.backendUrl + '/user/get-by-id/' + userId, this.httpHeader);
  }
}
