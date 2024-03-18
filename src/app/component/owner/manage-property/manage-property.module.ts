import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagePropertyRoutingModule } from './manage-property-routing.module';
import { ManagePropertyComponent } from './manage-property.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ManagePropertyComponent],
  imports: [
    CommonModule,
    ManagePropertyRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[ManagePropertyComponent]
})
export class ManagePropertyModule { }
