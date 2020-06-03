import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from '#config/config';
import { NotificationModel } from '#models/notification.model';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private listNotificationURL: string;
  private markNotificationURL: string;

  constructor(
    private readonly http: HttpClient
  ) {
    this.listNotificationURL = config.backendUrl + '/notification/all/';
    this.markNotificationURL = config.backendUrl + '/notification/mark/';
  }

  public listNotifications(userId: number): Observable<NotificationModel[]> {
    return this.http.get<NotificationModel[]>(this.listNotificationURL + userId)
      .pipe(
        catchError(this.handleError)
      );
  }

  public markNotification(notification: NotificationModel): Observable<NotificationResponse> {
    return this.http.post<any>(this.markNotificationURL + notification.id, notification)
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

interface NotificationResponse {
  notification: {
    id: number;
    type: string;
    title: string;
    date: Date;
    description: string;
    seen: boolean;
  };
}
