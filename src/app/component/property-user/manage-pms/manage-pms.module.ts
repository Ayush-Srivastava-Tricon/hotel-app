import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagePmsRoutingModule } from './manage-pms-routing.module';
import { ManagePmsComponent } from './manage-pms.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [ManagePmsComponent],
  imports: [
    CommonModule,
    ManagePmsRoutingModule,
    FormsModule
  ],
  exports:[ManagePmsComponent]
})
export class ManagePmsModule { }
