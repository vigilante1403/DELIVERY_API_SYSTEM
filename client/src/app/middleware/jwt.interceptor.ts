import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ModalService } from '../nav-bar/modal/modal.service';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private jwtHelper:JwtHelperService,
    private identityService:ModalService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let token = localStorage.getItem('access_token');
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      this.identityService.loginStatus.next(true)
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(request)
      console.log('setting new header');
      
      
    }else{
      if(token){
        localStorage.removeItem('access_token');
      }
      this.identityService.loginStatus.next(false)
      this.identityService.Logout()
    }
    return next.handle(request);
  }
}
