import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditlistPage } from './editlist.page';

const routes: Routes = [
  {
    path: '',
    component: EditlistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditlistPageRoutingModule {}
