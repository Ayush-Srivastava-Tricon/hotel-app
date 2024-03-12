import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageRoomsRoutingModule } from './manage-rooms-routing.module';
import { ManageRoomsComponent } from './manage-rooms.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ManageRoomsComponent],
  imports: [
    CommonModule,
    ManageRoomsRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],exports:[ManageRoomsComponent]
})
export class ManageRoomsModule { }
