import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminDashboardRoutingModule } from './dashboard-routing.module';
import { AdminDashboardComponent } from './dashboard.component';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [AdminDashboardComponent],
  imports: [
    CommonModule,
    AdminDashboardRoutingModule,
    FormsModule,
    TranslateModule
  ],
  exports:[AdminDashboardComponent]
})
export class AdminDashboardModule { }
