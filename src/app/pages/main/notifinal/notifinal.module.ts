import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotifinalPageRoutingModule } from './notifinal-routing.module';

import { NotifinalPage } from './notifinal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotifinalPageRoutingModule
  ],
  declarations: [NotifinalPage]
})
export class NotifinalPageModule {}
