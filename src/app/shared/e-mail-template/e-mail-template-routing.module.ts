import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EMailTemplateComponent } from './e-mail-template.component';

const routes: Routes = [
  {
    path:'',
    component:EMailTemplateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EMailTemplateRoutingModule { }
