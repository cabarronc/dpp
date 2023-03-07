import { Injectable } from '@angular/core';
import {LoginService} from '../../services/login.service';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  /**
   *
   */
  constructor(private cookieService:CookieService, private router: Router,private loginService: LoginService,) {
}
redirect(flag: boolean):any{
  if (!flag){
    this.router.navigate(['/','login2'])

  }
}
  // canActivate(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   const cookie = this.cookieService.check('token_access');
  //   //const token = this.loginService.setLocalStorage('token');
  //   this.redirect(cookie);
  //   return cookie;
  // }
  canActivate():boolean{
    if (!this.loginService.IsAuthenticated())
    {
      this.router.navigate(['login2']);
      return false;
    }
    return true;

  }

}
