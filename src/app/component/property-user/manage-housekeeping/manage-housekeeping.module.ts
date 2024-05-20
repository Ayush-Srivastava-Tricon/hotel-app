import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageHousekeepingRoutingModule } from './manage-housekeeping-routing.module';
import { ManageHousekeepingComponent } from './manage-housekeeping.component';


@NgModule({
  declarations: [ManageHousekeepingComponent],
  imports: [
    CommonModule,
    ManageHousekeepingRoutingModule
  ],
  exports:[ManageHousekeepingComponent]
})
export class ManageHousekeepingModule { }
