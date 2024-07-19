import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminDashboardRoutingModule } from './dashboard-routing.module';
import { AdminDashboardComponent } from './dashboard.component';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AdminService } from 'src/app/services/admin.service';


@NgModule({
  declarations: [AdminDashboardComponent],
  imports: [
    CommonModule,
    AdminDashboardRoutingModule,
    FormsModule,
    TranslateModule
  ],
  exports:[AdminDashboardComponent],
  providers:[AdminService,TranslateService]
})
export class AdminDashboardModule { }
