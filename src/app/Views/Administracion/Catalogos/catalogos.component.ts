import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ColumnMenuSettings, GridDataResult } from '@progress/kendo-angular-grid';
import { SortDescriptor, State } from '@progress/kendo-data-query';
import { Observable, map } from 'rxjs';
import { CatPpService } from 'src/app/services/cat-pp.service';
import { LoginService } from 'src/app/services/login.service';
import { PpService } from 'src/app/services/pp.service';
import { Pp } from '../../../models/pp'
import { ExcelService } from 'src/app/services/excel.services';
import { ToastrService } from 'ngx-toastr';
import { pipeline } from 'stream';


@Component({
  selector: 'app-catalogos',
  templateUrl: './catalogos.component.html',
  styleUrls: ['./catalogos.component.css'],
  providers: [DatePipe]
})
export class CatalogosComponent implements OnInit {
  //variables pata setear la fecha
  public myDate = new Intl.DateTimeFormat('mx-Mx',{dateStyle:'short'}).format(new Date());
  public p :number;
  public maskvalue ="";
  public mask:string  = "00/00/00";
  public includeLiterals = true;
  
  //variables para el formulario 
  
  public id :number| undefined;
   public Nombre: string;
   public Responsable: string; 
   public FechaAct:string = this.myDate;
   public ClavePp:string;
   public Eje:string;
   public NombrePp:string;
   public SiglaDp:string;
   public SiglaDpPart:string;
   

   public form: FormGroup;
   public Rol: string;
   
   public thumbnailSrc =
    "https://github.com/cabarronc/dpp/blob/master/src/assets/Images/SitioDpp/rayas.jpg?raw=true";
   public Pps: Array<{ idPp: number; clavePp: string ;eje:string; fechaAct:string; nombrePp:string; nombreResp:string; responsable:string; siglaDp:string; siglaDpPart:string}> = [];

  constructor(private loginServices:LoginService, private _catPpService: CatPpService,private fb: FormBuilder,private toastr: ToastrService,
    private datePipe : DatePipe, private _excelService: ExcelService) {
    
    this.form = this.fb.group({
      NombreResp: ['',Validators.required],
      Responsable:['',Validators.required],
      FechaAct: ['', Validators.required],
      ClavePp: ['', Validators.required],
      Eje: ['', Validators.required],
      NombrePp: ['', Validators.required],
      SiglaDp:['', Validators.required],
      SiglaDpPart:['', Validators.required],
      
    });

   
   }

   download(): void {
    this._catPpService.getListPp().subscribe((response) => {   
      this._excelService.downloadExcel(response);
    });


   }
  ngOnInit(): void {
    this.getUsuario();
    this.obtenerPp()
  }



 getUsuario():void
 {
    this.Nombre = this.loginServices.getTokenDecoded().sub;
    this.Rol= this.loginServices.getTokenDecoded().roles;
    console.log(this.loginServices.getTokenDecoded());

 }
 obtenerPp() {
  this._catPpService.getListPp().pipe(
    map(response => response)
  ).subscribe(
    _data => {
      
      _data = _data?.map(_pp => {
        const {idPp, clavePp,eje, fechaAct, nombrePp, nombreResp, responsable, siglaDp, siglaDpPart } = _pp;
        return {
          idPp: idPp,
          clavePp: clavePp,
          eje: eje,
          fechaAct: fechaAct,
          nombrePp: nombrePp, 
          nombreResp: nombreResp,
          responsable: responsable,
          siglaDp: siglaDp,
          siglaDpPart: siglaDpPart      

        }

      }

      );
     //this._excelService.downloadExcel(_data);
     this.Pps = _data;
      console.log(_data);

    }, error => {
      console.log(error);
    }

  )
}
//-------------------------------------------------------------------------------------------------------------
  //-------------------------------------Metodo para registrar los Nuevos PP---------------------------------
  //-------------------------------------------------------------------------------------------------------------
GuardarPp() {


  const pp: any = {
    NombreResp:this.form.get('NombreResp').value,
    Responsable: this.form.get('Responsable')?.value,
    FechaAct: this.form.get('FechaAct')?.value,
    ClavePp: this.form.get('ClavePp')?.value,
    Eje: this.form.get('Eje')?.value,
    NombrePp: this.form.get('NombrePp')?.value,
    SiglaDp: this.form.get('SiglaDp')?.value,
    SiglaDpPart: this.form.get('SiglaDpPart')?.value,
  }

  if (this.id == undefined) {
    // Agregamos una nuevo crece
    this._catPpService.savePp(pp).subscribe(_data => {
      this.toastr.success('El PP ' + pp.ClavePp +' - '+ pp.NombrePp + ' fue registrado con exito!', 'Crece Registrado');
      this.obtenerPp();
     // this.someInput.nativeElement.expanded = false;
      this.form.reset();
      console.log(this.form.value);
      console.log(pp);
      // if (this.form.valid) {
      //   this.form.value;

      //   console.log("Form Submitted!");
      //   this.form.reset();
      // }

    }, error => {
      this.toastr.error('Error: ' + error.error.substr(-35,35));
      console.log(error);
      console.log(this.form.value);
    })
  }
  else {
    pp.idPp = this.id
    // Editamos usuario
    this._catPpService.updatePp(this.id, pp).subscribe(_data => {

     // this.accion = 'Elaborando';
      this.id = undefined;
      this.toastr.info('El PP ' + pp.ClavePp+' - '+ pp.NombrePp +' fue actualizada con exito!', 'Crece  Actualizado');
      this.obtenerPp();
      this.form.reset();

    }, error => {
      this.toastr.error('Error: ' + error.error.substr(-35,35),'Debe completar el siguiente campo:',{timeOut:10000,});
      this.toastr.error('Error: ' + error.message,'No es posible el envio de informacion:',{timeOut:10000,});
      console.log(error);
    })

  }
}
//-----------------------------------------------------------------------------------------
//-------------------------ELIMINAR PP-------------------------------------------------
//-----------------------------------------------------------------------------------------

eliminarPp(id: number) {
  this._catPpService.deletePp(id).subscribe(_data => {
    this.toastr.error('El PP fue eliminado con exito!', 'eliminado');
    this.obtenerPp();
  }, error => {
    console.log(error);
  })
  
}
editarPp(pp: any) {
  this.id = pp.idPp;
  
  this.form.patchValue({
      NombreResp: pp.nombreResp,
      Responsable:pp.responsable,
      FechaAct: this.FechaAct,
      ClavePp: pp.clavePp,
      Eje: pp.eje,
      NombrePp: pp.nombrePp,
      SiglaDp:pp.siglaDp,
      SiglaDpPart: pp.siglaDpPart,

  });
}



}
