import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EventBasicModel, EventModel } from '#models/event.model';
import { config } from '#config/config';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(
    private readonly http: HttpClient
  ) { }

  public getEvents(accountId: number): Observable<EventBasicModel[]> {
    const url = config.backendUrl + '/event/get/all/' + accountId;
    return this.http.get<EventBasicModel[]>(url);
  }

  public getEventDetails(eventId: number): Observable<EventModel> {
    const url = config.backendUrl + '/event/get/one/' + eventId;
    return this.http.get<EventModel>(url);
  }

  public createEvent(event: EventModel, accountId: number): Observable<EventModel> {
    const url = config.backendUrl + '/event/add/' + accountId;
    return this.http.post<EventModel>(url, event);
  }

  public editEvent(event: EventModel, eventId: number): Observable<EventModel> {
    const url = config.backendUrl + '/event/edit/' + eventId;
    return this.http.post<EventModel>(url, event);
  }

  public deleteEvent(eventId: number): Observable<void> {
    const url = config.backendUrl + '/event/delete/' + eventId;
    return this.http.delete<void>(url);
  }

  public getUpcomingEvent(accountId: number): Observable<EventModel> {
    const url = config.backendUrl + '/event/last/' + accountId;
    return this.http.get<EventModel>(url);
  }

  public createBirthdayEvent(): Observable<void> {
    const url = config.backendUrl + '/event/create/onregister';
    return this.http.get<void>(url);
  }
}
