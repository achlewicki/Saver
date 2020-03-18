import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {config} from '#config/config';
import {Observable, throwError} from 'rxjs';
import {CategoryModel} from '#models/category.model';
import {catchError} from 'rxjs/operators';
import {SubcategoryModel} from '#models/subcategory.model';
import {SubcategoryAddModel} from '#models/subcategoryAdd.model';

@Injectable({
  providedIn: 'root'
})
export class SubcategoryService {
  private addSubcategoryURL: string;
  private deleteSubcategoryURL: string;
  private updateSubcategoryURL: string;
  // private tokenAuthorisationURL: string;
  private httpHeader = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor( private readonly http: HttpClient) {
    // this.allSubcategoryURL = config.backendUrl + '/category/all/' + localStorage.getItem('user.id');
    this.addSubcategoryURL = config.backendUrl + '/subcategory/add/';
    // this.tokenAuthorisationURL = config.backendUrl + '/auth/verify-token';
  }

  public updateSubcategory(subcategory: SubcategoryModel): Observable<number> {
    this.updateSubcategoryURL = config.backendUrl + '/subcategory/update/' + subcategory.id;
    return this.http.post<number>(this.updateSubcategoryURL, subcategory, this.httpHeader);
  }

  public addSubcategory(subcategoryAdd: SubcategoryAddModel, category: CategoryModel): Observable<SubcategoryModel> {
    this.addSubcategoryURL =  config.backendUrl + '/subcategory/add/' + category.id;
    return this.http.post<SubcategoryModel>(this.addSubcategoryURL, subcategoryAdd, this.httpHeader);
  }

  public deleteSubcategory(subcategory: SubcategoryModel): Observable<any> {
    this.deleteSubcategoryURL = config.backendUrl + '/subcategory/delete/' + subcategory.id;
    return this.http.delete<any>(this.deleteSubcategoryURL)
      .pipe(catchError(this.handleError));
  }


// TODO
  private handleError(error: HttpErrorResponse) {
    let message: string;
    if (error.error instanceof ErrorEvent) {
      message = 'Błąd połączenia z serwerem';
      console.error('Client error: ' + error.error.message);
    } else {
      console.error('Server error response');
      console.error(error);

      if (error.status === 400 || error.status === 401) {
        message = '';
      } else {
        message = '';
      }
    }
    return throwError(message);
  }
}
