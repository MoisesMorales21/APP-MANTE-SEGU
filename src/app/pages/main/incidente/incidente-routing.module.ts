import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IncidentePage } from './incidente.page';

const routes: Routes = [
  {
    path: '',
    component: IncidentePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IncidentePageRoutingModule {}
