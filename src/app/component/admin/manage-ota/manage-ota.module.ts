import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageOtaRoutingModule } from './manage-ota-routing.module';
import { ManageOtaComponent } from './manage-ota.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ManageOtaComponent],
  imports: [
    CommonModule,
    ManageOtaRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports:[ManageOtaComponent]
})
export class ManageOtaModule { }
