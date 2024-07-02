import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OwnerSettingComponent } from './owner-setting.component';

const routes: Routes = [
  {
    path:'',
    component:OwnerSettingComponent

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OwnerSettingRoutingModule { }
