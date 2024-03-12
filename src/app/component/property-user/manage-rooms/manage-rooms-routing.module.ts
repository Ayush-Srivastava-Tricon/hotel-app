import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageRoomsComponent } from './manage-rooms.component';

const routes: Routes = [
  {
    path:'',
    component:ManageRoomsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageRoomsRoutingModule { }
