import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagePropertyComponent } from './manage-property.component';

const routes: Routes = [
  {
    path:'',
    component:ManagePropertyComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagePropertyRoutingModule { }
