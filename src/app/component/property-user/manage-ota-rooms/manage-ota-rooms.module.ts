import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageOtaRoomsRoutingModule } from './manage-ota-rooms-routing.module';
import { ManageOtaRoomsComponent } from './manage-ota-rooms.component';


@NgModule({
  declarations: [ManageOtaRoomsComponent],
  imports: [
    CommonModule,
    ManageOtaRoomsRoutingModule
  ],
  exports:[ManageOtaRoomsComponent]
})
export class ManageOtaRoomsModule { }
