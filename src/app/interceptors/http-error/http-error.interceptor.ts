import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {catchError, retry} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import {HANDLE_ERROR_TYPE, HandleErrorInfo} from '../../models/interfaces/global';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request)

        .pipe(

            retry(1),

            catchError((error: HttpErrorResponse) => {

              let errorMessage: HandleErrorInfo;

              if (error.error instanceof ErrorEvent) {

                // client-side error

                errorMessage = {
                  type: HANDLE_ERROR_TYPE.WARNING,
                  console: `Error: ${error.error.message}`,
                  popup: 'An error has occurred, check your connection and please try again!'
                };

              } else {

                // server-side error

                errorMessage = {
                  type: HANDLE_ERROR_TYPE.ERROR,
                  console: `Error Code: ${error.status}\nMessage: ${error.message}`,
                  popup: ''
                };

              }

              return throwError(errorMessage);
            })

        )

  }
}
