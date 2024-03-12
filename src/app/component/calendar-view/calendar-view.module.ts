import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalendarViewRoutingModule } from './calendar-view-routing.module';
import { CalendarViewComponent } from './calendar-view.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [CalendarViewComponent],
  imports: [
    CommonModule,
    CalendarViewRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[CalendarViewComponent]
})
export class CalendarViewModule { }
