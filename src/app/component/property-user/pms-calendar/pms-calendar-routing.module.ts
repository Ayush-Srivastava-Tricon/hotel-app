import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PmsCalendarComponent } from './pms-calendar.component';

const routes: Routes = [
  {
    path:'',
    component:PmsCalendarComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PmsCalendarRoutingModule { }
