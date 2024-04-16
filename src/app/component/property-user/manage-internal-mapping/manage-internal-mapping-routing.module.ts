import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageInternalMappingComponent } from './manage-internal-mapping.component';

const routes: Routes = [
  {
    path:'',
    component:ManageInternalMappingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageInternalMappingRoutingModule { }
