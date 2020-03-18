import { config } from '#config/config';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { CategoryModel} from '#models/category.model';
import {LoginModel} from '#models/login.model';
import {SubcategoryModel} from '#models/subcategory.model';
import {CategoryAddModel} from '#models/categoryAdd.model';


@Injectable({
  providedIn: 'root'
})

export class CategoryService {
  private allCategoriesURL: string;
  private categoryURL: string;
  private addCategoryURL: string;
  private deleteCategoryURL: string;
  private updateCategoryURL: string;
  private tokenAuthorisationURL: string;
  private httpHeader = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor( private readonly http: HttpClient) {
    this.allCategoriesURL = config.backendUrl + '/subcategory/all-by-user/' + localStorage.getItem('user.id');
    this.addCategoryURL = config.backendUrl + '/category/add/' + localStorage.getItem('user.id');
    // this.tokenAuthorisationURL = config.backendUrl + '/auth/verify-token';
  }

  public getAllCategories(): Observable<CategoryModel[]> {
    return this.http.get<CategoryModel[]>(this.allCategoriesURL, this.httpHeader)
      // .pipe(
      //   catchError(this.handleError))
      ;
  }

  public getCategoryInfo(categoryId: number): Observable<CategoryModel[]> {
    this.categoryURL = config.backendUrl + '/subcategory/all-by-category/' + categoryId;
    return this.http.get<CategoryModel[]>(this.categoryURL, this.httpHeader);
  }

  public updateCategory(category: CategoryModel): Observable<CategoryModel> {
    this.updateCategoryURL = config.backendUrl + '/category/update/' + category.id;
    return this.http.post<CategoryModel>(this.updateCategoryURL, category, this.httpHeader);
  }

  public addCategory(categoryDTO: CategoryAddModel): Observable<CategoryModel> {
    return this.http.post<CategoryModel>(this.addCategoryURL, categoryDTO, this.httpHeader);
  }

  public deleteCategory(category: CategoryModel): Observable<any> {
    this.deleteCategoryURL = config.backendUrl + '/category/delete/' + category.id;
    return this.http.delete<any>(this.deleteCategoryURL)
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
