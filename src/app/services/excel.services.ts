import { Injectable } from "@angular/core";
import { ImagePosition, Workbook } from "exceljs";
import { Observable } from "rxjs";
import * as fs from'file-saver';
import { LOGO } from "../helpers/Logo";
import { IPp } from "../models/interface";


@Injectable({providedIn: 'root'})
export class  ExcelService {
    private woorbook:Workbook;

    async downloadExcel(dataExcel:IPp[]): Promise<void> {
        this.woorbook = new Workbook();
        this.woorbook.creator='cabarronc';
        await this._createmplate(dataExcel);
        this.woorbook.xlsx.writeBuffer().then((data)=>{
          const blob = new Blob([data]);  
            fs.saveAs(blob, 'CatalogoPp.xlsx');
        });

    }
    private async _createmplate(dataExcel:IPp[]): Promise <void> {
        //creacamos la primer hoja
        const sheet= this.woorbook.addWorksheet('CatalagoPp');

        //Establecemos el ancho y estilo de las columnas
        sheet.getColumn('A').width =5.71;//1. IdPp
        sheet.getColumn('B').width =10.71;//2. ClavePp
        sheet.getColumn('C').width =32.71;//3. Eje
        sheet.getColumn('D').width =95.71;//4. NombrePp
        sheet.getColumn('E').width =35.71;//5. NombreResp
        sheet.getColumn('F').width =24.71;//6. Resposable
        sheet.getColumn('G').width =16.71;//7. SiglaDp
        sheet.getColumn('H').width =20.71;//8. SiglaDpPart
        sheet.getColumn('I').width =10.71;//9.FechaAct
     sheet.columns.forEach(
        (column) =>{
            column.alignment={
                vertical:'middle',
                wrapText:true
            };
        });
    //Creamos Imagen
    const logoId = this.woorbook.addImage({
        base64: LOGO,
        extension: 'png', 
    });
    const position:ImagePosition ={
        tl:{col:0.15, row:0.3},
        ext:{width:140, height:70}
    };

    // sheet.addImage(logoId,"A1:A2");
    sheet.addImage(logoId,position);

    const tituloCell = sheet.getCell('A5');
    tituloCell.value ="IdPp"
    tituloCell.style.font ={bold:true,size:13}

    const tituloCell2 = sheet.getCell('B5');
    tituloCell2.value ="Clave Pp"
    tituloCell2.style.font ={bold:true,size:13}

    const tituloCell3 = sheet.getCell('C5');
    tituloCell3.value ="Eje"
    tituloCell3.style.font ={bold:true,size:13}

    const tituloCell4 = sheet.getCell('D5');
    tituloCell4.value ="Nombre Pp"
    tituloCell4.style.font ={bold:true,size:13}

    const tituloCell5 = sheet.getCell('E5');
    tituloCell5.value ="Coodinador"
    tituloCell5.style.font ={bold:true,size:13}

    const tituloCell6 = sheet.getCell('F5');
    tituloCell6.value ="Responsable"
    tituloCell6.style.font ={bold:true,size:13}

    const tituloCell7 = sheet.getCell('G5');
    tituloCell7.value ="Sigla Dep"
    tituloCell7.style.font ={bold:true,size:13}

    const tituloCell8 = sheet.getCell('H5');
    tituloCell8.value ="Sigla Dep Part"
    tituloCell8.style.font ={bold:true,size:13}

    const tituloCell9 = sheet.getCell('H5');
    tituloCell9.value ="Fecha Act"
    tituloCell9.style.font ={bold:true,size:13}

    //Insertamos los valores de mi Endpoint
   const rowToinsert =sheet.getRows(6,dataExcel.length)!;
   for (let i = 0; i < rowToinsert.length; i++){
    const itemData = dataExcel[i];
    const row = rowToinsert[i];

    row.values =[
    itemData.idPp,
    itemData.clavePp,
    itemData.eje,
    itemData.nombrePp,
    itemData.nombreResp,
    itemData.responsable,
    itemData.siglaDp,
    itemData.siglaDpPart,
    itemData.fechaAct,

    ]

   }

    }
}