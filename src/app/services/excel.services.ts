import { Injectable } from "@angular/core";
import { ImagePosition, Workbook } from "exceljs";
import { Observable } from "rxjs";
import * as fs from'file-saver';
import { LOGO } from "../helpers/Logo";
import { IPp } from "../models/interface";
import {IUr} from "../models/interface";


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
// URS

async downloadExcelUr(dataExcel:IUr[]): Promise<void> {
    this.woorbook = new Workbook();
    this.woorbook.creator='cabarronc';
    await this._createmplateUr(dataExcel);
    this.woorbook.xlsx.writeBuffer().then((data)=>{
      const blob = new Blob([data]);  
        fs.saveAs(blob, 'CatalogoUr.xlsx');
    });

}
private async _createmplateUr(dataExcel:IUr[]): Promise <void> {
    //creacamos la primer hoja
    const sheet= this.woorbook.addWorksheet('CatalagoUr');

    //Establecemos el ancho y estilo de las columnas
    sheet.getColumn('A').width =5.71;//1. IdUr
    sheet.getColumn('B').width =7.71;//2. Ramo
    sheet.getColumn('C').width =12.71;//3. UrHistorica
    sheet.getColumn('D').width =15.71;//4. UrCodificada
    sheet.getColumn('E').width =15.71;//5. UrdHistorica
    sheet.getColumn('F').width =14.71;//6. UrdCodificada
    sheet.getColumn('G').width =66.71;//7. Nombre
    sheet.getColumn('H').width =10.71;//8. Status
    sheet.getColumn('I').width =10.71;//9. Sociedad
    sheet.getColumn('J').width =20.71;//10. CeGeSap 
    sheet.getColumn('K').width =40.71;//11. Nombre Sap
    sheet.getColumn('L').width =12.71;//12. CraedoPor
    sheet.getColumn('M').width =10.71;//13. Registrado 
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
tituloCell.value ="IdUr"
tituloCell.style.font ={bold:true,size:13}

const tituloCell2 = sheet.getCell('B5');
tituloCell2.value ="Ramo"
tituloCell2.style.font ={bold:true,size:13}

const tituloCell3 = sheet.getCell('C5');
tituloCell3.value ="Ur Historca"
tituloCell3.style.font ={bold:true,size:13}

const tituloCell4 = sheet.getCell('D5');
tituloCell4.value ="Ur"
tituloCell4.style.font ={bold:true,size:13}

const tituloCell5 = sheet.getCell('E5');
tituloCell5.value ="Urd Historica"
tituloCell5.style.font ={bold:true,size:13}

const tituloCell6 = sheet.getCell('F5');
tituloCell6.value ="Urd"
tituloCell6.style.font ={bold:true,size:13}

const tituloCell7 = sheet.getCell('G5');
tituloCell7.value ="Nombre"
tituloCell7.style.font ={bold:true,size:13}

const tituloCell8 = sheet.getCell('H5');
tituloCell8.value ="Status"
tituloCell8.style.font ={bold:true,size:13}

const tituloCell9 = sheet.getCell('I5');
tituloCell9.value ="Sociedad"
tituloCell9.style.font ={bold:true,size:13}

const tituloCell10 = sheet.getCell('J5');
tituloCell10.value ="CeGeSap"
tituloCell10.style.font ={bold:true,size:13}


const tituloCell11 = sheet.getCell('K5');
tituloCell11.value ="Nombre Sap"
tituloCell11.style.font ={bold:true,size:13}

const tituloCell12 = sheet.getCell('L5');
tituloCell12.value ="Creado Por"
tituloCell12.style.font ={bold:true,size:13}

const tituloCell13 = sheet.getCell('M5');
tituloCell13.value ="Registrado"
tituloCell13.style.font ={bold:true,size:13}

//Insertamos los valores de mi Endpoint
const rowToinsert =sheet.getRows(6,dataExcel.length)!;
for (let i = 0; i < rowToinsert.length; i++){
const itemData = dataExcel[i];
const row = rowToinsert[i];

row.values =[
itemData.idUr,
itemData.ramo,
itemData.urHistorica,
itemData.urRecodificada,
itemData.urdHistorica,
itemData.urdRecodificada,
itemData.nombre,
itemData.status,
itemData.sociedad,
itemData.ceGeSap,
itemData.nombreSap,
itemData.creadoPor,
itemData.registrado

]

}

}



}