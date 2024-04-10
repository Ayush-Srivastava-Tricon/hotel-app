import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageOtaComponent } from './manage-ota.component';

const routes: Routes = [
  {
    path:'',
    component:ManageOtaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageOtaRoutingModule { }
