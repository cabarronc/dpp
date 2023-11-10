import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { PDF } from "../../../../app/helpers/pdf"


@Component({
  selector: 'app-crece-respuestas',
  templateUrl: './crece-respuestas.component.html',
  styleUrls: ['./crece-respuestas.component.css']
})
export class CreceRespuestasComponent implements OnInit {
  public archivos: any = []
  public previsualizacion: string;
  public PDF:string = PDF;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
  }
  capturarFile(event): any {
    const archivoCapturado = event.target.files[0]
    this.extraeBase64(archivoCapturado).then((pdf:any) => {
      this.previsualizacion = pdf.base;
      console.log(pdf);
      
    });
     this.archivos.push(archivoCapturado)
    // console.log(event.target.files);
  }
  subirArchivo(){
    
  }
  // subirArchivo():any{
  //  try {
  //   const formularioDedatos = new FormData();
  //   this.archivos.forEach(archivo=>{
  //     console.log(archivo);
  //     formularioDedatos.append('files',archivo);

  //   });
    
  //  } catch (e) {
  //   console.log('Error:',e);
  //  }

  // }


  extraeBase64 = async ($event: any) => new Promise((resolve, reject) => {
    try {
      const unsafeImg = window.URL.createObjectURL($event);
      const pdf = this.sanitizer.bypassSecurityTrustResourceUrl(unsafeImg);
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
