import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { PDF } from "../../../helpers/pdf"


@Component({
  selector: 'app-diagnostico',
  templateUrl: './diagnostico.component.html',
  styleUrls: ['./diagnostico.component.css']
})
export class DiagnosticoComponent implements OnInit {
  public archivos: any = []
  public previsualizacion: string;
  public PDF:string = PDF;
  public pdfSanitizado: any;
 

  constructor(private sanitizer: DomSanitizer) { }
  public UrSanitizada  = this.sanitizer.bypassSecurityTrustResourceUrl(PDF);
  ngOnInit(): void {
  }
  capturarFile(event): any {
    const archivoCapturado = event.target.files[0]
    this.extraeBase64(archivoCapturado).then((pdf:any) => {
      this.previsualizacion = pdf.base;
      this.pdfSanitizado = this.sanitizer.bypassSecurityTrustResourceUrl(this.previsualizacion);
     // console.log(pdf);
      console.log(this.pdfSanitizado);
      //console.log(this.previsualizacion);
      
    });
     this.archivos.push(archivoCapturado)
    // console.log(event.target.files);
  }
 
  subirArchivo():any{
   try {
    const formularioDedatos = new FormData();
    this.archivos.forEach(archivo=>{
      formularioDedatos.append('files',archivo);
      console.log(archivo);

    });
      
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
    } catch (e) {
      return null;
    }
  })
}
