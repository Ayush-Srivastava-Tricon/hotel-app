import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  

  constructor(private authService:AuthService) {}
  

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.authService.isLoggedIn() && this.authService.getAccessToken()){
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + this.authService.getAccessToken()
        }
      });
    }
    else if(this.authService.isLoggedIn() && this.authService.getRefreshToken()){
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + this.authService.getRefreshToken()
        }
      });
    }
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 403) {                    //If token expired
          return this.handleTokenRefresh(request, next);
        }
        return throwError(error);
      })
    );;
  }

  private handleTokenRefresh(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.authService.generateRefreshToken(this.authService.roleId,this.authService.userId).pipe(
      switchMap((newAccessToken: any) => {
        const newRequest = request.clone({
          setHeaders: {
            Authorization: `Bearer ${newAccessToken.Bearer}`
          }
        });
        return next.handle(newRequest);
      }),
      catchError((error) => {
        return throwError(error);
      })
    );
  }
}
