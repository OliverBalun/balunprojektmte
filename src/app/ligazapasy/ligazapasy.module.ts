import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LigazapasyPageRoutingModule } from './ligazapasy-routing.module';

import { LigazapasyPage } from './ligazapasy.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LigazapasyPageRoutingModule
  ],
  declarations: [LigazapasyPage]
})
export class LigazapasyPageModule {}
