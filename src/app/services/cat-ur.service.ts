import { Injectable } from '@angular/core';
import { UrlApi } from '../helpers/urlapi';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CatUrService {
  private myAppUrl =  UrlApi;
  private myApiUrl = '/BackEndApi/api/Ur'

  constructor(private http:HttpClient) {}
  getListUr(): Observable<any> {

    return this.http.get(this.myAppUrl + this.myApiUrl+"/GetListUr").pipe
    (
      tap((response) => {
      const  dataExcel:Observable<any> = response
      console.log(dataExcel)
      console.log(response)
      return dataExcel; 
      
    })
    );

    
  }
  deleteUr(id: number): Observable<any> {
    return this.http.delete(this.myAppUrl + this.myApiUrl + "/"+id)
  }
  saveUr(ur: any): Observable<any> {
    return this.http.post(this.myAppUrl + this.myApiUrl, ur,{responseType: 'text'}).pipe(tap((data) => {
      console.log(data)
    }));
  }
  updateUr(id: number, ur: any): Observable<any> {
    return this.http.put(this.myAppUrl + this.myApiUrl +"/" +id, ur,{responseType: 'text'}).pipe(tap((data) => {
      console.log(data)
    }));
  }
}
