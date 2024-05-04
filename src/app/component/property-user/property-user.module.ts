import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PropertyUserRoutingModule } from './property-user-routing.module';
import { PropertyUserComponent } from './property-user.component';


@NgModule({
  declarations: [PropertyUserComponent],
  imports: [
    CommonModule,
    PropertyUserRoutingModule
  ],
  exports:[PropertyUserComponent]
})
export class PropertyUserModule { }
