import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminDashboardRoutingModule } from './dashboard-routing.module';
import { AdminDashboardComponent } from './dashboard.component';


@NgModule({
  declarations: [AdminDashboardComponent],
  imports: [
    CommonModule,
    AdminDashboardRoutingModule
  ],
  exports:[AdminDashboardComponent]
})
export class AdminDashboardModule { }
