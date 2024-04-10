import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageOtaUserComponent } from './manage-ota-user.component';

const routes: Routes = [
  {
    path:'',
    component:ManageOtaUserComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageOtaUserRoutingModule { }
