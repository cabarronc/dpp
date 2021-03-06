import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectEvent, TabPosition } from '@progress/kendo-angular-layout';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';

import { pp } from 'src/app/models/data.pp';
import { CatPpService } from 'src/app/services/cat-pp.service';
import { DependenciasService } from 'src/app/services/dependencias.service';
import { LoginService } from 'src/app/services/login.service';
import { CrecePlaneacionService } from 'src/app/services/crece-planeacion.service'

@Component({
  selector: 'app-crece-formualario',
  templateUrl: './crece-formualario.component.html',
  styleUrls: ['./crece-formualario.component.css']
})
export class CreceFormualarioComponent implements OnInit {
  //   @ViewChild('myForm') form: FormGroup;

  // send() { this.form.ngSubmit.emit(); }
  form: FormGroup;
  public selectedValue = "";
  Nombre: string;
  Rol: string;
  public ProgramaPresupuestario: Array<{ value: number; text: string }> = [];
  public fecha: Date = new Date(2000, 2, 10);
  public position: TabPosition = "top";

  public Contador1si: number;
  public Contador2si: any;
  public Contador1no: any;
  public Contador2no: any;
  public TotalSi!: any;

  public contador:number=0;

  public Dp4Calf: any;
  public CalfDp4: string = "";
  public PonDp4: number = 0;
  public textAreaValueDp4 = "";
  public textAreaValueDp5 = "";
  public textAreaValueDp6 = "";
  public textAreaValueDp7 = "";
  public textAreaValueDp8 = "";
  public textAreaValueDp9 = "";
  public textAreaValueDp10 = "";
  public textAreaValueDp11 = "";
  public textAreaValueDp12 = "";
  public textAreaValueDp13 = "";
  public textAreaValueDp14 = "";
  public textAreaValueDp15 = "";
  public textAreaValueDp16 = "";
  public textAreaValueDp17 = "";
  public textAreaValueDp18 = "";
  public textAreaValueDp19 = "";
  public textAreaValueDp20 = "";

  public textAreaValueMir1 = "";
  public textAreaValueMir2 = "";
  public textAreaValueMir3 = "";
  public textAreaValueMir4 = "";
  public textAreaValueMir5 = "";
  public textAreaValueMir6 = "";
  public textAreaValueMir7 = "";
  public textAreaValueMir8 = "";
  public textAreaValueMir9 = "";
  public textAreaValueMir10 = "";
  public textAreaValueMir11 = "";
  public textAreaValueMir12 = "";
  public textAreaValueMir13 = "";
  public textAreaValueMir14 = "";
  public textAreaValueMir15 = "";
  public textAreaValueMir16 = "";
  public textAreaValueMir17 = "";
  public textAreaValueMir18 = "";
  public textAreaValueMir19 = "";
  public textAreaValueMir20 = "";
  public textAreaValueMir21 = "";
  public textAreaValueMir22 = "";
  public textAreaValueMir23 = "";
  public textAreaValueMir24 = "";
  public textAreaValueMir25 = "";
  public textAreaValueMir26 = "";
  public textAreaValueFMIR = "";
  public textAreaValueFDP = "";
  public textAreaValueAODP = "";
  public textAreaValueAOMIR = "";

  public listCursos: Array<{ value: number; text: string }> = [];
  public listDep: Array<{ text: string; value: number }> = [];

  getUsuario(): void {
    this.Nombre = this.loginServices.getTokenDecoded().sub;
    this.Rol = this.loginServices.getTokenDecoded().roles;
    console.log(this.loginServices.getTokenDecoded());

  }
  public onTabSelect(e: SelectEvent): void {
    console.log(e);
  }
  public settings = {
    prevButtonIcon: "fa fa-arrow-circle-left",
    nextButtonIcon: "fa fa-arrow-circle-right",
  };
  obtenerPp() {
    this._catPpService.getListPp().pipe(
      map(response => response.$values)
    ).subscribe(
      _data => {
        _data = _data.map(_pp => {
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
  }

  //Obtener Dependencias
  obtenerDependencias() {
    this._depService.GetListDep().pipe(
      map(response => response.$values)
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


  //Metodo para registrar las Inscripciones
  GuardarCrece() {
    const crece: any = {
      Email: this.form.get('Email')?.value,
      Revision: this.form.get('Revision')?.value,
      Pp: this.form.get('Pp')?.value,
      Dependencia: this.form.get('Dependencia')?.value,
      Fecha: this.form.get('Fecha')?.value,
      Ano: this.form.get('Ano')?.value,
      DepPar: this.form.get('DepPar')?.value,
      //Elementos
      ClaveNombre: this.form.get('ClaveNombre')?.value,
      DepResPp: this.form.get('DepResPp')?.value,
      DepParPp: this.form.get('DepParPp')?.value,
      FechaADx: this.form.get('FechaADx')?.value,
      Intro: this.form.get('Intro')?.value,
      AnalisisInvolucrados: this.form.get('AnalisisInvolucrados')?.value,
      DefProblema: this.form.get('DefProblema')?.value,
      // AnalisisProblema: this.form.get('AnalisisProblema')?.value,
      EvoProblema: this.form.get('EvoProblema')?.value,
      EstActualProblema: this.form.get('EstActualProblema')?.value,
      ExpAtencion: this.form.get('ExpAtencion')?.value,
      DefObjetivos: this.form.get('DefObjetivos')?.value,
      AnalisisCorrespon: this.form.get('AnalisisCorrespon')?.value,
      SelecAlterna: this.form.get('SelecAlterna')?.value,
      EstructuraAnalitica: this.form.get('EstructuraAnalitica')?.value,
      JustObj: this.form.get('JustObj')?.value,
      IdentificacionCuanPob: this.form.get('IdentificacionCuanPob')?.value,
      IdenficacionAreaInfluencia: this.form.get('IdenficacionAreaInfluencia')?.value,
      RelOtrosPP: this.form.get('RelOtrosPP')?.value,
      ElementosPEB: this.form.get('ElementosPEB')?.value,
      MIR: this.form.get('MIR')?.value,
      EvoPp: this.form.get('EvoPp')?.value,
      Glosario: this.form.get('Glosario')?.value,

      //Evaluacion Dp
      Dp1: this.form.get('Dp1')?.value,
      Dp4: this.form.get('Dp4')?.value,
      Dp4Esp: this.form.get('Dp4Esp')?.value,
      Dp5: this.form.get('Dp5')?.value,
      Dp5Esp: this.form.get('Dp5Esp')?.value,
      Dp6: this.form.get('Dp6')?.value,
      Dp6Esp: this.form.get('Dp6Esp')?.value,
      Dp7: this.form.get('Dp7')?.value,
      Dp7Esp: this.form.get('Dp7Esp')?.value,
      Dp8: this.form.get('Dp8')?.value,
      Dp8Esp: this.form.get('Dp8Esp')?.value,
      Dp9: this.form.get('Dp9')?.value,
      Dp9Esp: this.form.get('Dp9Esp')?.value,
      Dp10: this.form.get('Dp10')?.value,
      Dp10Esp: this.form.get('Dp10Esp')?.value,
      Dp11: this.form.get('Dp11')?.value,
      Dp11Esp: this.form.get('Dp11Esp')?.value,
      Dp12: this.form.get('Dp12')?.value,
      Dp12Esp: this.form.get('Dp12Esp')?.value,
      Dp13: this.form.get('Dp13')?.value,
      Dp13Esp: this.form.get('Dp13Esp')?.value,
      Dp14: this.form.get('Dp14')?.value,
      Dp14Esp: this.form.get('Dp14Esp')?.value,
      Dp15: this.form.get('Dp15')?.value,
      Dp15Esp: this.form.get('Dp15Esp')?.value,
      Dp16: this.form.get('Dp16')?.value,
      Dp16Esp: this.form.get('Dp16Esp')?.value,
      Dp17: this.form.get('Dp17')?.value,
      Dp17Esp: this.form.get('Dp17Esp')?.value,
      Dp18: this.form.get('Dp18')?.value,
      Dp18Esp: this.form.get('Dp18Esp')?.value,
      Dp19: this.form.get('Dp19')?.value,
      Dp19Esp: this.form.get('Dp19Esp')?.value,
      Dp20: this.form.get('Dp20')?.value,
      Dp20Esp: this.form.get('Dp20Esp')?.value,
      //MIr
      Mir1: this.form.get('Mir1')?.value,
      Mir1Esp: this.form.get('Mir1Esp')?.value,
      Mir2: this.form.get('Mir2')?.value,
      Mir2Esp: this.form.get('Mir2Esp')?.value,
      Mir3: this.form.get('Mir3')?.value,
      Mir3Esp: this.form.get('Mir3Esp')?.value,
      Mir4: this.form.get('Mir4')?.value,
      Mir4Esp: this.form.get('Mir4Esp')?.value,
      Mir5: this.form.get('Mir5')?.value,
      Mir5Esp: this.form.get('Mir5Esp')?.value,
      Mir6: this.form.get('Mir6')?.value,
      Mir6Esp: this.form.get('Mir6Esp')?.value,
      Mir7: this.form.get('Mir7')?.value,
      Mir7Esp: this.form.get('Mir7Esp')?.value,
      Mir8: this.form.get('Mir8')?.value,
      Mir8Esp: this.form.get('Mir8Esp')?.value,
      Mir9: this.form.get('Mir9')?.value,
      Mir9Esp: this.form.get('Mir9Esp')?.value,
      Mir10: this.form.get('Mir10')?.value,
      Mir10Esp: this.form.get('Mir10Esp')?.value,
      Mir11: this.form.get('Mir11')?.value,
      Mir11Esp: this.form.get('Mir11Esp')?.value,
      Mir12: this.form.get('Mir12')?.value,
      Mir12Esp: this.form.get('Mir12Esp')?.value,
      Mir13: this.form.get('Mir13')?.value,
      Mir13Esp: this.form.get('Mir13Esp')?.value,
      Mir14: this.form.get('Mir14')?.value,
      Mir14Esp: this.form.get('Mir14Esp')?.value,
      Mir15: this.form.get('Mir15')?.value,
      Mir15Esp: this.form.get('Mir15Esp')?.value,
      Mir16: this.form.get('Mir16')?.value,
      Mir16Esp: this.form.get('Mir16Esp')?.value,
      Mir17: this.form.get('Mir17')?.value,
      Mir17Esp: this.form.get('Mir17Esp')?.value,
      Mir18: this.form.get('Mir18')?.value,
      Mir18Esp: this.form.get('Mir18Esp')?.value,
      Mir19: this.form.get('Mir19')?.value,
      Mir19Esp: this.form.get('Mir19Esp')?.value,
      Mir20: this.form.get('Mir20')?.value,
      Mir20Esp: this.form.get('Mir20Esp')?.value,
      Mir21: this.form.get('Mir21')?.value,
      Mir21Esp: this.form.get('Mir21Esp')?.value,
      Mir22: this.form.get('Mir22')?.value,
      Mir22Esp: this.form.get('Mir22Esp')?.value,
      Mir23: this.form.get('Mir23')?.value,
      Mir23Esp: this.form.get('Mir23Esp')?.value,
      Mir24: this.form.get('Mir24')?.value,
      Mir24Esp: this.form.get('Mir24Esp')?.value,
      Mir25: this.form.get('Mir25')?.value,
      Mir25Esp: this.form.get('Mir25Esp')?.value,
      Mir26: this.form.get('Mir26')?.value,
      Mir26Esp: this.form.get('Mir26Esp')?.value,
      //Fortalezas
      FMir: this.form.get('FMir')?.value,
      FDp: this.form.get('FDp')?.value,
      //Areas de Oportunidad
      AoMir: this.form.get('AoMir')?.value,
      AoDp: this.form.get('AoDp')?.value,
      CalfDp4form: this.form.get('CalfDp4form')?.value,
      ponDp4form: this.form.get('ponDp4form')?.value,





    }
    this.CrecePlaneacionService.saveCrece(crece).subscribe(_data => {
      this.toastr.success('El Crece del PP ' + crece.Pp + ' fue registrado con exito!', 'Crece Registrado');
      this.form.reset();
    }, error => {
      this.toastr.error('Opss.. ocurrio un error', 'Error')
      console.log(error);
    })
  }

  constructor(private fb: FormBuilder,
    private toastr: ToastrService,
    private _depService: DependenciasService,
    private CrecePlaneacionService: CrecePlaneacionService,
    private _catPpService: CatPpService,
    private loginServices: LoginService) {
    this.form = this.fb.group({
      Email: [this.loginServices.getTokenDecoded().email, Validators.required],
      Revision: ['Entrega 2023', Validators.required],
      Pp: ['', [Validators.required, Validators.maxLength(4), Validators.minLength(4)]],
      Dependencia: ['', Validators.required],
      Fecha: ['', Validators.required],
      Ano: ['', Validators.required],
      DepPar: ['', Validators.required],
      ClaveNombre: ["", Validators.required],
      DepResPp: ['', Validators.required],
      DepParPp: ['', Validators.required],
      FechaADx: ['', Validators.required],
      Intro: ['', Validators.required],
      AnalisisInvolucrados: ['', Validators.required],
      DefProblema: ['', Validators.required],
      // AnalisisProblema:['',Validators.required],
      EvoProblema: ['', Validators.required],
      EstActualProblema: ['', Validators.required],
      ExpAtencion: ['', Validators.required],
      DefObjetivos: ['', Validators.required],
      AnalisisCorrespon: ['', Validators.required],
      SelecAlterna: ['', Validators.required],
      EstructuraAnalitica: ['', Validators.required],
      JustObj: ['', Validators.required],
      IdentificacionCuanPob: ['', Validators.required],
      IdenficacionAreaInfluencia: ['', Validators.required],
      RelOtrosPP: ['', Validators.required],
      ElementosPEB: ['', Validators.required],
      MIR: ['', Validators.required],
      EvoPp: ['', Validators.required],
      Glosario: ['', Validators.required],
      Dp1: ['', Validators.required],
      Dp4: ['', Validators.required],
      Dp4Esp: ['', Validators.required],
      Dp5: ['', Validators.required],
      Dp5Esp: ['', Validators.required],
      Dp6: ['', Validators.required],
      Dp6Esp: ['', Validators.required],
      Dp7: ['', Validators.required],
      Dp7Esp: ['', Validators.required],
      Dp8: ['', Validators.required],
      Dp8Esp: ['', Validators.required],
      Dp9: ['', Validators.required],
      Dp9Esp: ['', Validators.required],
      Dp10: ['', Validators.required],
      Dp10Esp: ['', Validators.required],
      Dp11: ['', Validators.required],
      Dp11Esp: ['', Validators.required],
      Dp12: ['', Validators.required],
      Dp12Esp: ['', Validators.required],
      Dp13: ['', Validators.required],
      Dp13Esp: ['', Validators.required],
      Dp14: ['', Validators.required],
      Dp14Esp: ['', Validators.required],
      Dp15: ['', Validators.required],
      Dp15Esp: ['', Validators.required],
      Dp16: ['', Validators.required],
      Dp16Esp: ['', Validators.required],
      Dp17: ['', Validators.required],
      Dp17Esp: ['', Validators.required],
      Dp18: ['', Validators.required],
      Dp18Esp: ['', Validators.required],
      Dp19: ['', Validators.required],
      Dp19Esp: ['', Validators.required],
      Dp20: ['', Validators.required],
      Dp20Esp: ['', Validators.required],
      Mir1: ['', Validators.required],
      Mir1Esp: ['', Validators.required],
      Mir2: ['', Validators.required],
      Mir2Esp: ['', Validators.required],
      Mir3: ['', Validators.required],
      Mir3Esp: ['', Validators.required],
      Mir4: ['', Validators.required],
      Mir4Esp: ['', Validators.required],
      Mir5: ['', Validators.required],
      Mir5Esp: ['', Validators.required],
      Mir6: ['', Validators.required],
      Mir6Esp: ['', Validators.required],
      Mir7: ['', Validators.required],
      Mir7Esp: ['', Validators.required],
      Mir8: ['', Validators.required],
      Mir8Esp: ['', Validators.required],
      Mir9: ['', Validators.required],
      Mir9Esp: ['', Validators.required],
      Mir10: ['', Validators.required],
      Mir10Esp: ['', Validators.required],
      Mir11: ['', Validators.required],
      Mir11Esp: ['', Validators.required],
      Mir12: ['', Validators.required],
      Mir12Esp: ['', Validators.required],
      Mir13: ['', Validators.required],
      Mir13Esp: ['', Validators.required],
      Mir14: ['', Validators.required],
      Mir14Esp: ['', Validators.required],
      Mir15: ['', Validators.required],
      Mir15Esp: ['', Validators.required],
      Mir16: ['', Validators.required],
      Mir16Esp: ['', Validators.required],
      Mir17: ['', Validators.required],
      Mir17Esp: ['', Validators.required],
      Mir18: ['', Validators.required],
      Mir18Esp: ['', Validators.required],
      Mir19: ['', Validators.required],
      Mir19Esp: ['', Validators.required],
      Mir20: ['', Validators.required],
      Mir20Esp: ['', Validators.required],
      Mir21: ['', Validators.required],
      Mir21Esp: ['', Validators.required],
      Mir22: ['', Validators.required],
      Mir22Esp: ['', Validators.required],
      Mir23: ['', Validators.required],
      Mir23Esp: ['', Validators.required],
      Mir24: ['', Validators.required],
      Mir24Esp: ['', Validators.required],
      Mir25: ['', Validators.required],
      Mir25Esp: ['', Validators.required],
      Mir26: ['', Validators.required],
      Mir26Esp: ['', Validators.required],
      FMir: ['', Validators.required],
      FDp: ['', Validators.required],
      AoMir: ['', Validators.required],
      AoDp: ['', Validators.required],
      CalfDp4form: ['', Validators.required],
      ponDp4form: ['', Validators.required],




    });
    console.log(pp);
  }

  ngOnInit(): void {
    this.obtenerDependencias();
    this.getUsuario();
    this.obtenerPp();
    this.respuestaGenericaDp4();
    this.ponderacionDp4();
    //this.Elemento2Calculo();

  }
  public clearValue4(): void {
    this.textAreaValueDp4 = "";
  }
  public clearValue5(): void {
    this.textAreaValueDp5 = "";
  }
  public clearValue6(): void {
    this.textAreaValueDp6 = "";
  }
  public clearValue7(): void {
    this.textAreaValueDp7 = "";
  }

  public clearValue8(): void {
    this.textAreaValueDp8 = "";
  }
  public clearValue9(): void {
    this.textAreaValueDp9 = "";
  }
  public clearValue10(): void {
    this.textAreaValueDp10 = "";
  }
  public clearValue11(): void {
    this.textAreaValueDp11 = "";
  }
  public clearValue12(): void {
    this.textAreaValueDp12 = "";
  }
  public clearValue13(): void {
    this.textAreaValueDp13 = "";
  }
  public clearValue14(): void {
    this.textAreaValueDp14 = "";
  }
  public clearValue15(): void {
    this.textAreaValueDp15 = "";
  }
  public clearValue16(): void {
    this.textAreaValueDp16 = "";
  }
  public clearValue17(): void {
    this.textAreaValueDp17 = "";
  }
  public clearValue18(): void {
    this.textAreaValueDp18 = "";
  }
  public clearValue19(): void {
    this.textAreaValueDp19 = "";
  }
  public clearValue20(): void {
    this.textAreaValueDp20 = "";
  }

  public clearValue21(): void {
    this.textAreaValueMir1 = "";
  }
  public clearValue22(): void {
    this.textAreaValueMir2 = "";
  }
  public clearValue23(): void {
    this.textAreaValueMir3 = "";
  }
  public clearValue24(): void {
    this.textAreaValueMir4 = "";
  }
  public clearValue25(): void {
    this.textAreaValueMir5 = "";
  }
  public clearValue26(): void {
    this.textAreaValueMir6 = "";
  }
  public clearValue27(): void {
    this.textAreaValueMir7 = "";
  }
  public clearValue28(): void {
    this.textAreaValueMir8 = "";
  }
  public clearValue29(): void {
    this.textAreaValueMir9 = "";
  }
  public clearValue30(): void {
    this.textAreaValueMir10 = "";
  }
  public clearValue31(): void {
    this.textAreaValueMir11 = "";
  }
  public clearValue32(): void {
    this.textAreaValueMir12 = "";
  }
  public clearValue33(): void {
    this.textAreaValueMir13 = "";
  }
  public clearValue34(): void {
    this.textAreaValueMir14 = "";
  }
  public clearValue35(): void {
    this.textAreaValueMir15 = "";
  }
  public clearValue36(): void {
    this.textAreaValueMir16 = "";
  }
  public clearValue37(): void {
    this.textAreaValueMir17 = "";
  }
  public clearValue38(): void {
    this.textAreaValueMir18 = "";
  }
  public clearValue39(): void {
    this.textAreaValueMir19 = "";
  }
  public clearValue40(): void {
    this.textAreaValueMir20 = "";
  }
  public clearValue41(): void {
    this.textAreaValueMir21 = "";
  }
  public clearValue42(): void {
    this.textAreaValueMir22 = "";
  }
  public clearValue43(): void {
    this.textAreaValueMir23 = "";
  }
  public clearValue44(): void {
    this.textAreaValueMir24 = "";
  }
  public clearValue45(): void {
    this.textAreaValueMir25 = "";
  }
  public clearValue46(): void {
    this.textAreaValueMir26 = "";
  }
  public clearValue47(): void {
    this.textAreaValueFMIR = "";
  }
  public clearValue48(): void {
    this.textAreaValueFDP = "";
  }
  public clearValue49(): void {
    this.textAreaValueAOMIR = "";
  }
  public clearValue50(): void {
    this.textAreaValueAODP = "";
  }

  // public Elemento1Calculo(): void {
  //   while(this.contador < 10)
  //   {
  //     this.contador += 1;
  //     if(this.contador== 5)
  //     {
  //       break;
  //     }
  //     console.log(this.contador + " ");
  //   }
  //   console.log("\n");
  // }


  public Elemento2Calculo():void{
    this.Contador1si = this.form.get('ClaveNombre')?.value
    if (this.Contador1no == 0 && this.Contador2no==0) {
      this.TotalSi = 0;
    } else if (this.Contador1si == 1 && this.Contador2no == 0 || this.Contador1no == 0 && this.Contador2si == 1) {
       this.TotalSi = 1;
    } else if (this.Contador1si == 1 && this.Contador2si == 1) {
       this.TotalSi = 2;
    }
    console.log(this.form.value);
  }


  public sinrec4(): void {
    if (this.Dp4Calf == 9) {
      this.textAreaValueDp4 = "Sin recomendaciones";
    }
    else if (this.Dp4Calf == 6) {
      this.textAreaValueDp4 = "";
    }
    else if (this.Dp4Calf == 3) {
      this.textAreaValueDp4 = "";
    }
  }
  public respuestaGenericaDp4(): any {
    if (this.Dp4Calf == 9) {
      this.CalfDp4 = "La introducci??n del Diagn??stico es lo suficientemente clara para dar a conocer la problem??tica, como ??sta ser?? atendida y la justificaci??n de la intervenci??n de gobierno";
      //Maximo 2%
    } else if (this.Dp4Calf == 6) {
      this.CalfDp4 = "La introducci??n del Diagn??stico no es lo suficientemente clara para dar a conocer la problem??tica, como ??sta ser?? atendida y la justificaci??n de la intervenci??n de gobierno, en este apartado se espera un resumen ejecutivo.\nEsta recomendaci??n se incluir?? en el plan de mejora continua del Programa, su atenci??n se considera deseable, pero no urgente.";
    }
    else if (this.Dp4Calf == 3) {
      this.CalfDp4 = "La introducci??n del Diagn??stico no contiene los elementos necesarios que permitan identificar la problem??tica, su atenci??n o la justificaci??n del programa.\nEste apartado comprende un resumen ejecutivo del resto del documento.\nEsta recomendaci??n se incluir?? en el plan de mejora continua del Programa, su atenci??n se considera deseable, pero no urgente.";
    }
    console.log(this.form.value);
  }

  public ponderacionDp4(): void {
    if (this.Dp4Calf == 9) {
      //Maximo 2%
      this.PonDp4 = 2;
    } else if (this.Dp4Calf == 6) {
      this.PonDp4 = 1;
    }
    else if (this.Dp4Calf == 3) {
      this.PonDp4 = 0;
    }
  }
  public sinrec5(): void {
    this.textAreaValueDp5 = "Sin recomendaciones";
  }
  public sinrec6(): void {
    this.textAreaValueDp6 = "Sin recomendaciones";
  }
  public sinrec7(): void {
    this.textAreaValueDp7 = "Sin recomendaciones";
  }
  public sinrec8(): void {
    this.textAreaValueDp8 = "Sin recomendaciones";
  }
  public sinrec9(): void {
    this.textAreaValueDp9 = "Sin recomendaciones";
  }
  public sinrec10(): void {
    this.textAreaValueDp10 = "Sin recomendaciones";
  }
  public sinrec11(): void {
    this.textAreaValueDp11 = "Sin recomendaciones";
  }
  public sinrec12(): void {
    this.textAreaValueDp12 = "Sin recomendaciones";
  }
  public sinrec13(): void {
    this.textAreaValueDp13 = "Sin recomendaciones";
  }
  public sinrec14(): void {
    this.textAreaValueDp14 = "Sin recomendaciones";
  }
  public sinrec15(): void {
    this.textAreaValueDp15 = "Sin recomendaciones";
  }
  public sinrec16(): void {
    this.textAreaValueDp16 = "Sin recomendaciones";
  }
  public sinrec17(): void {
    this.textAreaValueDp17 = "Sin recomendaciones";
  }
  public sinrec18(): void {
    this.textAreaValueDp18 = "Sin recomendaciones";
  }
  public sinrec19(): void {
    this.textAreaValueDp19 = "Sin recomendaciones";
  }
  public sinrec20(): void {
    this.textAreaValueDp20 = "Sin recomendaciones";
  }
  public sinrec21(): void {
    this.textAreaValueMir1 = "Sin recomendaciones";
  }
  public sinrec22(): void {
    this.textAreaValueMir2 = "Sin recomendaciones";
  }
  public sinrec23(): void {
    this.textAreaValueMir3 = "Sin recomendaciones";
  }
  public sinrec24(): void {
    this.textAreaValueMir4 = "Sin recomendaciones";
  }
  public sinrec25(): void {
    this.textAreaValueMir5 = "Sin recomendaciones";
  }
  public sinrec26(): void {
    this.textAreaValueMir6 = "Sin recomendaciones";
  }
  public sinrec27(): void {
    this.textAreaValueMir7 = "Sin recomendaciones";
  }
  public sinrec28(): void {
    this.textAreaValueMir8 = "Sin recomendaciones";
  }
  public sinrec29(): void {
    this.textAreaValueMir9 = "Sin recomendaciones";
  }
  public sinrec30(): void {
    this.textAreaValueMir10 = "Sin recomendaciones";
  }
  public sinrec31(): void {
    this.textAreaValueMir11 = "Sin recomendaciones";
  }
  public sinrec32(): void {
    this.textAreaValueMir12 = "Sin recomendaciones";
  }
  public sinrec33(): void {
    this.textAreaValueMir13 = "Sin recomendaciones";
  }
  public sinrec34(): void {
    this.textAreaValueMir14 = "Sin recomendaciones";
  }
  public sinrec35(): void {
    this.textAreaValueMir15 = "Sin recomendaciones";
  }
  public sinrec36(): void {
    this.textAreaValueMir16 = "Sin recomendaciones";
  }
  public sinrec37(): void {
    this.textAreaValueMir17 = "Sin recomendaciones";
  }
  public sinrec38(): void {
    this.textAreaValueMir18 = "Sin recomendaciones";
  }
  public sinrec39(): void {
    this.textAreaValueMir19 = "Sin recomendaciones";
  }
  public sinrec40(): void {
    this.textAreaValueMir20 = "Sin recomendaciones";
  }
  public sinrec41(): void {
    this.textAreaValueMir21 = "Sin recomendaciones";
  }
  public sinrec42(): void {
    this.textAreaValueMir22 = "Sin recomendaciones";
  }
  public sinrec43(): void {
    this.textAreaValueMir23 = "Sin recomendaciones";
  }
  public sinrec44(): void {
    this.textAreaValueMir24 = "Sin recomendaciones";
  }
  public sinrec45(): void {
    this.textAreaValueMir25 = "Sin recomendaciones";
  }
  public sinrec46(): void {
    this.textAreaValueMir26 = "Sin recomendaciones";
  }
  public listYear: Array<string> = [
    "2019",
    "2020",
    "2021",
    "2022",
    "2023"
  ];
  public listDepPar: Array<string> = [
    "Si",
    "Parcialmente",
    "No"
  ];
}
