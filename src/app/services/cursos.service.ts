import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { UrlApi} from '../helpers/urlapi'

@Injectable({
  providedIn: 'root'
})
export class CursosService {
  private myAppUrl = UrlApi;
private myApiUrl = '/BackEndApi/api/Curso'

  constructor(private http:HttpClient) {
  }
  getListCursos(): Observable<any> {

    return this.http.get(this.myAppUrl + this.myApiUrl+"/GetListCursos").pipe
    (
      tap((data) => {
      console.log(data)
    })
    );
  }
}
