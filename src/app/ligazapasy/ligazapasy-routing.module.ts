import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LigazapasyPage } from './ligazapasy.page';

const routes: Routes = [
  {
    path: '',
    component: LigazapasyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LigazapasyPageRoutingModule {}
