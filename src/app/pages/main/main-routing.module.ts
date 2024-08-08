import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
 
import { MainPage } from './main.page';

const routes: Routes = [
  {
    path: '',
    component: MainPage, 

    children:[  
      {
        path: 'notificaciones',
        loadChildren: () => import('./notificaciones/notificaciones.module').then( m => m.NotificacionesPageModule)
      },
      {
        path: 'historial',
        loadChildren: () => import('./historial/historial.module').then( m => m.HistorialPageModule)
      },
      {
        path: 'incidente',
        loadChildren: () => import('./incidente/incidente.module').then( m => m.IncidentePageModule)
      },
      {
        path: 'notifinal',
        loadChildren: () => import('./notifinal/notifinal.module').then( m => m.NotifinalPageModule)
      },
    ]
    
  },
 

  
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainPageRoutingModule {}
