import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotifinalPage } from './notifinal.page';

const routes: Routes = [
  {
    path: '',
    component: NotifinalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotifinalPageRoutingModule {}
