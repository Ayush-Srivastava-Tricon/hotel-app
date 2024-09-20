import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PmsCalendarRoutingModule } from './pms-calendar-routing.module';
import { PmsCalendarComponent } from './pms-calendar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [PmsCalendarComponent],
  imports: [
    CommonModule,
    PmsCalendarRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[PmsCalendarComponent]
})
export class PmsCalendarModule { }
