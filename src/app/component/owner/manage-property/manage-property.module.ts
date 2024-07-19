import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagePropertyRoutingModule } from './manage-property-routing.module';
import { ManagePropertyComponent } from './manage-property.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { OwnerService } from 'src/app/services/owner.service';


@NgModule({
  declarations: [ManagePropertyComponent],
  imports: [
    CommonModule,
    ManagePropertyRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[ManagePropertyComponent],
  providers:[OwnerService]
})
export class ManagePropertyModule { }
