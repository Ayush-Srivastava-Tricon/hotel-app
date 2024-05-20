import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RatePlanRoutingModule } from './rate-plan-routing.module';
import { RatePlanComponent } from './rate-plan.component';
import { FormsModule } from '@angular/forms';
import { MultiselectDropdownModule } from 'src/app/shared/multiselect-dropdown/multiselect-dropdown.module';


@NgModule({
  declarations: [RatePlanComponent],
  imports: [
    CommonModule,
    RatePlanRoutingModule,
    FormsModule,
    MultiselectDropdownModule
  ],
  exports:[RatePlanComponent]
})
export class RatePlanModule { }
