import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageOtaRoomsRoutingModule } from './manage-ota-rooms-routing.module';
import { ManageOtaRoomsComponent } from './manage-ota-rooms.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ManageOtaRoomsComponent],
  imports: [
    CommonModule,
    ManageOtaRoomsRoutingModule,
    ReactiveFormsModule
  ],
  exports:[ManageOtaRoomsComponent]
})
export class ManageOtaRoomsModule { }
