import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageInternalMappingRoutingModule } from './manage-internal-mapping-routing.module';
import { ManageInternalMappingComponent } from './manage-internal-mapping.component';
import { PropertyService } from 'src/app/services/property.service';


@NgModule({
  declarations: [ManageInternalMappingComponent],
  imports: [
    CommonModule,
    ManageInternalMappingRoutingModule
  ],
  exports:[ManageInternalMappingComponent],
  providers:[PropertyService]
})
export class ManageInternalMappingModule { }
