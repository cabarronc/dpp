import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { UrlApi} from '../helpers/urlapi'
import { IPp } from '../models/interface';


@Injectable({
  providedIn: 'root'
})
export class CatPpService {
  private myAppUrl =  UrlApi;
  private myApiUrl = '/BackEndApi/api/Pp'

  constructor(private http:HttpClient) { }
  getListPp(): Observable<any> {

    return this.http.get(this.myAppUrl + this.myApiUrl+"/GetListPp").pipe
    (
      tap((response) => {
      const  dataExcel:Observable<any> = response
      console.log(dataExcel)
      console.log(response)
      return dataExcel; 
      
    })
    );

    
  }
  deletePp(id: number): Observable<any> {
    return this.http.delete(this.myAppUrl + this.myApiUrl + "/"+id)
  }
  savePp(pp: any): Observable<any> {
    return this.http.post(this.myAppUrl + this.myApiUrl, pp,{responseType: 'text'}).pipe(tap((data) => {
      console.log(data)
    }));
  }
  updatePp(id: number, pp: any): Observable<any> {
    return this.http.put(this.myAppUrl + this.myApiUrl +"/" +id, pp,{responseType: 'text'}).pipe(tap((data) => {
      console.log(data)
    }));
  }
}
