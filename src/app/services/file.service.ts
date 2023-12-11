import { Injectable } from '@angular/core';
import { UrlApi } from '../helpers/urlapi';
import { HttpClient } from '@angular/common/http';
import { Observable,tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private myAppUrl =  UrlApi;
  private myApiUrl = '/BackEndApi/api/File'

  constructor(private http:HttpClient) { }
  getListFile():Observable<any>{
    return this.http.get(this.myAppUrl+this.myApiUrl+"/GetListFile").pipe(tap((data) => {
      console.log(data)
    }));     
  }
  deleteFile(id: number): Observable<any> {
    return this.http.delete(this.myAppUrl + this.myApiUrl + "/"+id)
  }
  saveFile(file: any): Observable<any> {
    return this.http.post(this.myAppUrl + this.myApiUrl, file,{responseType: 'text'}).pipe(tap((data) => {
      console.log(data)
    }));
  }
  updateFile(id: number, file: any): Observable<any> {
    return this.http.put(this.myAppUrl + this.myApiUrl +"/" +id, file,{responseType: 'text'}).pipe(tap((data) => {
      console.log(data)
    }));
  }
}
