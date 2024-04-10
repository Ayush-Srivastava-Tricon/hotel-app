import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageOtaUserRoutingModule } from './manage-ota-user-routing.module';
import { ManageOtaUserComponent } from './manage-ota-user.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ManageOtaUserComponent],
  imports: [
    CommonModule,
    ManageOtaUserRoutingModule,
    ReactiveFormsModule
  ],
  exports:[ManageOtaUserComponent]
})
export class ManageOtaUserModule { }
