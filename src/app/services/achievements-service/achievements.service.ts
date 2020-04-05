import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UserModel} from '#models/user.model';
import {config} from '#config/config';
import {Observable} from 'rxjs';
import {AchievementModel} from '#models/achievement.model';
import {UserAchievementModel} from '#models/userAchievement.model';

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

  public getRecentAchievements(userId: number): Observable<UserAchievementModel[]> {
    return this.http.get<UserAchievementModel[]>(config.backendUrl + '/achievement/recent/' + localStorage.getItem('user.id'), this.httpHeader);
  }

  public getAllUserAchievements(userId: number): Observable<UserAchievementModel[]> {
    return this.http.get<UserAchievementModel[]>(config.backendUrl + '/achievement/all/' + userId, this.httpHeader);
  }

  public getAllAchievements(): Observable<AchievementModel[]> {
    return this.http.get<AchievementModel[]>(config.backendUrl + '/achievement/allAvailable/', this.httpHeader);
  }
}
