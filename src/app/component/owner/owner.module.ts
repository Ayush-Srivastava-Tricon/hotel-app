import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OwnerComponent } from './owner.component';
import { OwnerRoutingModule } from './owner-routing.module';


@NgModule({
  declarations: [OwnerComponent],
  imports: [
    CommonModule,
    OwnerRoutingModule,
  ],
  exports:[OwnerComponent]
})
export class OwnerModule { }
