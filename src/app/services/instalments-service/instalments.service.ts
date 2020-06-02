import { config } from '#config/config';
import { InstalmentExtendedModel, InstalmentDTO } from '#models/instalment.model';
import { InstalmentBasicModel } from '#models/instalment.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InstalmentsService {

  constructor(private readonly http: HttpClient) { }

  public getInstalmentsByAccount(accountId: number): Observable<InstalmentBasicModel[]> {
    const url = config.backendUrl + '/instalment/get/all/' + accountId;
    return this.http.get<InstalmentBasicModel[]>(url);
  }

  public getInstalmentInfo(instalmentId: number): Observable<InstalmentExtendedModel> {
    const url = config.backendUrl + '/instalment/get/' + instalmentId;
    return this.http.get<InstalmentExtendedModel>(url);
  }

  public addNewInstalment(instalment: InstalmentDTO, accountId: number, subcategoryId: number): Observable<InstalmentBasicModel> {
    const url = config.backendUrl + '/instalment/add/' + accountId + '/' + subcategoryId;
    return this.http.post<InstalmentBasicModel>(url, instalment);
  }

  public removeInstalment(instalment: InstalmentBasicModel): Observable<void> {
    const url = config.backendUrl + '/instalment/delete/' + instalment.id;
    return this.http.delete<void>(url);
  }
}
