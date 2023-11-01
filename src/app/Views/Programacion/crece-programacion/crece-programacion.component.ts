import { Component, OnInit } from '@angular/core';



export interface JsonModel {
  value: string;
}
export interface Fecha {
  value: Date;
}

export interface Grafico{
  avSeccion : number;
  clave: string;
  encabezado: string;
  pp: string;
  seccion:string;
  tipo:string;
}


@Component({
  selector: 'app-crece-programacion',
  templateUrl: './crece-programacion.component.html',
  styleUrls: ['./crece-programacion.component.css']
})
export class CreceProgramacionComponent implements OnInit {

  ngOnInit(): void {
    
  }

  

}
