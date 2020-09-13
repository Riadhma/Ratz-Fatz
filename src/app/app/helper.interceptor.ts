import { Injectable } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpHeaders, HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { CATCH_ERROR_VAR } from '@angular/compiler/src/output/output_ast';
import { map, catchError, finalize } from 'rxjs/operators';



@Injectable()
export class HelperInterceptor implements HttpInterceptor {

  constructor(private Router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {


    const reqwithAuth = req.clone({
      headers: new HttpHeaders({
        // "Access-Control-Allow-Origin": "*",
        "cache-control": "no-cache",

      }),
      withCredentials: true
    });
    return next.handle(reqwithAuth).pipe(
      catchError(this.handleError.bind(this)),
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          //console.log('event--->>>', event);
          if (event.statusText !== 'OK') {
            console.log('ok')
          }

        }
        return event;
      })
    );
  }

  self = this;
  handleError(error: HttpErrorResponse) {
    console.log(error)
    let errorMsg: string = error.error.message;
    if (!errorMsg) {
      errorMsg = "Échec de la connexion";
    }
    if (errorMsg == "Token is not valid") {
      this.Router.navigate(['/login']);
      return throwError(error);
    }
    return throwError(error);

  }
}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: HelperInterceptor, multi: true }
];