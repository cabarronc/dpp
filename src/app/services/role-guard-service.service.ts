import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { LoginService } from './login.service';
import decode from 'jwt-decode';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardServiceService implements CanActivate {

  constructor(public loginService: LoginService, public router: Router,  private toastr: ToastrService) { }
  canActivate(route: ActivatedRouteSnapshot): boolean {

    const expectedRole = route.data;

    const helper = new JwtHelperService();

    const token = helper.decodeToken(localStorage.getItem('token'));


    if (token.roles == "admin")
     {
      return true;
    }
    else(token.roles !== "admin")
    {
    this.toastr.info("Usted no tiene permisos para visualizar este modulo")
    return false;
    }
  }
}
