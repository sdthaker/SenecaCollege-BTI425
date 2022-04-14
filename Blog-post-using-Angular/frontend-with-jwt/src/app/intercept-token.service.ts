import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InterceptTokenService {
  // Initialization

  constructor(private a: AuthService) {}

  // Methods

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Clone the existing request, and add the authorization header
    request = request.clone({
      setHeaders: {
        Authorization: `JWT ${this.a.getToken()}`,
      },
    });
    // Pass the request on to the next handler
    return next.handle(request);
  }
}
