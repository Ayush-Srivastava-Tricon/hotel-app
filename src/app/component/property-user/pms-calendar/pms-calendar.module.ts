import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PmsCalendarRoutingModule } from './pms-calendar-routing.module';
import { PmsCalendarComponent } from './pms-calendar.component';


@NgModule({
  declarations: [PmsCalendarComponent],
  imports: [
    CommonModule,
    PmsCalendarRoutingModule
  ],
  exports:[PmsCalendarComponent]
})
export class PmsCalendarModule { }
