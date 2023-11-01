import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ColumnMenuSettings, GridDataResult } from '@progress/kendo-angular-grid';
import { SortDescriptor, State } from '@progress/kendo-data-query';
import { Observable, map } from 'rxjs';
import { CatPpService } from 'src/app/services/cat-pp.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-catalogos',
  templateUrl: './catalogos.component.html',
  styleUrls: ['./catalogos.component.css']
})
export class CatalogosComponent implements OnInit {

   today: number = Date.now();
  


   Nombre: string;
   Pp:string;
   FechaAct:string;
   Rol: string;
   form: FormGroup;
   public maskvalue ="";
  public mask:string  = "00/00/0000";
  public includeLiterals = true;
  public gridItems: Observable<GridDataResult>;
  public pageSize: number = 18;
  public skip: number = 0;
  public sortDescriptor: SortDescriptor[] = [];
  public filterTerm: number = null;
  public gridView: any[];
  public mySelection: string[] = [];
  public gridState: State = {
    sort: [],
    skip: 0,
    take: 20,
  };

  public menuSettings: ColumnMenuSettings = {
    lock: true,
    stick: true,
    setColumnPosition: { expanded: true },
  };

  


   public thumbnailSrc =
    "https://github.com/cabarronc/dpp/blob/master/src/assets/Images/SitioDpp/rayas.jpg?raw=true";
    public ProgramaPresupuestario: Array<{ value: number; text: string }> = [];

  constructor(private loginServices:LoginService, private _catPpService: CatPpService,private fb: FormBuilder) {
    this.form = this.fb.group({
      Nombre: this.Nombre,
      Pp: ['', Validators.required],
      NombrePp: ['', Validators.required],
      FechaAct: ['', Validators.required]
    });
   }

  ngOnInit(): void {
    this.getUsuario();
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

GuardarPp() {


  const crece: any = {
    Nombre:this.form.get('Nombre').value,
    Pp: this.form.get('Pp')?.value,
    NombrePp: this.Nombre,
    FechaAct: this.form.get('FechaAct')?.value,
  }

  // if (this.id == undefined) {
  //   // Agregamos una nuevo crece
  //   this.CrecePlaneacionService.saveCrece(crece).subscribe(_data => {
  //     this.toastr.success('El Crece del PP ' + crece.NombrePp + ' fue registrado con exito!', 'Crece Registrado');
  //     this.obtenerCreces();
  //     this.someInput.nativeElement.expanded = false;
  //     this.form.reset();
  //     console.log(this.form.value);
  //     console.log(crece);
  //     // if (this.form.valid) {
  //     //   this.form.value;

  //     //   console.log("Form Submitted!");
  //     //   this.form.reset();
  //     // }

  //   }, error => {
  //     this.toastr.error('Error: ' + error.error.substr(-35,35));
  //     console.log(error);
  //     console.log(this.form.value);
  //   })
  // }
  // else {
  //   crece.id = this.id
  //   // Editamos usuario
  //   this.CrecePlaneacionService.updateCrece(this.id, crece).subscribe(_data => {

  //     this.accion = 'Elaborando';
  //     this.id = undefined;
  //     this.toastr.info('El CRECE ' + crece.NombrePp +' fue actualizada con exito!', 'Crece  Actualizado');
  //     this.obtenerCreces();
  //     this.form.reset();

  //   }, error => {
  //     this.toastr.error('Error: ' + error.error.substr(-35,35),'Debe completar el siguiente campo:',{timeOut:10000,});
  //     this.toastr.error('Error: ' + error.message,'No es posible el envio de informacion:',{timeOut:10000,});
  //     console.log(error);
  //   })

  // }
}
//-----------------------------------------------------------------------------------------
//-------------------------ELIMINAR CRECE-------------------------------------------------
//-----------------------------------------------------------------------------------------

eliminarCrece(id: number) {
  // this.CrecePlaneacionService.deleteCrece(id).subscribe(_data => {
  //   this.toastr.error('El crece fue eliminado con exito!', 'eliminado');
  //   this.obtenerCreces();
  // }, error => {
  //   console.log(error);
  // })

}


}
