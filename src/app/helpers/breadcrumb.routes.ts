import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//import { HomePf2023Component } from '../../../src/app/Views/EquipoGpR/Ejercicio2023/Home2023/Home/home-pf2023.component';
import { Planeacion2023Component } from '../../../src/app/Views/EquipoGpR/Ejercicio2023/Home2023/Planeacion/planeacion2023.component';
import { Programacion2023Component } from '../../../src/app/Views/EquipoGpR/Ejercicio2023/Home2023/Programacion/programacion2023.component';
import { Seguimiento2023Component } from '../../../src/app/Views/EquipoGpR/Ejercicio2023/Home2023/Seguimiento/seguimiento2023.component';

export const breadCrumbRoutes: Routes = [
   
    // {
    //     path: 'Home',
    //     redirectTo: ''
    // },
    {
        path: 'Planeacion',
        component: Planeacion2023Component
    },
    {
        path: 'Programacion',
        component: Programacion2023Component
    },
    {
        path: 'Seguimiento',
        component: Seguimiento2023Component
    }
];

export const appRoutingProviders = [];

export const breadCrumbRouting: ModuleWithProviders<RouterModule> = RouterModule.forRoot(breadCrumbRoutes);