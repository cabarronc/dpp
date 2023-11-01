import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { UsuariosComponent } from './Views/Administracion/usuarios/usuarios.component';
import { HomeComponent } from './Views/Home/home/home.component';
import { CreceComponent } from './Views/Planeacion/crece/crece.component';
import { CreceCuestionarioComponent } from './Views/Planeacion/crece-cuestionario/crece-cuestionario.component';
import { LoginComponent } from "./Views/login/login.component";
import { RegisterComponent } from "./Views/register/register.component";
import { CatalogosComponent } from "./Views/Administracion/cuestionarios/catalogos.component";
import { AppComponent } from './app.component';
import { CarruselComponent } from './Views/Home/carrusel/carrusel.component';
import { PruebaspdfComponent } from './Views/Administracion/pruebaspdf/pruebaspdf.component';

import { KendoComponent } from './Views/Administracion/kendo/kendo.component';
import { CatalogoProgramasComponent } from './Views/Administracion/catalogo-programas/catalogo-programas.component';
import { ChrtshighComponent } from './Views/Administracion/highcharts/chrtshigh.component';
import { Login2Component } from './Views/Administracion/login2/login2.component';
import { PruebaExcelComponent } from './Views/Administracion/prueba-excel/prueba-excel.component';
import { CreceRespuestasComponent } from './Views/Planeacion/crece-respuestas/crece-respuestas.component';
import { CreceMonitorAvanceComponent } from './Views/Planeacion/crece-monitor-avance/crece-monitor-avance.component';
import { CreceInformeComponent } from './Views/Planeacion/crece-informe/crece-informe.component';
import { FormatoComponent } from './Views/Reestructura/formato/formato.component';
import { PresentacionComponent } from './Views/Reestructura/presentacion/presentacion.component';
import { RestrucAdminComponent } from './Views/Reestructura/restruc-admin/restruc-admin.component';
import { RestrucPrograComponent } from './Views/Reestructura/restruc-progra/restruc-progra.component';
import { TableroReestructuraComponent } from './Views/Reestructura/tablero-reestructura/tablero-reestructura.component';
import { TabsTableroComponent } from './Views/Reestructura/tabs-tablero/tabs-tablero.component';
import { TableroPowerComponent } from './Views/Reestructura/tabs-tablero/tablero-power/tablero-power.component';

import { AuthGuard } from './shared/guards/auth.guard'
import { OnExitGuard } from './shared/guards/on-exit.guard'
import { IndiceDppComponent } from './Views/IndiceDpp/indice-dpp/indice-dpp.component';
import { IntegradorComponent } from './Views/Capacitacion/integrador/integrador.component';
import { TableroComponent } from './Views/Capacitacion/tablero/tablero.component';
import { FormularioPacComponent } from './Views/Capacitacion/formulario-pac/formulario-pac.component';
import { CensoComponent } from './Views/CensoGpR/censo/censo.component';
import { CensoSeguimientoComponent } from './Views/CensoGpR/censo-seguimiento/censo-seguimiento.component';
import { CensoTableroComponent } from './Views/CensoGpR/censo-tablero/censo-tablero.component';
import { CreceFormualarioComponent } from './Views/Planeacion/crece-formulario/crece-formualario.component';
import { DirectorioGpRComponent } from './Views/CensoGpR/directorio-gp-r/directorio-gp-r.component';
import { AvanceRestructuraComponent } from './Views/Reestructura/avance-restructura/avance-restructura.component';
import { PruebaFirebaseComponent } from './Views/Administracion/prueba-firebase/prueba-firebase.component';
import { Pf2023Component } from './Views/PaqueteFiscal2023/pf2023/pf2023.component';
import { GoogleMapsComponent } from './Views/Administracion/google-maps/google-maps.component';
import { PaisesComponent } from './Views/Administracion/Mapas/paises/paises.component';
import { APGComponent } from './Views/Administracion/ConsumirApis/apg/apg.component';
import { MapaComponent } from './Views/Administracion/BienesServicios/mapa/mapa.component';
import { RoleGuardServiceService } from './services/role-guard-service.service';
import { CreceProgramacionComponent } from './Views/Programacion/crece-programacion/crece-programacion.component';
import { HomePf2023Component } from './Views/EquipoGpR/Ejercicio2023/Home2023/Home/home-pf2023.component';
//import { Planeacion2023Component } from './Views/EquipoGpR/Ejercicio2023/Home2023/Planeacion/planeacion2023.component';
import { Planeacion2023Component } from './Views/EquipoGpR/Ejercicio2023/Home2023/Planeacion/planeacion2023.component';
import { Programacion2023Component } from './Views/EquipoGpR/Ejercicio2023/Home2023/Programacion/programacion2023.component';
import { Seguimiento2023Component } from './Views/EquipoGpR/Ejercicio2023/Home2023/Seguimiento/seguimiento2023.component';

const routes: Routes = [

  { path: 'catalogos', component: CatalogosComponent, canActivate: [AuthGuard] },

  { path: 'usuarios', component: UsuariosComponent, canActivate: [RoleGuardServiceService, AuthGuard] },
  { path: 'crece', component: CreceComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'crece_preguntas', component: CreceCuestionarioComponent, canActivate: [AuthGuard] },
  { path: "login", component: LoginComponent },
  { path: "login2", component: Login2Component },
  { path: "register", component: RegisterComponent, pathMatch: "full" },
  { path: "carrusel", component: CarruselComponent, canActivate: [AuthGuard] },
  { path: "PF2023", component: HomePf2023Component, canActivate: [AuthGuard] },
  { path: "pruebaspdf", component: PruebaspdfComponent, canActivate: [AuthGuard] },
  { path: "pruebaExcel", component: PruebaExcelComponent, canActivate: [AuthGuard] },
  { path: "crece-respuestas", component: CreceRespuestasComponent, canActivate: [AuthGuard] },
  { path: "crece-monitor-seguimiento", component: CreceMonitorAvanceComponent, canActivate: [AuthGuard] },
  { path: "crece-informe", component: CreceInformeComponent, canActivate: [AuthGuard] },
  { path: "formato", component: FormatoComponent, canActivate: [AuthGuard] },
  { path: "presentacion", component: PresentacionComponent, canActivate: [AuthGuard] },
  { path: "re-admin", component: RestrucAdminComponent, canActivate: [AuthGuard] },
  { path: "re-progra", component: RestrucPrograComponent, canActivate: [AuthGuard] },
  { path: "censo", component: CensoComponent, canActivate: [AuthGuard] },
  { path: "censo-seguimiento", component: CensoSeguimientoComponent, canActivate: [AuthGuard] },
  { path: "censo-tablero", component: CensoTableroComponent, canActivate: [AuthGuard] },
  {
    path: "tabs-tablero", component: TabsTableroComponent, canActivate: [AuthGuard],
    children: [
      {
        path: "tablero-reestructura", component: TableroReestructuraComponent, canActivate: [AuthGuard]
      },
      {
        path: 'tablero-power', component: TableroPowerComponent, canActivate: [AuthGuard]
      },
    ],
  },
  { path: "formulario_pac", component: FormularioPacComponent, canActivate: [AuthGuard] },
  { path: "integrador", component: IntegradorComponent, canActivate: [AuthGuard] },
  { path: "tablero_pac", component: TableroComponent, canActivate: [AuthGuard] },

  { path: "indicedpp", component: IndiceDppComponent, canActivate: [AuthGuard] },
  { path: "kendoui", component: KendoComponent, canActivate: [AuthGuard] },
  { path: "catalogo_pp", component: CatalogoProgramasComponent, canActivate: [AuthGuard] },
  { path: "crece-formulario", component: CreceFormualarioComponent, canActivate: [AuthGuard], canDeactivate: [OnExitGuard] },
  { path: "directorio", component: DirectorioGpRComponent, canActivate: [AuthGuard] },
  { path: "avance-res", component: AvanceRestructuraComponent, canActivate: [AuthGuard] },
  { path: "prueba-firestore", component: PruebaFirebaseComponent, canActivate: [AuthGuard] },
  { path: "pf2023", component: Pf2023Component, canActivate: [AuthGuard] },
  { path: "google-map", component: GoogleMapsComponent, canActivate: [AuthGuard] },
  { path: "map-paises", component: PaisesComponent, canActivate: [AuthGuard] },
  { path: "apg", component: APGComponent, canActivate: [AuthGuard] },
  { path: "mapa_bienes", component: MapaComponent, canActivate: [AuthGuard] },
  { path: "crece_programacion", component: CreceProgramacionComponent, canActivate: [AuthGuard] },

  { path: "chrtshigh", component: ChrtshighComponent },

  { path: '', redirectTo: 'login2', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {
      scrollPositionRestoration: 'top',
      enableTracing: true,
      preloadingStrategy: PreloadAllModules,
      
    }
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
