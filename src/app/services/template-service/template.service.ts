import { config } from '#config/config';
import { TemplateModel } from '#models/template.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {

  constructor(
    private readonly http: HttpClient
  ) { }

  public getTemplatesForAccount(accountId: number): Observable<TemplateModel[]> {
    const url = '';
    return this.http.get<TemplateModel[]>(url);
  }

  public createTemplate(template: TemplateModel): Observable<TemplateModel> {
    const url = config.backendUrl + '/template/add/' + localStorage.getItem('user.id') + '/' + template.subcategory.id;
    return this.http.post<TemplateModel>(url, template);
  }
}
