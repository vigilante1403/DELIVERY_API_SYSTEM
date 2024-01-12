import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot,Router, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  constructor(private router:Router,private jwtHelper:JwtHelperService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = localStorage.getItem('access_token');
    if(token&&!this.jwtHelper.isTokenExpired(token)){
      const decodedToken = this.jwtHelper.decodeToken(token);
      console.log(decodedToken?.aud)
      return true
    }
      
      this.router.navigateByUrl('/');
      return false;
  }
  
}
