import { config } from '#config/config';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { CategoryModel} from '#models/category.model';
import {LoginModel} from '#models/login.model';


@Injectable({
  providedIn: 'root'
})

export class CategoriesService {
  private id: number;
  private allCategoriesURL: string;
  private tokenAuthorisationURL: string;
  private httpHeader = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor( private readonly http: HttpClient) {
    this.allCategoriesURL = config.backendUrl + '/subcategory/all/' + '1'  ;
    // this.tokenAuthorisationURL = config.backendUrl + '/auth/verify-token';
  }

  public getAllCategories(): Observable<CategoryModel[]> {
    return this.http.get<CategoryModel[]>(this.allCategoriesURL)
      .pipe(
        catchError(this.handleLoginError)
      );
  }



  // public async verifyToken(token: string): Promise<boolean> {
  //   try {
  //     const result = await this.http.post<boolean>(this.tokenAuthorisationURL + '/' + localStorage.getItem('token'), token)
  //       .toPromise()
  //       .then((res) => res);
  //     return new Promise((res) => res(result));
  //   } catch (error) {
  //     return new Promise((res) => res(false));
  //   }
  // }

  // public logout(): void {
  //   localStorage.removeItem('token');
  //   localStorage.removeItem('user.id');
  // }

  private handleLoginError(error: HttpErrorResponse) {
    let message: string;
    if (error.error instanceof ErrorEvent) {
      message = 'Błąd połączenia z serwerem';
      console.error('Client error: ' + error.error.message);
    } else {
      console.error('Server error response');
      console.error(error);

      if (error.status === 400 || error.status === 401) {
        message = 'Nieprawidłowy login lub hasło';
      } else {
        message = 'Nieznany błąd serwera';
      }
    }
    return throwError(message);
  }
}

