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
import { CatUrService } from 'src/app/services/cat-ur.service';


@Component({
  selector: 'app-catalogos',
  templateUrl: './catalogos.component.html',
  styleUrls: ['./catalogos.component.css'],
  providers: [DatePipe]
})
export class CatalogosComponent implements OnInit {
  //variables pata setear la fecha
  public myDate = new Intl.DateTimeFormat('mx-Mx',{dateStyle:'short'}).format(new Date());
  public myDate2 = new Intl.DateTimeFormat('mx-Mx',{dateStyle:'short'}).format(new Date());
  public p :number;
  public maskvalue ="";
  public mask:string  = "00/00/00";
  public includeLiterals = true;
  
  //variables para el formulario 
  
  public id :number| undefined;
   public Nombre: string;
   public Responsable: string; 
   public FechaAct:string = this.myDate;
   public Registrado:string = this.myDate2;
   public ClavePp:string;
   public Eje:string;
   public NombrePp:string;
   public SiglaDp:string;
   public SiglaDpPart:string;
   public RamoPatron ="^[A-Z]{2}$|^[0-9]{2}$"
   public Ramo="";
   public UR_HistPatron = "^[A-Z]{2}[0-9]{2}$|^[A-Z]{1}[0-9]{3}$|^[0-9]{4,4}$|^N/A$";
   public Ur_historica="";
   public UR_RecodPatron = "^[A-Z]{2}[0-9]{8}$|^[0-9]{10,10}$|^N/A$";
   public Ur_recodificada ="";
   public URD_HistPatron = "^[A-Z]{1}[0-9]{7}$|^[0-9]{8,8}$|^N/A$";
  public Urd_historica ="";
   public URD_RecodPatron = "^[A-Z]{2}[0-9]{8}$|^[0-9]{10,10}$|^N/A$";
   public Urd_recodificada ="";
   public SociedadPatron ="^[A-Z]{4}$|^[A-Z]{3}$|^N/A$";
   public Sociedad="";
   public CeGeSapPatron ="^[0-9]{9}[A-Z]{1}[0-9]{5}$|^N/A$|^[0-9]{5}[A-Z]{2}[0-9]{8}$|^[0-9]{7}[A-Z]{1}[0-9]{7}$"; 
   public CeGeSap = "";
   public form: FormGroup;
   public form2: FormGroup;
   public Rol: string;
   
   public thumbnailSrc =
    "https://github.com/cabarronc/dpp/blob/7eecac06a56301298a6968521884a8c5ad12fd6f/src/assets/Images/SitioDpp/Pp.png?raw=true";
   public Pps: Array<{ idPp: number; clavePp: string ;eje:string; fechaAct:string; nombrePp:string; nombreResp:string; responsable:string; siglaDp:string; siglaDpPart:string}> = [];
   public Urs: Array<{idUr:number, ramo:string, urHistorica:string, urRecodificada:string, urdHistorica:string, urdRecodificada:string, nombre:string, status:string, sociedad:string, ceGeSap:string, nombreSap:string, creadoPor:string, registro:string}> =[];
   //public Ur:Array<{ramo:number; fechaAct:string;}> =[];

  constructor(private loginServices:LoginService, private _catPpService: CatPpService, private _catUrService: CatUrService, private fb: FormBuilder,private toastr: ToastrService,
    private datePipe : DatePipe, private _excelService: ExcelService) {
      this.obtenerUr();
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
    this.form2 = this.fb.group({
      Ramo: [this.Ramo,[Validators.required,Validators.pattern(this.RamoPatron)]],
      Registrado: ['', Validators.required],
      Ur_historica:[this.Ur_historica,[Validators.required,Validators.pattern(this.UR_HistPatron)]],    
      Ur_recodificada: [this.Ur_recodificada,[Validators.required, Validators.pattern(this.UR_RecodPatron)]],
      Urd_historica: [this.Urd_historica, [Validators.required, Validators.pattern(this.URD_HistPatron)]],
      Urd_recodificada: [this.Urd_recodificada, [Validators.required, Validators.pattern(this.URD_RecodPatron)]],
      Nombre_ur:['', Validators.required],
      Estatus:['', Validators.required],
      Sociedad: [this.Sociedad, [Validators.required, Validators.pattern(this.SociedadPatron)]],
      CeGeSap: [this.CeGeSap, [Validators.required, Validators.pattern(this.CeGeSapPatron)]],
      NombreSap: ['', Validators.required],
      CreadoPor: ['', Validators.required],
      
    });

  
   
   }

   download(): void {
    this._catPpService.getListPp().subscribe((response) => {   
      this._excelService.downloadExcel(response);
    });


   }
  ngOnInit(): void {
    this.getUsuario();
    this.obtenerPp();
    this.obtenerUr();
  }



 getUsuario():void
 {
    this.Nombre = this.loginServices.getTokenDecoded().sub;
    this.Rol= this.loginServices.getTokenDecoded().roles;
    console.log(this.loginServices.getTokenDecoded());

 }
 //Mostrar el catalogo de programas presupuestarios
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
//Mostrar el catalogo de Unidades Responsables
obtenerUr() {
  this._catUrService.getListUr().pipe(
    map(response => response)
  ).subscribe(
    _data => {
      
      _data = _data?.map(_ur => {
        const {idUr, ramo, urHistorica, urRecodificada, urdHistorica, urdRecodificada, nombre, status, sociedad, ceGeSap, nombreSap, creadoPor, registro  } = _ur;
        return {
          idUr: idUr,
          ramo: ramo, 
          urHistorica: urHistorica,
          urRecodificada: urRecodificada,
          urdHistorica: urdHistorica,
          urdRecodificada: urdRecodificada,
          nombre: nombre,
          status: status,
          sociedad: sociedad,
          ceGeSap: ceGeSap,
          nombreSap: nombreSap,
          creadoPor: creadoPor,
          registro: registro      

        }

      }

      );
     //this._excelService.downloadExcel(_data);
     this.Urs = _data;
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
      this.toastr.success('El PP ' + pp.ClavePp +' - '+ pp.NombrePp + ' fue registrado con exito!', 'Pp Registrado');
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
      this.toastr.info('El PP ' + pp.ClavePp+' - '+ pp.NombrePp +' fue actualizada con exito!', 'PP Actualizado');
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
//-------------------------------------------------------------------------------------------------------------
  //-------------------------------------Metodo para registrar los Nuevas UR'S---------------------------------
  //-------------------------------------------------------------------------------------------------------------
  GuardarUr() {


    const ur: any = {

      Ramo: this.form2.get('Ramo')?.value,
      Ur_historica: this.form2.get('Ur_historica')?.value,
      Ur_recodificada: this.form2.get('Ur_recodificada')?.value, 
      Urd_historica: this.form2.get('Urd_historica')?.value,
      Urd_recodificada: this.form2.get('Urd_recodificada')?.value,
      Nombre_ur: this.form2.get('Nombre_ur')?.value,
      Estatus: this.form2.get('Estatus')?.value,
      Sociedad: this.form2.get('Sociedad')?.value,
      CeGeSap: this.form2.get('CeGeSap')?.value,
      NombreSap: this.form2.get('CeGeSap')?.value,
      CreadoPor: this.form2.get('CreadoPor')?.value,
      Registrado: this.form2.get('Registrado')?.value,
   
    }
  
    if (this.id == undefined) {
      // Agregamos una nuevo crece
      this._catUrService.saveUr(ur).subscribe(_data => {
        this.toastr.success('El Ramo ' + ur.urRecodificada +' / '+ ur.urdRecodificada + ' fue registrado con exito!', 'UR/URD Registrada');
        this.obtenerUr();
       // this.someInput.nativeElement.expanded = false;
        this.form2.reset();
        console.log(this.form2.value);
        console.log(ur);
        // if (this.form.valid) {
        //   this.form.value;
  
        //   console.log("Form Submitted!");
        //   this.form.reset();
        // }
  
      }, error => {
        
        console.log(error);
        console.log(this.form2.value);
      })
    }
    else {
      ur.idUr = this.id
      // Editamos usuario
      this._catUrService.updateUr(this.id, ur).subscribe(_data => {
  
       // this.accion = 'Elaborando';
        this.id = undefined;
        this.toastr.info('El PP ' + ur.urRecodificada +' / '+ ur.urdRecodificada +' fue actualizada con exito!', 'UR Actualizado');
        this.obtenerUr();
        this.form2.reset();
  
      }, error => {
        this.toastr.error('Error: ' + error.error.substr(-35,35),'Debe completar el siguiente campo:',{timeOut:10000,});
        this.toastr.error('Error: ' + error.message,'No es posible el envio de informacion:',{timeOut:10000,});
        console.log(error);
      })
  
    }
  }
  //-----------------------------------------------------------------------------------------
  //-------------------------ELIMINAR UR-------------------------------------------------
  //-----------------------------------------------------------------------------------------
  
  eliminarUr(id: number) {
    this._catUrService.deleteUr(id).subscribe(_data => {
      this.toastr.error('El PP fue eliminado con exito!', 'eliminado');
      this.obtenerUr();
    }, error => {
      console.log(error);
    })
    
  }
  editarUr(ur: any) {
    this.id = ur.idUr;
    
    this.form2.patchValue({

      Ramo: ur.ramo,
      Ur_historica: ur.urHistorica,
      Ur_recodificada: ur.urRecodificada,
      Urd_historica: ur.urdHistorica,
      Urd_recodificada: ur.urdRecodificada,
      Nombre_ur: ur.nombre_ur,
      Estatus: ur.status,
      Sociedad: ur.sociedad,
      CeGeSap:  ur.ceGeSap,
      NombreSap: ur.nombreSap,
      CreadoPor: ur.creadoPor,
      Registrado: this.FechaAct
      
  
    });
  }
// get Ur_recodificada () {
//   return this.form2.get('Ur_recodificada');
// } 
//
public listStatus: Array<{ text: string; value: string }> = [
  { text: "Activo", value: "1"},
  { text: "Inactivo", value: "0" },
];
public defaultItem: { text: string; value: number } = {
  text: "Seleccione un valor",
  value: null,
};


}
