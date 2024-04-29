import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PropertyUserRoutingModule } from './property-user-routing.module';
import { PropertyUserComponent } from './property-user.component';
import { ReservationComponent } from './reservation/reservation.component';


@NgModule({
  declarations: [PropertyUserComponent, ReservationComponent],
  imports: [
    CommonModule,
    PropertyUserRoutingModule
  ],
  exports:[PropertyUserComponent]
})
export class PropertyUserModule { }
