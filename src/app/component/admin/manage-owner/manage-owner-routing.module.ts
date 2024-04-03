import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageOwnerComponent } from './manage-owner.component';

const routes: Routes = [
  {
    path:'',
    component:ManageOwnerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageUserRoutingModule { }
