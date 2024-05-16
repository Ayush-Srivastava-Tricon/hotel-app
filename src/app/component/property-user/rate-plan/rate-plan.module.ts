import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RatePlanRoutingModule } from './rate-plan-routing.module';
import { RatePlanComponent } from './rate-plan.component';


@NgModule({
  declarations: [RatePlanComponent],
  imports: [
    CommonModule,
    RatePlanRoutingModule
  ],
  exports:[RatePlanComponent]
})
export class RatePlanModule { }
