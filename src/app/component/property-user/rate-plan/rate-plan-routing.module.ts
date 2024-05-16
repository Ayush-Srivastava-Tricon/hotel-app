import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RatePlanComponent } from './rate-plan.component';

const routes: Routes = [
  {
    path:'',
    component:RatePlanComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RatePlanRoutingModule { }
