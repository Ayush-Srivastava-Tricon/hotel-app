import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageOtaRoomsComponent } from './manage-ota-rooms.component';

const routes: Routes = [
  {
    path:'',
    component:ManageOtaRoomsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageOtaRoomsRoutingModule { }
