import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ColumnMenuSettings, GridDataResult } from '@progress/kendo-angular-grid';
import { SortDescriptor, State } from '@progress/kendo-data-query';
import { Observable, map } from 'rxjs';
import { CatPpService } from 'src/app/services/cat-pp.service';
import { LoginService } from 'src/app/services/login.service';
import { ExcelService } from 'src/app/services/excel.services';
import { ToastrService } from 'ngx-toastr';
import { pipeline } from 'stream';
import { CatUrService } from 'src/app/services/cat-ur.service';
import { DependenciasService } from 'src/app/services/dependencias.service';
import { text } from 'd3';


@Component({
  selector: 'app-catalogos',
  templateUrl: './catalogos.component.html',
  styleUrls: ['./catalogos.component.css'],
  providers: [DatePipe]
})
export class CatalogosComponent implements OnInit {
  //variables pata setear la fecha
  //public myDate = new Intl.DateTimeFormat('mx-Mx', { dateStyle: 'short' }).format(new Date());  
  public myDate = new Intl.DateTimeFormat('mx-Mx',{ month:'2-digit', day:'2-digit', year:'2-digit', timeZone:'UTC' }).format(new Date());
  public myDate2 = new Intl.DateTimeFormat('mx-Mx', { month:'2-digit', day:'2-digit', year:'2-digit', timeZone:'UTC' }).format(new Date());
  public p: number;
  public p2: number;
  public maskvalue = "";
  public mask: string = "00/00/00";
  public includeLiterals = true;

  //variables para los formularios 
 //PP
  public id: number | undefined;
  public idUr: number | undefined;
  public Nombre: string;
  public Responsable: string;
  public FechaAct: string = this.myDate;
  public Registrado: string = this.myDate2; 
  //URS
  public RamoPatron:string = "^[A-Z]{2}$|^[0-9]{2}$";
  public Ramo: string ="";
  public UR_HistPatron: string = "^[A-Z]{2}[0-9]{2}$|^[A-Z]{1}[0-9]{3}$|^[0-9]{4,4}$|^N/A$";
  public UrHistorica: string="";
  public UR_RecodPatron: string = "^[A-Z]{2}[0-9]{8}$|^[0-9]{10,10}$|^N/A$";
  public UrRecodificada: string = '';
  public URD_HistPatron: string = "^[A-Z]{1}[0-9]{7}$|^[0-9]{8,8}$|^N/A$";
  public UrdHistorica: string = '';
  public URD_RecodPatron: string = "^[A-Z]{2}[0-9]{8}$|^[0-9]{10,10}$|^N/A$";
  public UrdRecodificada: string = '';
  public SociedadPatron: string = "^[A-Z]{4}$|^[A-Z]{3}$|^N/A$";
  public Sociedad: string = '';
  public CeGeSapPatron: string = "^[0-9]{9}[A-Z]{1}[0-9]{5}$|^N/A$|^[0-9]{5}[A-Z]{2}[0-9]{8}$|^[0-9]{7}[A-Z]{1}[0-9]{7}$";
  public CeGeSap: string = '';
  public form: FormGroup;
  public form2: FormGroup;
  public form3: FormGroup;
  public Rol: string;
  //INDICADORES
  public Ejercicio:string = new Intl.DateTimeFormat('mx-Mx',{ year:'numeric', timeZone:'UTC' }).format(new Date());
  public ClvConac:string = "";
  public NomConac:string = "";
  public Dependencia:string = "";
  public UR:string = "";
  public Nivel:string = "";
  public Clave:string = "";
  public Resumen:string = ""; 
  public IdIndicador:string = "";
  public ClvIndicador:string = "";
  public NombreIndicador:string ="";
  public Dimension:string = "";
  public Orientacion:string = "";
  public Definicion:string = "";
  public Algoritmo:string = "";
  public Umi:string = "";//Unidad de Medida del Indicador
  public FrecuenciaMedicion:string = "";
  public LineaBase:string = "";
  public VariableALineaBase:any;
  public VariableBLineaBase:any; 
  public ValorLineaBase:any;
  public SentidoIndicador:string = "";
  public FechaDisponibilidad:string = "";
  public MetaAnual2024:any;
  public UmVariableA:string = "";
  public ValorVariableA2024:any;
  public UmVariableB:string = "";
  public ValorVariableB2024:any;






  //Imagenes URL
  public PpImagen ="https://github.com/cabarronc/dpp/blob/master/dist/dpp/assets/Images/SitioDpp/Pp.png?raw=true";
  public UrImagen = "https://github.com/cabarronc/dpp/blob/master/dist/dpp/assets/Images/SitioDpp/UR.png?raw=true";
  public IndImagen = "https://github.com/cabarronc/dpp/blob/master/dist/dpp/assets/Images/SitioDpp/Indicadores.png?raw=true";
  //Arrays para guardar los modelos
  public Pps: Array<{ idPp: number; clavePp: string; eje: string; fechaAct: string; nombrePp: string; nombreResp: string; responsable: string; siglaDp: string; siglaDpPart: string }> = [];
  public Urs: Array<{ idUr: number, ramo: string, urHistorica: string, urRecodificada: string, urdHistorica: string, urdRecodificada: string, nombre: string, status: string, sociedad: string, ceGeSap: string, nombreSap: string, creadoPor: string, registrado: string }> = [];
  public Indicadores: Array<{idIndicador:number, ejercicio:string, clvConac:string, nomConac:string, dependencia:string, ur:string, nivel:string, clave:string, resumen:string, idIndicadorSed:string, clvIndicador:string, nombreIndicador:string, dimension:string, orientacion:string, definicion:string, algoritmo:string, umi:string, frecuenciaMedicion:string, lineaBase:string, variableALineaBase:any, variableBLineaBase:any, valorLineaBase:any, sentidoIndicador:string, fechaDisponibilidad:string, metaAnual2024:string, umVariableA:string, valorVariableA2024:any, umVariableB:string, valorVariableB2024:any  }> = []
  public listDep: Array<{ text: string; value: number }> = [];
  public ProgramaPresupuestario: Array<{ value: number; text: string }> = [];

  constructor(private loginServices: LoginService, private _catPpService: CatPpService, private _catUrService: CatUrService, private fb: FormBuilder, private toastr: ToastrService,
    private datePipe: DatePipe, private _excelService: ExcelService, private _depService: DependenciasService) {
    this.obtenerUr();
    //Formulario Programas Presupuestarios
    this.form = this.fb.group({
      NombreResp: ['', Validators.required],
      Responsable: ['', Validators.required],
      FechaAct: ['', Validators.required],
      ClavePp: ['', Validators.required],
      Eje: ['', Validators.required],
      NombrePp: ['', Validators.required],
      SiglaDp: ['', Validators.required],
      SiglaDpPart: ['', Validators.required],

    });
    //Formulario de URS
    this.form2 = this.fb.group({
      Ramo: [this.Ramo, [Validators.required, Validators.pattern(this.RamoPatron)]],
      Registrado: ['', Validators.required],
      UrHistorica: [this.UrHistorica, [Validators.required, Validators.pattern(this.UR_HistPatron)]],
      UrRecodificada: [this.UrRecodificada, [Validators.required, Validators.pattern(this.UR_RecodPatron)]],
      UrdHistorica: [this.UrdHistorica, [Validators.required, Validators.pattern(this.URD_HistPatron)]],
      UrdRecodificada: [this.UrdRecodificada, [Validators.required, Validators.pattern(this.URD_RecodPatron)]],
      Nombre: ['', Validators.required],
      Status: ['', Validators.required],
      Sociedad: [this.Sociedad, [Validators.required, Validators.pattern(this.SociedadPatron)]],
      CeGeSap: [this.CeGeSap, [Validators.required, Validators.pattern(this.CeGeSapPatron)]],
      NombreSap: ['', Validators.required],
      CreadoPor: ['', Validators.required],

    });
    //Formulario de Indicadores
    this.form3 =this.fb.group({
   Ejercicio:[this.Ejercicio, Validators.required],
   ClvConac:[this.ClvConac, Validators.required],
   NomConac:[this.NomConac, Validators.required],
   Dependencia:[this.Dependencia, Validators.required],
   UR:[this.UR, Validators.required],
   Nivel:[this.Nivel, Validators.required],
   Clave:[this.Clave, Validators.required],
   Resumen:[this.Resumen, Validators.required],
   IdIndicador:[this.IdIndicador, Validators.required],
   ClvIndicador:[this.ClvIndicador, Validators.required],
   NombreIndicador:[this.NombreIndicador, Validators.required],
   Dimension:[this.Dimension, Validators.required],
   Orientacion:[this.Orientacion, Validators.required],
   Definicion:[this.Definicion, Validators.required],
   Algoritmo:[this.Algoritmo, Validators.required],
   Umi:[this.Umi, Validators.required], //Unidad de Medida del Indicador
   FrecuenciaMedicion:[this.FrecuenciaMedicion, Validators.required],
   LineaBase:[this.LineaBase, Validators.required],
   VariableALineaBase:[this.VariableALineaBase, Validators.required],
   VariableBLineaBase:[this.VariableBLineaBase, Validators.required], 
   ValorLineaBase:[this.ValorLineaBase, Validators.required],
   SentidoIndicador:[this.SentidoIndicador, Validators.required],
   FechaDisponibilidad:[this.FechaDisponibilidad, Validators.required],   
   MetaAnual2024:[this.MetaAnual2024, Validators.required],
   UmVariableA:[this.UmVariableA, Validators.required],
   ValorVariableA2024:[this.ValorVariableA2024, Validators.required],
   UmVariableB:[this.UmVariableB, Validators.required],
   ValorVariableB2024:[this.ValorVariableB2024]

    });

  }

  download(): void {
    this._catPpService.getListPp().subscribe((response) => {
      this._excelService.downloadExcel(response);
    });
  }
  downloadUr(): void {
    this._catUrService.getListUr().subscribe((response) => {
      this._excelService.downloadExcelUr(response);
    });
  }
  ngOnInit(): void {
    this.getUsuario();
    this.obtenerPp();
    this.obtenerUr();
    this.obtenerDependencias();
    this.obtenerClvConac();
  }


         //---------------OBTENER DEPENDENCIAS--------------------
  obtenerDependencias() {
    this._depService.GetListDep().pipe(
      map(response => response)
    ).subscribe(_data => {
      _data = _data.map(_dep => {
        const { idDependencia, siglaDependencia } = _dep;
        return {
          text: siglaDependencia,
          value: idDependencia

        }
      }
      );
      this.listDep = _data;
      console.log(_data);
    },
      error => {
        console.log(error);
      })
  }
 //---------------OBTENER USUARIOS--------------------
  getUsuario(): void {
    this.Nombre = this.loginServices.getTokenDecoded().sub;
    this.Rol = this.loginServices.getTokenDecoded().roles;
    console.log(this.loginServices.getTokenDecoded());

  }
  //Mostrar el catalogo de programas presupuestarios
  obtenerPp() {
    this._catPpService.getListPp().pipe(
      map(response => response)
    ).subscribe(
      _data => {

        _data = _data?.map(_pp => {
          const { idPp, clavePp, eje, fechaAct, nombrePp, nombreResp, responsable, siglaDp, siglaDpPart } = _pp;
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
          const { idUr, ramo, urHistorica, urRecodificada, urdHistorica, urdRecodificada, nombre, status, sociedad, ceGeSap, nombreSap, creadoPor, registrado } = _ur;
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
            registrado: registrado

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
  //  ---------------OBTENER Clave CONAC---------------
  obtenerClvConac() {
    this._catPpService.getListPp().pipe(
      map(response => response)
    ).subscribe(
      _data => {
        _data = _data?.map(_pp => {
          const { idPp, clavePp } = _pp;
          return {
            value: idPp,
            text: clavePp
          }

        }

        );
        this.ProgramaPresupuestario = _data;
        console.log(_data);

      }, error => {
        console.log(error);
      }

    )
    this._catPpService.getListPp().pipe(
      map(response => response)
    ).subscribe(
      _data2 => {
        
        _data2 = _data2?.map(_pp => {
          const {idPp,  clavePp, nombrePp } = _pp;
          return {
            idPp: idPp,
            clavePp: clavePp,
            nombrePp: nombrePp, 
               
  
          }
  
        }
  
        );
       
       //this._excelService.downloadExcel(_data);
       this.NomConac = _data2.nombrePp;
        console.log(_data2.nombrePp);
  
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
      NombreResp: this.form.get('NombreResp').value,
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
        this.toastr.success('El PP ' + pp.ClavePp + ' - ' + pp.NombrePp + ' fue registrado con exito!', 'Pp Registrado');
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
        this.toastr.error('Error: ' + error.error.substr(-35, 35), 'Debe completar el siguiente campo:', { timeOut: 10000, });
        this.toastr.error('Error: ' + error.message, 'No es posible el envio de informacion:', { timeOut: 10000, });

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
        this.toastr.info('El PP ' + pp.ClavePp + ' - ' + pp.NombrePp + ' fue actualizada con exito!', 'PP Actualizado');
        this.obtenerPp();
        this.form.reset();

      }, error => {
        this.toastr.error('Error: ' + error.error.substr(-35, 35), 'Debe completar el siguiente campo:', { timeOut: 10000, });
        this.toastr.error('Error: ' + error.message, 'No es posible el envio de informacion:', { timeOut: 10000, });
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
      Responsable: pp.responsable,
      FechaAct: this.FechaAct,
      ClavePp: pp.clavePp,
      Eje: pp.eje,
      NombrePp: pp.nombrePp,
      SiglaDp: pp.siglaDp,
      SiglaDpPart: pp.siglaDpPart,

    });
  }
  //-------------------------------------------------------------------------------------------------------------
  //-------------------------------------Metodo para registrar los Nuevas UR'S---------------------------------
  //-------------------------------------------------------------------------------------------------------------
  GuardarUr() {


    const ur: any = {

      Ramo: this.form2.get('Ramo')?.value,
      UrHistorica: this.form2.get('UrHistorica')?.value,
      UrRecodificada: this.form2.get('UrRecodificada')?.value,
      UrdHistorica: this.form2.get('UrdHistorica')?.value,
      UrdRecodificada: this.form2.get('UrdRecodificada')?.value,
      Nombre: this.form2.get('Nombre')?.value,
      Status: this.form2.get('Status')?.value,
      Sociedad: this.form2.get('Sociedad')?.value,
      CeGeSap: this.form2.get('CeGeSap')?.value,
      NombreSap: this.form2.get('NombreSap')?.value,
      CreadoPor: this.form2.get('CreadoPor')?.value,
      Registrado: this.form2.get('Registrado')?.value,

    }

    if (this.idUr == undefined) {
      // Agregamos una nuevo crece
      this._catUrService.saveUr(ur).subscribe(_data => {
        this.toastr.success(' fue registrado con exito!', 'UR/URD Registrada');
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
        this.toastr.error('Error: ' + error.error.substr(-35, 35), 'Debe completar el siguiente campo:', { timeOut: 10000, });
        this.toastr.error('Error: ' + error.message, 'No es posible el envio de informacion:', { timeOut: 10000, });
        console.log(error);
        console.log(this.form2.value);
      })
    }
    else {
      ur.idUr = this.idUr
      // Editamos usuario
      this._catUrService.updateUr(this.idUr, ur).subscribe(_data => {

        // this.accion = 'Elaborando';
        this.idUr = undefined;
        this.toastr.info('La Ur fue actualizada con exito!', 'UR/URD Actualizado');
        this.obtenerUr();
        this.form2.reset();

      }, error => {
        this.toastr.error('Error: ' + error.error.substr(-35, 35), 'Debe completar el siguiente campo:', { timeOut: 10000, });
        this.toastr.error('Error: ' + error.message, 'No es posible el envio de informacion:', { timeOut: 10000, });
        console.log(error);
      })

    }
  }
  //-----------------------------------------------------------------------------------------
  //-------------------------ELIMINAR UR-------------------------------------------------
  //-----------------------------------------------------------------------------------------

  eliminarUr(id: number) {
    this._catUrService.deleteUr(id).subscribe(_data => {
      this.toastr.error('La UR/URD fue eliminado con exito!', 'eliminado');
      this.obtenerUr();
    }, error => {
      console.log(error);
    })

  }
  editarUr(ur: any) {
    this.idUr = ur.idUr;

    this.form2.patchValue({

      Ramo: ur.ramo,
      UrHistorica: ur.urHistorica,
      UrRecodificada: ur.urRecodificada,
      UrdHistorica: ur.urdHistorica,
      UrdRecodificada: ur.urdRecodificada,
      Nombre: ur.nombre,
      Status: ur.status,
      Sociedad: ur.sociedad,
      CeGeSap: ur.ceGeSap,
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
    { text: "Activo", value: "1" },
    { text: "Inactivo", value: "0" },
  ];
  public defaultItem: { text: string; value: number } = {
    text: "Seleccione un valor",
    value: null,
  };
 //-------------------------------------------------------------------------------------------------------------
  //-------------------------------------Metodo para registrar los Nuevas UR'S---------------------------------
  //-------------------------------------------------------------------------------------------------------------
  GuardarIndicadores() {
  }

  GetNombrePp() {
    if (this.ClvConac == "E001") {
      this.NomConac = "Acceso a la información pública del Estado de Guanajuato";
      this.Dependencia = "IACIP";
    }
    else if (this.ClvConac == "E002") {
      this.NomConac = "Sistema Integral de Transparencia, Acceso a la Información Pública y Archivos";
       "UTAPE";
      this.Dependencia = "UTAPE";
    }
    else if (this.ClvConac == "E003") {
      this.NomConac = "Actividades artísticas y culturales";
       "IEC, MIQ, FORUM";
      this.Dependencia = "IEC";
    }
    else if (this.ClvConac == "E004") {
      this.NomConac = "Adaptación al cambio climático";
      "SMAOT";
      this.Dependencia = "SMAOT";
    }
    else if (this.ClvConac == "E005") {
      this.NomConac = "Promoción de la convivencia escolar pacífica";
      "SEG";
      this.Dependencia = "SEG";
    }
    else if (this.ClvConac == "E006") {
      this.NomConac = "Atención ciudadana";
       "Ofi. Sec. Part., GTOMX";
      this.Dependencia = "Ofi. Sec. Part.";
    }
    else if (this.ClvConac == "E007") {
      this.NomConac = "Atención integral a las personas con discapacidad";
      "INGUDIS";
      this.Dependencia = "INGUDIS";
    }
    else if (this.ClvConac == "E008") {
      this.NomConac = "Atención integral a niñas, niños y adolescentes";
       "SG, DIF, PEPNNA";
      this.Dependencia = "SG";
    }
    else if (this.ClvConac == "E009") {
      this.NomConac = "Atención integral para adultos mayores";
      "DIF";
      this.Dependencia = "DIF";
    }
    else if (this.ClvConac == "E010") {
      this.NomConac = "Reconstrucción del tejido social";
       "SDSH, DIF";
      "SDSH";
    }
    else if (this.ClvConac == "E012") {
      this.NomConac = "Atención Médica";
       "ISAPEG";
      this.Dependencia = "ISAPEG";
    }
    else if (this.ClvConac == "E014") {
      this.NomConac = "Certeza jurídica en los procesos conciliatorios de los conflictos derivados del acto médico";
       "CECAMED";
      this.Dependencia = "CECAMED";
    }
    else if (this.ClvConac == "E015") {
      this.NomConac = "Certeza jurídica para la población guanajuatense";
       "SG, DIF";
      this.Dependencia = "SG";
    }
    else if (this.ClvConac == "E016") {
      this.NomConac = "Certeza jurídica y derechos de los adultos y adolescentes internos";
       "SSP";
      this.Dependencia = "SSP";
    }
    else if (this.ClvConac == "E017") {
      this.NomConac = "Cobertura de Educación Media Superior y Superior";
       "SEG,CECYTEG, UVEG, ITESG, UPGTO, UPB, UTNG, SABES, UPJR, ITSUR, UTSMA, UPPE, EPRR, ITESI, UTL, ITESP, CONALEP, ITESS, UTSOE, UTS, ITESA, UTLB";
      this.Dependencia = "SEG";
    }
    else if (this.ClvConac == "E018") {
      this.NomConac = "Cobertura en Educación Básica";
      "SEG";
      this.Dependencia = "SEG";
    }
    else if (this.ClvConac == "E020") {
      this.NomConac = "Comercialización internacional";
      "COFOCE";
      this.Dependencia = "COFOCE";
    }
    else if (this.ClvConac == "E021") {
      this.NomConac = "Conectividad digital";
       "SICOM";
      this.Dependencia = "SICOM";
    }
    else if (this.ClvConac == "E022") {
      this.NomConac = "Confianza en el Instituto Electoral del Estado de Guanajuato";
       "IEEG";
      this.Dependencia = "IEEG";
    }
    else if (this.ClvConac == "E024") {
      this.NomConac = "Alianza a favor de la educación para adultos";
       "INAEBA, SEG";
      this.Dependencia = "INAEBA";
    }
    else if (this.ClvConac == "E026") {
      this.NomConac = "Empresa Limpia";
       "PAOT";
      this.Dependencia = "PAOT";
    }
    else if (this.ClvConac == "E027") {
      this.NomConac = "Derrama económica por turismo";
      "SECTUR";
      this.Dependencia = "SECTUR";
    }
    else if (this.ClvConac == "E028") {
      this.NomConac = "Desarrollo y atención integral de las juventudes";
      "JUVENTUDES GTO";
      this.Dependencia = "JUVENTUDES GTO";
    }
    else if (this.ClvConac == "E030") {
      this.NomConac = "Efectividad del sector de procuración de justicia";
      "FGEG, SEG";
      this.Dependencia = "FGEG";
    }
    else if (this.ClvConac == "E031") {
      this.NomConac = "Eficacia en la operatividad policial";
      "SSP, CECCEG, INFOSPE";
      this.Dependencia = "SSP";
    }
    else if (this.ClvConac == "E032") {
      this.NomConac = "Eficiencia de la justicia laboral";
      "SG, CCL";
      this.Dependencia = "SG";
    }
    else if (this.ClvConac == "E035") {
      this.NomConac = "Extensión del conocimiento, arte y cultura";
       "UG";
      this.Dependencia = "UG";
    }
    else if (this.ClvConac == "E036") {
      this.NomConac = "Divulgación de la ciencia y la tecnología";
       "IDEA GTO, SEG, UVEG, UTL";
      this.Dependencia = "IDEA GTO";
    }
    else if (this.ClvConac == "E037") {
      this.NomConac = "Fortalecimiento de la gobernabilidad en el Estado";
       "SG";
      this.Dependencia = "SG";
    }
    else if (this.ClvConac == "E038") {
      this.NomConac = "Competencias para el trabajo";
       "SEG, ITESP, UTNG, UTL, ITESI, SABES, ITSUR, UTSOE, CONALEP, EPRR, UPGTO, ITESG, ITESS, UPPE, UPJR, UPB, UTSMA, UTS, CECYTEG, UVEG, UTLB";
      this.Dependencia = "SEG";
    }
    else if (this.ClvConac == "E039") {
      this.NomConac = "Sustentabilidad energética";
       "IDEA GTO";
      this.Dependencia = "IDEA GTO";
    }
    else if (this.ClvConac == "E040") {
      this.NomConac = "Investigación, desarrollo tecnológico e innovación de la Universidad de Guanajuato";
       "UG";
      this.Dependencia = "UG";
    }
    else if (this.ClvConac == "E041") {
      this.NomConac = "Justicia ambiental";
       "PAOT";
      this.Dependencia = "PAOT";
    }
    else if (this.ClvConac == "E042") {
      this.NomConac = "Mitigación de emisiones de gas efecto invernadero";
       "SMAOT";
      this.Dependencia = "SMAOT";
    }
    else if (this.ClvConac == "E044") {
      this.NomConac = "Participación de la sociedad en la prevención de delitos";
       "SSP";
      this.Dependencia = "SSP";
    }
    else if (this.ClvConac == "E045") {
      this.NomConac = "Acceso equitativo y oportunidades de desarrollo para mujeres y hombres";
       "IMUG";
      this.Dependencia = "IMUG";
    }
    else if (this.ClvConac == "E046") {
      this.NomConac = "Poder Legislativo";
       "P. Legislativo";
      this.Dependencia = "P. Legislativo";
    }
    else if (this.ClvConac == "E047") {
      this.NomConac = "Práctica competitiva y deportiva";
      "CODE";
      this.Dependencia = "CODE";
    }
    else if (this.ClvConac == "E049") {
      this.NomConac = "Procuraduría de los Derechos Humanos";
       "PDH";
      this.Dependencia = "PDH";
    }
    else if (this.ClvConac == "E050") {
      this.NomConac = "Prevención y atención oportuna de emergencias y desastres";
       "SSP";
      this.Dependencia = "SSP";
    }
    else if (this.ClvConac == "E051") {
      this.NomConac = "Gestión integral de recursos hídricos";
       "CEAG";
      this.Dependencia = "CEAG";
    }
    else if (this.ClvConac == "E053") {
      this.NomConac = "Regularización de la tenencia de la tierra";
      "SG";
      this.Dependencia = "SG";
    }
    else if (this.ClvConac == "E054") {
      this.NomConac = "Rehabilitación de niños y adolescentes en conflicto";
      "DIF";
      this.Dependencia = "DIF";
    }
    else if (this.ClvConac == "E056") {
      this.NomConac = "Servicio de impartición de justicia y solución de controversias";
       "P. Judicial";
      this.Dependencia = "P. Judicial";
    }
    else if (this.ClvConac == "E057") {
      this.NomConac = "Trayectoria en Nivel Básico, Media Superior y Superior";
       "SEG, ITESP, CONALEP, ITESG, ITESS, UPB, UPGTO, UTNG, UPJR, UTSMA, UVEG, UTSOE, EPRR, UPPE, UTS, ITESI, UTL, ITSUR, CECYTEG, ITESA, SABES, JUVENTUDES GTO, UTLB";
      this.Dependencia = "SEG";
    }
    else if (this.ClvConac == "E058") {
      this.NomConac = "Tribunal de Justicia Administrativa del Estado de Guanajuato";
       "TJA";
      this.Dependencia = "TJA";
    }
    else if (this.ClvConac == "E059") {
      this.NomConac = "Tribunal Estatal Electoral de Guanajuato";
       "TEEG";
      this.Dependencia = "TEEG";
    }
    else if (this.ClvConac == "E060") {
      this.NomConac = "Unidad de Televisión de Guanajuato";
       "UTEG";
      this.Dependencia = "UTEG";
    }
    else if (this.ClvConac == "E061") {
      this.NomConac = "Valores en familia";
       "DIF";
      this.Dependencia = "DIF";
    }
    else if (this.ClvConac == "E062") {
      this.NomConac = "Competencias en Educación Básica";
       "SEG";
      this.Dependencia = "SEG";
    }
    else if (this.ClvConac == "E063") {
      this.NomConac = "Formación científica y tecnológica";
       "IDEA GTO";
      this.Dependencia = "IDEA GTO";
    }
    else if (this.ClvConac == "E064") {
      this.NomConac = "Prevención en salud";
       "ISAPEG";
      this.Dependencia = "ISAPEG";
    }
    else if (this.ClvConac == "E066") {
      this.NomConac = "Cobertura Educativa de la Universidad de Guanajuato";
       "UG";
      this.Dependencia = "UG";
    }
    else if (this.ClvConac == "E067") {
      this.NomConac = "Trayectoria Estudiantil Consolidada";
       "UG";
      this.Dependencia = "UG";
    }
    else if (this.ClvConac == "E068") {
      this.NomConac = "Vinculación del estudiante con los sectores económico y social";
       "UG";
      this.Dependencia = "UG";
    }
    else if (this.ClvConac == "G001") {
      this.NomConac = "Fortalecimiento institucional de la inspección y vigilancia para la administración sustentable del territorio";
       "PAOT";
      this.Dependencia = "PAOT";
    }
    else if (this.ClvConac == "G005") {
      this.NomConac = "Fomento y vigilancia del cumplimiento del trabajo decente";
       "SG";
      this.Dependencia = "SG";
    }
    else if (this.ClvConac == "G006") {
      this.NomConac = "Mejoramiento de las condiciones ambientales";
       "SMAOT";
      this.Dependencia = "SMAOT";
    }
    else if (this.ClvConac == "K003") {
      this.NomConac = "Sistemas de Abastecimiento de Agua con Calidad";
       "CEAG";
      this.Dependencia = "CEAG";
    }
    else if (this.ClvConac == "K004") {
      this.NomConac = "Infraestructura para el Desarrollo";
       "SICOM, SDAyR";
      this.Dependencia = "SICOM";
    }
    else if (this.ClvConac == "K005") {
      this.NomConac = "Logística para los negocios";
       "SDES, GPI";
      this.Dependencia = "SDES";
    }
    else if (this.ClvConac == "K006") {
      this.NomConac = "Sistema de Plantas de Tratamiento de Aguas Residuales";
       "CEAG";
      this.Dependencia = "CEAG";
    }
    else if (this.ClvConac == "M001") {
      this.NomConac = "Gestión y Control de los Ingresos Públicos del Estado";
       "SFIA";
      this.Dependencia = "SFIA";
    }
    else if (this.ClvConac == "M003") {
      this.NomConac = "Gestión de la Hacienda Pública orientada a Resultados";
       "SFIA";
      this.Dependencia = "SFIA";
    }
    else if (this.ClvConac == "M004") {
      this.NomConac = "Administración de los Recursos Humanos, Materiales y Tecnológicos del Estado";
       "SFIA";
      this.Dependencia = "SFIA";
    }
    else if (this.ClvConac == "O005") {
      this.NomConac = "Sistema Estatal Anticorrupción";
       "SESEA";
      this.Dependencia = "SESEA";
    }
    else if (this.ClvConac == "O006") {
      this.NomConac = "Consolidación del Control Interno de la Administración Pública Estatal";
       "STRC";
      this.Dependencia = "STRC";
    }
    else if (this.ClvConac == "P003") {
      this.NomConac = "Desarrollo regional, urbano y ordenamiento ecológico territorial";
       "SMAOT, IPLANEG, SDSH";
      this.Dependencia = "SMAOT";
    }
    else if (this.ClvConac == "P004") {
      this.NomConac = "Gestión de centros escolares de Educación Básica";
       "SEG";
      this.Dependencia = "SEG";
    }
    else if (this.ClvConac == "P005") {
      this.NomConac = "Gestión de centros escolares de Educación Media Superior y Superior";
       "SEG, ITESP, CECYTEG, CONALEP, EPRR, ITESI, ITESG, ITESS, ITSUR, SABES, UPB, UPGTO, UPJR, UPPE, UTL, UTNG, UTS, UTSMA, UTSOE, UVEG, UTLB, ITESA";
      this.Dependencia = "SEG";
    }
    else if (this.ClvConac == "P006") {
      this.NomConac = "Gestión integral de la biodiversidad";
       "SMAOT";
      this.Dependencia = "SMAOT";
    }
    else if (this.ClvConac == "P010") {
      this.NomConac = "Sistema integral de movilidad";
       "SICOM, SSP, SG";
      this.Dependencia = "SICOM";
    }
    else if (this.ClvConac == "P011") {
      this.NomConac = "Sistema estatal de información y evaluación del desarrollo";
       "IPLANEG, SDSH";
      this.Dependencia = "IPLANEG";
    }
    else if (this.ClvConac == "P012") {
      this.NomConac = "Sistema estatal de planeación";
       "IPLANEG";
      this.Dependencia = "IPLANEG";
    }
    else if (this.ClvConac == "P014") {
      this.NomConac = "Fortalecimiento del sistema estatal de seguridad pública";
       "SG";
      this.Dependencia = "SG";
    }
    else if (this.ClvConac == "P018") {
      this.NomConac = "Sistema de gestión social y participación ciudadana";
       "IPLANEG";
      this.Dependencia = "IPLANEG";
    }
    else if (this.ClvConac == "R005") {
      this.NomConac = "Certeza jurídica en el actuar del Poder Ejecutivo";
       "CGJ";
      this.Dependencia = "CGJ";
    }
    else if (this.ClvConac == "R006") {
      this.NomConac = "Coordinación de la Gestión Gubernamental";
       "JEGAPE";
      this.Dependencia = "JEGAPE";
    }
    else if (this.ClvConac == "R007") {
      this.NomConac = "Comunicación social";
       "CGCS";
      this.Dependencia = "CGCS";
    }
    else if (this.ClvConac == "R008") {
      this.NomConac = "Asesoría y representación jurídica para guiar el actuar de la Administración Pública Estatal";
       "SFIA";
      this.Dependencia = "SFIA";
    }
    else if (this.ClvConac == "J001") {
      this.NomConac = "Garantizar el otorgamiento y pago de seguros y prestaciones de los afiliados del ISSEG";
       "ISSEG";
      this.Dependencia = "ISSEG";
    }
    else if (this.ClvConac == "S003") {
      this.NomConac = "Impulso al combate a la pobreza con el mejoramiento de la situación familiar";
       "SDSH, DIF, INGUDIS";
      this.Dependencia = "SDSH";
    }
    else if (this.ClvConac == "S006") {
      this.NomConac = "Asistencia y orientación alimentaria";
       "DIF";
      this.Dependencia = "DIF";
    }
    else if (this.ClvConac == "S008") {
      this.NomConac = "Atención integral al migrante y su familia e internacionalización de Guanajuato";
       "SMEI";
      this.Dependencia = "SMEI";
    }
    else if (this.ClvConac == "S010") {
      this.NomConac = "Cadena de valor y fortalecimiento de la productividad";
       "SDES, FOFIES, FOGIM";
      this.Dependencia = "SDES";
    }
    else if (this.ClvConac == "S011") {
      this.NomConac = "Campo sustentable en el uso del agua";
       "SDAYR";
      this.Dependencia = "SDAYR";
    }
    else if (this.ClvConac == "S016") {
      this.NomConac = "Investigación, desarrollo tecnológico, transferencia de tecnología e innovación";
       "IDEA GTO, UPGTO, UTNG, ITESS, UTL, ITESA, ITESI, ITESG, UPPE, UPB";
      this.Dependencia = "IDEA GTO";
    }
    else if (this.ClvConac == "S018") {
      this.NomConac = "Capital humano";
       "SDES, IECA";
      this.Dependencia = "SDES";
    }
    else if (this.ClvConac == "S019") {
      this.NomConac = "Fortalecimiento de la infraestructura y servicios para el desarrollo comunitario y regional";
       "SDSH";
      this.Dependencia = "SDSH";
    }
    else if (this.ClvConac == "S021") {
      this.NomConac = "Fomento a las Actividades Agroalimentarias";
       "SDAYR, XONOTLI";
      this.Dependencia = "SDAYR";
    }
    else if (this.ClvConac == "S022") {
      this.NomConac = "Fortalecimiento de las Unidades de Producción Familiar";
       "SDAYR";
      this.Dependencia = "SDAYR";
    }
    else if (this.ClvConac == "X001") {
      this.NomConac = "Este Programa es Dummy";
       "Dependencia Dummy";
      this.Dependencia = "DD";
    }
    else if (this.ClvConac == "O007") {
      this.NomConac = "Consolidación de un Guanajuato Íntegro desde el Servicio Público";
       "STRC";
      this.Dependencia = "STRC";
    }
    else if (this.ClvConac == "O008") {
      this.NomConac = "Consolidación de una gestión pública abierta, transparente y cercana a la ciudadanía";
       "STRC";
      this.Dependencia = "STRC";
    }
    else if (this.ClvConac == "M005") {
      this.NomConac = "Dirección estratégica gubernamental";
       "Todos los organismos";
      this.Dependencia = "SFIA";
    }
    else if (this.ClvConac == "M006") {
      this.NomConac = "Apoyo administrativo gubernamental";
       "Todos los organismos";
      this.Dependencia = "SFIA";
    }
    else if (this.ClvConac == "M007") {
      this.NomConac = "Soporte técnico gubernamental";
       "Todos los organismos";
      this.Dependencia = "SFIA";
    }
    else if (this.ClvConac == "O009") {
      this.NomConac = "Fiscalización gubernamental";
       "Todos los organismos";
      this.Dependencia = "STRC";
    }
    else if (this.ClvConac == "C001") {
      this.NomConac = "Participaciones a Municipios";
       "SFIA";
      this.Dependencia = "SFIA";
    }
    else if (this.ClvConac == "D001") {
      this.NomConac = "Deuda Pública Estatal";
       "SFIA";
      this.Dependencia = "SFIA";
    }
    else if (this.ClvConac == "I001") {
      this.NomConac = "Aportaciones para los Municipios";
       "SFIA";
      this.Dependencia = "SFIA";
    }
    else if (this.ClvConac == "U001") {
      this.NomConac = "Erogaciones No Secotrizables";
       "SFIA";
      this.Dependencia = "SFIA";
    }
    else if (this.ClvConac == "R009") {
      this.NomConac = "Provisiones Salariales y Económicas";
       "SFIA";
      this.Dependencia = "SFIA";
    }


  }

}
