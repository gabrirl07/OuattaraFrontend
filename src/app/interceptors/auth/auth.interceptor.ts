import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {AuthenticationService} from "../../services/auth/authentication.service";
import {catchError} from "rxjs/operators";
import {Router} from "@angular/router";
import {NotificationService} from "../../services/notification/notification.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthenticationService, private router: Router, private notificationService: NotificationService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    request = request.clone({
      headers: request.headers.set('Accept', 'application/json'),
    });

    if (this.authService.isAuth()) {
      request = request.clone({
        headers: request.headers.set('Authorization', 'Bearer ' + this.authService.getToken()),
      });
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          localStorage.clear();
          this.notificationService.error('Session expirée, reconnectez-vous svp !');
          this.router.navigate(['login']);
        }
        return throwError(error);
      })
    );
  }
}
