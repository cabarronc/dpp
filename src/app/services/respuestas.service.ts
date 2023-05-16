import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RespuestasService {

  constructor(public angularFirebase : AngularFireDatabase) { }
  public getRespuestas(): Observable<any>{
    return this.angularFirebase.list("Respuestas").valueChanges();
  }
}
