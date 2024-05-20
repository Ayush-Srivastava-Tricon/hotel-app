import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagePmsComponent } from './manage-pms.component';

const routes: Routes = [
  {
    path:'',
    component:ManagePmsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagePmsRoutingModule { }
