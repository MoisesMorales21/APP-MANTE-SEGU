import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { IncidentePageRoutingModule } from './incidente-routing.module';

import { IncidentePage } from './incidente.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IncidentePageRoutingModule
  ],
  declarations: [IncidentePage]
})
export class IncidentePageModule {}
