import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageHousekeepingComponent } from './manage-housekeeping.component';

const routes: Routes = [
  {
    path:'',
    component:ManageHousekeepingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageHousekeepingRoutingModule { }
