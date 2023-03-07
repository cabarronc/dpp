import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UrlApi} from '../helpers/urlapi'

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http:HttpClient, public jwtHelper:JwtHelperService)
  {
    this.myAppUrl = UrlApi;
    this.myApiUrl = '/BackEndApi/api/Login'

   }
   //login con la base de datos
   login(usuario: any): Observable<any>
   {
     return this.http.post(this.myAppUrl+this.myApiUrl,usuario);

   }
   //Autenticacion
  public IsAuthenticated():boolean{
    const token =localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token)
  }

   //Almacenar el valor de Login
   setLocalStorage(data):  void
   {

      localStorage.setItem('token',data);
   }
  //  //Recuperar el valor del login
  //  getEmailUsuario():string
  //  {
  //     return localStorage.getItem('Nombre')
  //  }
  getTokenDecoded():any
  {
    const helper = new JwtHelperService();

    const decodedToken = helper.decodeToken(localStorage.getItem('token'));

     return decodedToken;

  }

   removeLocalStorage():void
   {
     //window.localStorage.removeItem('token');
     localStorage.removeItem('token');

     //window.sessionStorage.clear();
   }

   //
  //  public isUserAdmin = (loginServices: string): boolean => {
  //   const helper = new JwtHelperService();

  //   const token = localStorage.getItem("token");
  //   const decodedToken2 = this.loginServices.getTokenDecoded().role ;
  //   const role = decodedToken2
  //   return role === 'admin';
  // }
}
