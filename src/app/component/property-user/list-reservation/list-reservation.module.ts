import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListReservationRoutingModule } from './list-reservation-routing.module';
import { ListReservationComponent } from './list-reservation.component';
import { FormsModule } from '@angular/forms';
import { MultiselectDropdownModule } from 'src/app/shared/multiselect-dropdown/multiselect-dropdown.module';


@NgModule({
  declarations: [ListReservationComponent],
  imports: [
    CommonModule,
    ListReservationRoutingModule,
    FormsModule,
    MultiselectDropdownModule
  ],
  exports:[
    ListReservationComponent
  ]
})
export class ListReservationModule { }
