import { Observable, from, throwError, BehaviorSubject } from 'rxjs';
import { catchError, filter, take, switchMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  dupReq: HttpRequest<any>;

  constructor(private auth: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let token = 'Bearer ' + localStorage.getItem('token');

    if (req.headers.get('Authorization') === 'Basic YW5ndWxhcjpAbmd1bEByMA==') {
      return next.handle(
        req.clone({
          headers: req.headers.set(
            'Content-Type',
            'application/x-www-form-urlencoded'
          ),
        })
      );
    }

    let dupReq = req.clone({
      headers: req.headers.set('Authorization', `${token}`),
    });
    return next.handle(dupReq).pipe(
      catchError((error) => {
        if (this.auth.isAccessTokenInvalido()) {
          return from(this.auth.obterNovoAccessToken()).pipe(
            switchMap(() => {
              console.log('Obtendo novo access token');
              token = 'Bearer ' + localStorage.getItem('token');

              dupReq = dupReq.clone({
                headers: req.headers.set('Authorization', `${token}`),
              });
              return next.handle(dupReq);
            })
          );
        } else {
          return throwError(error);
        }
      })
    );
  }
}

/*   console.log('Obtendo novo access token');
            token = 'Bearer ' + localStorage.getItem('token');

            dupReq = dupReq.clone({
              headers: req.headers.set('Authorization', `${token}`),
            });
            console.log('Chegou aqui');
            return next.handle(dupReq);*/
