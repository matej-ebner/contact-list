import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { retry, catchError } from "rxjs/operators";
import { Router } from "@angular/router";

import { environment } from "src/environments/environment";

import { ErrorService } from "../services/error.service";

export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router, private errorService: ErrorService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
        if (!environment.production) {
          console.log(error);
        }

        // if (error.status != 404) {
         
          
          this.errorService.showError();
        // } 

        console.log('e pa eto');
        console.log(error.status);

        return throwError(error);
      })
    );
  }
}
