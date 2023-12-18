import { NgModule,CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from "@angular/common";
import {NgxPaginationModule} from 'ngx-pagination';
import { APP_BASE_HREF } from "@angular/common";
import { breadCrumbRouting, appRoutingProviders } from "../../src/app/helpers/breadcrumb.routes";

//Modulos
import { AppComponent } from './app.component';
import { UsuariosComponent } from './Views/Administracion/usuarios/usuarios.component';
import { HomeComponent } from './Views/Home/home/home.component';
import { LoginComponent } from './Views/login/login.component';
import { CreceComponent } from './Views/Planeacion/crece/crece.component';
import { CreceCuestionarioComponent } from './Views/Planeacion/crece-cuestionario/crece-cuestionario.component';
import { RegisterComponent } from './Views/register/register.component';
import { CarruselComponent } from './Views/Home/carrusel/carrusel.component';
import { PieComponent } from './Views/Home/pie/pie.component';
import { PruebaspdfComponent } from './Views/Administracion/pruebaspdf/pruebaspdf.component';
import { KendoComponent } from './Views/Administracion/kendo/kendo.component';
import { CatalogoProgramasComponent } from './Views/Administracion/catalogo-programas/catalogo-programas.component';
import { ChrtshighComponent } from './Views/Administracion/highcharts/chrtshigh.component';
import { Login2Component } from './Views/Administracion/login2/login2.component';
import { PruebaExcelComponent } from './Views/Administracion/prueba-excel/prueba-excel.component';
import { DiagnosticoComponent } from './Views/Planeacion/diagnostico/diagnostico';

import { CreceMonitorAvanceComponent } from './Views/Planeacion/crece-monitor-avance/crece-monitor-avance.component';
import { CreceInformeComponent } from './Views/Planeacion/crece-informe/crece-informe.component';
import { PresentacionComponent } from './Views/Reestructura/presentacion/presentacion.component';
import { RestrucAdminComponent } from './Views/Reestructura/restruc-admin/restruc-admin.component';
import { RestrucPrograComponent } from './Views/Reestructura/restruc-progra/restruc-progra.component';
import { FormatoComponent } from './Views/Reestructura/formato/formato.component';
import { TableroReestructuraComponent } from './Views/Reestructura/tablero-reestructura/tablero-reestructura.component';
import { TabsTableroComponent } from './Views/Reestructura/tabs-tablero/tabs-tablero.component';
import { TableroPowerComponent } from './Views/Reestructura/tabs-tablero/tablero-power/tablero-power.component';
import { IndiceDppComponent } from './Views/IndiceDpp/indice-dpp/indice-dpp.component';
import { TableroComponent } from './Views/Capacitacion/tablero/tablero.component';
import { IntegradorComponent } from './Views/Capacitacion/integrador/integrador.component';
import { FormularioPacComponent } from './Views/Capacitacion/formulario-pac/formulario-pac.component';
import { CensoComponent } from './Views/CensoGpR/censo/censo.component';
import { CensoSeguimientoComponent } from './Views/CensoGpR/censo-seguimiento/censo-seguimiento.component';
import { CensoTableroComponent } from './Views/CensoGpR/censo-tablero/censo-tablero.component';
import { DownloadUploadService } from './services/download-upload.service';
import { DownloadComponent } from './Views/Planeacion/crece-informe/download/download.component';
import { UploadComponent } from './Views/Planeacion/crece-informe/upload/upload.component';
import { CreceFormualarioComponent } from './Views/Planeacion/crece-formulario/crece-formualario.component';
import { DirectorioGpRComponent } from './Views/CensoGpR/directorio-gp-r/directorio-gp-r.component';
import { AvanceRestructuraComponent } from './Views/Reestructura/avance-restructura/avance-restructura.component';

//Interceptors
import {AddTokenInterceptor} from '../app/helpers/add-token.interceptor'
//Librerias y Deendencias
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS,HttpClientJsonpModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { CatalogosComponent } from './Views/Administracion/Catalogos/catalogos.component';
import { LoadingComponent } from './shared/loading/loading.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { CookieService } from 'ngx-cookie-service';
import { JwtModule } from "@auth0/angular-jwt";

//import { NotFoundComponent } from './error-pages/not-found/not-found.component';
//Kendo ui
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { GridModule, PDFModule,ExcelModule } from '@progress/kendo-angular-grid';
import { ButtonsModule} from "@progress/kendo-angular-buttons";
import { IconsModule} from "@progress/kendo-angular-icons";
import { LabelModule } from "@progress/kendo-angular-label";
import { InputsModule } from "@progress/kendo-angular-inputs";
import { LayoutModule } from "@progress/kendo-angular-layout";
import { FloatingLabelModule } from "@progress/kendo-angular-label";
import { TooltipsModule } from "@progress/kendo-angular-tooltip";
import { IntlModule } from "@progress/kendo-angular-intl";
import { DateInputsModule } from "@progress/kendo-angular-dateinputs";
import { PruebaFirebaseComponent } from './Views/Administracion/prueba-firebase/prueba-firebase.component';
import { ProgressBarModule } from '@progress/kendo-angular-progressbar';
import { IndicatorsModule } from "@progress/kendo-angular-indicators";
import { GaugesModule } from "@progress/kendo-angular-gauges";
import { ListBoxModule } from "@progress/kendo-angular-listbox";
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { TypographyModule } from '@progress/kendo-angular-typography';
import { ChartsModule } from '@progress/kendo-angular-charts';
import { NavigationModule } from "@progress/kendo-angular-navigation";
 //import { PDFViewerModule } from '@progress/kendo-angular-pdfviewer';




//firebase
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';

//importamos la configuracion de  firebase
import { environment } from 'src/environments/environment';
import { LinksService } from './services/links.service';
import { Pf2023Component } from './Views/PaqueteFiscal2023/pf2023/pf2023.component';
import { GoogleMapsComponent } from './Views/Administracion/google-maps/google-maps.component';
//GoogleMaps
import { GoogleMapsModule } from '@angular/google-maps';
import { PaisesComponent } from './Views/Administracion/Mapas/paises/paises.component';
import { APGComponent } from './Views/Administracion/ConsumirApis/apg/apg.component';
import { MapaComponent } from './Views/Administracion/BienesServicios/mapa/mapa.component';
import { FiltersPipe } from './pipes/filters.pipe';
import { SafePipeModule } from 'safe-pipe';

export function tokenGetter() {
  return localStorage.getItem('token');
}

import "hammerjs";

import { CreceProgramacionComponent } from './Views/Programacion/crece-programacion/crece-programacion.component';

import { Planeacion2023Component } from './Views/EquipoGpR/Ejercicio2023/Home2023/Planeacion/planeacion2023.component';
import { Programacion2023Component } from './Views/EquipoGpR/Ejercicio2023/Home2023/Programacion/programacion2023.component';
import { Presupuestacion2023Component } from './Views/EquipoGpR/Ejercicio2023/Home2023/Presupuestacion/presupuestacion2023.component';
import { EjercicioControl2023Component } from './Views/EquipoGpR/Ejercicio2023/Home2023/Ejercicio/ejercicio-control2023.component';
import { Seguimiento2023Component } from './Views/EquipoGpR/Ejercicio2023/Home2023/Seguimiento/seguimiento2023.component';
import { Rendicion2023Component } from './Views/EquipoGpR/Ejercicio2023/Home2023/Rendicion/rendicion2023.component';
import { HomePf2023Component } from './Views/EquipoGpR/Ejercicio2023/Home2023/Home/home-pf2023.component';
import { ScrollToTopComponent } from './Views/scroll-to-top/scroll-to-top.component';








@NgModule({
  declarations: [
    AppComponent,
    UsuariosComponent,
    HomeComponent,
    LoginComponent,
    CreceComponent,
    CreceCuestionarioComponent,
    RegisterComponent,
    CatalogosComponent,
    LoadingComponent,
    CarruselComponent,
    PieComponent,
    PruebaspdfComponent,
    KendoComponent,
    CatalogoProgramasComponent,
    ChrtshighComponent,
    Login2Component,
    PruebaExcelComponent,
    DiagnosticoComponent,
    CreceMonitorAvanceComponent,
    CreceInformeComponent,
    PresentacionComponent,
    RestrucAdminComponent,
    RestrucPrograComponent,
    FormatoComponent,
    TableroReestructuraComponent,
    TabsTableroComponent,
    TableroPowerComponent,
    IndiceDppComponent,
    TableroComponent,
    IntegradorComponent,
    FormularioPacComponent,
    CensoComponent,
    CensoSeguimientoComponent,
    CensoTableroComponent,
    DownloadComponent,
    UploadComponent,
    CreceFormualarioComponent,
    DirectorioGpRComponent,
    AvanceRestructuraComponent,
    PruebaFirebaseComponent,
    Pf2023Component,
    GoogleMapsComponent,
    PaisesComponent,
    APGComponent,
    MapaComponent,
    FiltersPipe,
    CreceProgramacionComponent,
    Planeacion2023Component,
    Programacion2023Component,
    Presupuestacion2023Component,
    EjercicioControl2023Component,
    Seguimiento2023Component,
    Rendicion2023Component,
    HomePf2023Component,
    ScrollToTopComponent,
  
 


  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    GoogleMapsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    AppRoutingModule,
    DropDownsModule,
    GridModule,
    PDFModule,
    ExcelModule,
    ButtonsModule,
    ProgressBarModule,
    IconsModule,
    DialogsModule,
    AngularFireModule.initializeApp(environment.firebaseDb),
    AngularFireDatabaseModule,
    LabelModule,
    InputsModule,   
    breadCrumbRouting,
    SafePipeModule,
    NavigationModule, 
    LayoutModule,
    FloatingLabelModule,
    DateInputsModule,
    NgxPaginationModule,
    IndicatorsModule,
    GaugesModule,
    ListBoxModule,
    TooltipsModule,
    TypographyModule,
    ChartsModule,
    IntlModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:4200"],
        disallowedRoutes: []
      }
    }),
   
  ],



  providers: [
    appRoutingProviders,
    {
      provide: APP_BASE_HREF,
      useValue: window.location.pathname,
    },
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    { provide: HTTP_INTERCEPTORS, useClass: AddTokenInterceptor, multi: true },
    DownloadUploadService,
    CookieService,LinksService],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA ],
  bootstrap: [AppComponent]
})
export class AppModule { }
