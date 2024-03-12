import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageUserRoutingModule } from './manage-user-routing.module';
import { ManageUserComponent } from './manage-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ManageUserComponent],
  imports: [
    CommonModule,
    ManageUserRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[ManageUserComponent]
})
export class ManageUserModule { }
