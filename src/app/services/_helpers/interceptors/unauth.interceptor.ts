import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthorisationService } from '#services/auth-service/authorisation.service';
import {Router} from '@angular/router';

@Injectable()
export class UnauthorisedInterceptor implements HttpInterceptor {
  constructor(
    private authorisationService: AuthorisationService,
    private router: Router
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      if (err.status === 401) {
        this.authorisationService.logout();
        this.router.navigateByUrl('/');
      }

      const error = err.error.message || err.statusText;
      return throwError(error);
    }));
  }
}
