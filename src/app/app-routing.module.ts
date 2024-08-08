import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
 
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'main',
    loadChildren: () => import('./pages/main/main.module').then( m => m.MainPageModule)
  },
  { path: 'editarperfil',
  loadChildren: () => import('./pages/main/editarperfil/editarperfil.module').then(m => m.EditarperfilPageModule) 
  },
  {
    path: 'notificaciones',
    loadChildren: () => import('./pages/main/notificaciones/notificaciones.module').then(m => m.NotificacionesPageModule)
  },
  {
    path: 'main/incidente/:id',
    loadChildren: () => import('./pages/main/incidente/incidente.module').then(m => m.IncidentePageModule)
  },
  {
    path: 'notifinal',
    loadChildren: () => import('./pages/main/notifinal/notifinal.module').then(m => m.NotifinalPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
