import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { PDF } from "../../../helpers/pdf"
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileService } from 'src/app/services/file.service';
import { map } from 'rxjs';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-diagnostico',
  templateUrl: './diagnostico.component.html',
  styleUrls: ['./diagnostico.component.css']
})
export class DiagnosticoComponent implements OnInit {

// @ViewChild('myinput') myInput:ElementRef;
// reset() {
//   console.log(this.myInput.nativeElement.files);
//   this.myInput.nativeElement.value = "";
//   console.log(this.myInput.nativeElement.files);
// }
  public archivos: any = []
  public previsualizacion: string;
  public PDF:string = PDF;
  public pdfSanitizado: any;
 public archivoNombre:string;
 public form: FormGroup;
 public p: number;
//  public ejercicio = new Intl.DateTimeFormat('mx-Mx',{ year:'numeric', timeZone:'UTC' }).format(new Date());
 public ejercicio="2024";
 public file:string;
 public pp = "";
 
//  public primer:string = '1er Trimestre '+this.ejercicio;
//  public segundo:string = '2do Trimestre '+this.ejercicio;
//  public tercero:string = '3er Trimestre '+this.ejercicio;
//  public cuarto:string = '4to Trimestre '+this.ejercicio;
 
 public myDate = new Intl.DateTimeFormat('mx-Mx',{ month:'2-digit', day:'2-digit', year:'2-digit', timeZone:'UTC' }).format(new Date());
 public Files: Array<{ idFile: number; programa: string; ejercicio: string; trimestre: string ;file:string; archivoNombre:string;fecha:string}> = [];
 public id: number | undefined; 

 public opened = false;
 public windowTop = 450;
 public windowLeft = 900;

 public onClick(): void {
   alert(this. obtenerFile());
 }

 public toggle(isOpened: boolean): void {
   this.opened = isOpened;
 }
 
 
 
 constructor(private toastr: ToastrService,private sanitizer: DomSanitizer,private fb: FormBuilder, private _fileService: FileService) { 
    this.form = this.fb.group({
      Programa: [this.pp, Validators.required],
      // Ejercicio: [this.ejercicio, Validators.required],
      Ejercicio: ['', Validators.required],
      Trimestre: ['', Validators.required],
      File: ['', Validators.required],// Forma de hacer con url a un repo
      ArchivoNombre: ['', Validators.required],
    

    });
   
  }
  public UrSanitizada  = this.sanitizer.bypassSecurityTrustResourceUrl(PDF);
  ngOnInit(): void {
    this.obtenerFile();
  }
  capturarFile(event): any {
    const archivoCapturado = event.target.files[0]
    this.extraeBase64(archivoCapturado).then((pdf:any) => {
      this.previsualizacion = pdf.base;
      this.pdfSanitizado = this.sanitizer.bypassSecurityTrustResourceUrl(this.previsualizacion);
      event.target.value = null;
     // console.log(pdf);
      console.log(this.pdfSanitizado);
      console.log(this.previsualizacion);
      
      
    });
     this.archivos.push(archivoCapturado)
    // console.log(event.target.files);
  }
 
  //Mostrar el catalogo de Unidades Responsables
  obtenerFile() {
    this._fileService.getListFile().pipe(
      map(response => response)
    ).subscribe(
      _data => {

        _data = _data?.map(_file => {
          const { idFile, programa, ejercicio, trimestre, file, archivoNombre, fecha  } = _file;
          return {
            idFile: idFile,
            programa:programa,
            ejercicio:ejercicio,
            trimestre:trimestre,
            file:file,
            archivoNombre:archivoNombre,
            fecha:fecha      

          }

        }

        );
        //this._excelService.downloadExcel(_data);
        this.Files = _data;
        console.log(_data);

      }, error => {
        console.log(error);
      }

    )
  }
  subirArchivo():any{
   try {
    // const formularioDedatos = new FormData();
    // this.archivos.forEach(archivo=>{
    //   formularioDedatos.append('files',archivo);
    //   this.archivoNombre = archivo.name;
      

    //   console.log(archivo);
    //   console.log(this.archivoNombre);

    // });
    this.GuardarFile();
      
   } catch (e) {
    console.log('Error:',e);
   }
  }


  extraeBase64 = async ($event: any) => new Promise((resolve, reject) => {
    try {
      const unsafePdf = window.URL.createObjectURL($event);
      const pdf = this.sanitizer.bypassSecurityTrustResourceUrl(unsafePdf);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () =>
        resolve({
          blob: $event,
          pdf,
          base: reader.result
        });
      reader.onerror = () =>
        resolve({
          base: null
        })
        reader.readyState
        console.log(reader.readyState);
    } catch (e) {
      return null;
    }
  })
  GuardarFile() {


    const file: any = {
      Programa: this.form.get('Programa').value,
      Ejercicio: this.form.get('Ejercicio')?.value,
      Trimestre: this.form.get('Trimestre')?.value,
      // File: this.previsualizacion,   //Forma de hacerlo con archivos locales
      File: this.form.get('File')?.value,
      // ArchivoNombre: this.archivoNombre,//Fomra de hacerlo con archivos locales
      ArchivoNombre: this.form.get('ArchivoNombre')?.value,
      Fecha: this.myDate
            
    }

    if (this.id == undefined) {
      //Agregamos una nuevo crece
      this._fileService.saveFile(file).subscribe(_data => {
       this.toastr.success('El Dx Particular del Programa '+this.pp + ' fue registrado con exito!', 'Correcto!!');
       this.obtenerFile();
       // this.someInput.nativeElement.expanded = false;
       this.form.reset();
        console.log(this.form.value);
       console.log(file);
        if (this.form.valid) {
          this.form.value;

          console.log("Form Submitted!");
          this.form.reset();
        }

     }, error => {
       this.toastr.error('Error: ' + error.error.substr(-35, 35), 'Debe completar el siguiente campo:', { timeOut: 10000, });
       this.toastr.error('Error: ' + error.message, 'No es posible el envio de informacion:', { timeOut: 10000, });

        console.log(error);
       console.log(this.form.value);
     })
   }
   else {
     file.idFile = this.id
      //Editamos usuario
     this._fileService.updateFile(this.id, file).subscribe(_data => {

       // this.accion = 'Elaborando';
       this.id = undefined;
       this.toastr.info('El Dx Particular del Programa '+ this.pp+ ' fue actualizada con exito!', 'Dx Actualizado');
       this.obtenerFile();
       this.form.reset();

     }, error => {
       this.toastr.error('Error: ' + error.error.substr(-35, 35), 'Debe completar el siguiente campo:', { timeOut: 10000, });
       this.toastr.error('Error: ' + error.message, 'No es posible el envio de informacion:', { timeOut: 10000, });
       console.log(error);
     })

    }



  }

eliminarFile(id: number) {
    this._fileService.deleteFile(id).subscribe(_data => {
      this.toastr.error('El Dx Particular del Programa  '+this.pp+' fue eliminado con exito!', 'Eliminado');
      this.obtenerFile();
    }, error => {
      console.log(error);
    })

  }
  editarFile(file: any) {
    this.id = file.idFile;
   // this.archivoNombre = file.archivoNombre;  //forna de hacerlo con archivos locales
   // this.previsualizacion = file.previsualizacion; // Forma de hacerlo con archivos locales
    this.myDate = file.fecha;

    this.form.patchValue({

      Programa: file.programa,
      Ejercicio: file.ejercicio,
      Trimestre: file.trimestre,
      File: file.file,
      ArchivoNombre: file.archivoNombre

    });
  }
}
