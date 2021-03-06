import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, of } from 'rxjs';
import {
  DataResult,
  orderBy,
  process,
  SortDescriptor
} from "@progress/kendo-data-query";
import { GridDataResult } from '@progress/kendo-angular-grid';
import { UrlApi} from '../helpers/urlapi'

@Injectable({
  providedIn: 'root'
})
export class InscripcionesService {

  private myAppUrl = UrlApi;
private myApiUrl = '/BackEndApi/api/Inscripcion/Registrar';
private myApiUrlGet = '/BackEndApi/api/Inscripcion'


  constructor(private http: HttpClient) { }

  saveInscripcion(inscripcion: any): Observable<any> {
    return this.http.post(this.myAppUrl + this.myApiUrl, inscripcion);
  }


  GetListInscripcion():Observable<any>{

    return this.http.get(this.myAppUrl + this.myApiUrlGet+"/GetListInscripciones").pipe
    (
      tap((data) => {
      console.log(data)
    })
    );

  }

}
