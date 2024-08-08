import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerfiluserPageRoutingModule } from './perfiluser-routing.module';

import { PerfilUserPage } from './perfiluser.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PerfiluserPageRoutingModule
  ],
  declarations: [PerfilUserPage]
})
export class PerfiluserPageModule {}
