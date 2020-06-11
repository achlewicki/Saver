import { Injectable } from '@angular/core';
import { config } from '#config/config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CyclicModel } from '#models/cyclic.model';

@Injectable({
  providedIn: 'root'
})
export class CyclicService {

  constructor(
    private readonly http: HttpClient
  ) { }

  public getAllCyclics(accountId: number): Observable<CyclicModel[]> {
    const url = config.backendUrl + '/cyclic/get/all/' + accountId;
    return this.http.get<CyclicModel[]>(url);
  }

  public addCyclic(accountId: number, subcategoryId: number, cyclic: CyclicModel): Observable<CyclicModel> {
    const url = config.backendUrl + '/cyclic/add/' + accountId + '/' + subcategoryId;
    return this.http.post<CyclicModel>(url, cyclic);
  }

  public deleteCyclic(cyclicId: number): Observable<void> {
    const url = config.backendUrl + '/cyclic/delete/' + cyclicId;
    return this.http.delete<void>(url);
  }
}
