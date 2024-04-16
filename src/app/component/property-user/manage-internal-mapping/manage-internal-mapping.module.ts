import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageInternalMappingRoutingModule } from './manage-internal-mapping-routing.module';
import { ManageInternalMappingComponent } from './manage-internal-mapping.component';


@NgModule({
  declarations: [ManageInternalMappingComponent],
  imports: [
    CommonModule,
    ManageInternalMappingRoutingModule
  ],
  exports:[ManageInternalMappingComponent]
})
export class ManageInternalMappingModule { }
