import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultUserSettingComponent } from './default-user-setting.component';

const routes: Routes = [

  {
    path:'',
    component:DefaultUserSettingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DefaultUserSettingRoutingModule { }
