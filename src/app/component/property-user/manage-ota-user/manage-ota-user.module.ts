import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageOtaUserRoutingModule } from './manage-ota-user-routing.module';
import { ManageOtaUserComponent } from './manage-ota-user.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PropertyService } from 'src/app/services/property.service';


@NgModule({
  declarations: [ManageOtaUserComponent],
  imports: [
    CommonModule,
    ManageOtaUserRoutingModule,
    ReactiveFormsModule,
  ],
  exports:[ManageOtaUserComponent],
  providers:[PropertyService]
})
export class ManageOtaUserModule { }
