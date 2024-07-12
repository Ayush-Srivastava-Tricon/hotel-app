import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PmsCalendarRoutingModule } from './pms-calendar-routing.module';
import { PmsCalendarComponent } from './pms-calendar.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [PmsCalendarComponent],
  imports: [
    CommonModule,
    PmsCalendarRoutingModule,
    FormsModule
  ],
  exports:[PmsCalendarComponent]
})
export class PmsCalendarModule { }
