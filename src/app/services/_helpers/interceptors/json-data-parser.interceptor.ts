import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export class JsonDataParserInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const newBody = request.body;
    this.convertBodyToBackend(newBody);
    request.clone({
      body: newBody
    });

    return next.handle(request).pipe(
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          this.convertBodyFromBackend(event.body);
        }
      }),
    );
  }

  private convertBodyFromBackend(body: any): void {
    if (body === null || body === undefined) {
      return body;
    }

    if (typeof body !== 'object') {
      return body;
    }

    for (const key of Object.keys(body)) {
      let value = body[key];
      if (this.isIso8601(value)) {
        body[key] = new Date(value);
      } else if (key === 'value') {
        value = parseFloat(value.toFixed(2));
        body[key] = value / 100;
      } else if (typeof value === 'object') {
        this.convertBodyFromBackend(value);
      }
    }
  }

  private convertBodyToBackend(body: any): void {
    if (body === null || body === undefined) {
      return body;
    }

    if (typeof body !== 'object') {
      return body;
    }

    for (const key of Object.keys(body)) {
      const value = body[key];
      if (key === 'value') {
        body[key] = value * 100;
      } else if (typeof value === 'object') {
        this.convertBodyToBackend(value);
      }
    }
  }

  private isIso8601(value: any): boolean {
    if (value === null || value === undefined) {
      return false;
    }
    const iso8601 = /^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(\.\d+)?(([+-]\d\d:\d\d)|Z)?$/;

    return iso8601.test(value);
  }
}
