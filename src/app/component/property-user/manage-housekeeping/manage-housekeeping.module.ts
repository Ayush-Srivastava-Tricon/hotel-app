import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageHousekeepingRoutingModule } from './manage-housekeeping-routing.module';
import { ManageHousekeepingComponent } from './manage-housekeeping.component';
import { FormsModule } from '@angular/forms';
import { MultiselectDropdownModule } from 'src/app/shared/multiselect-dropdown/multiselect-dropdown.module';
import { PropertyService } from 'src/app/services/property.service';


@NgModule({
  declarations: [ManageHousekeepingComponent],
  imports: [
    CommonModule,
    ManageHousekeepingRoutingModule,
    FormsModule,
    MultiselectDropdownModule
  ],
  exports:[ManageHousekeepingComponent],
  providers:[PropertyService]
})
export class ManageHousekeepingModule { }
