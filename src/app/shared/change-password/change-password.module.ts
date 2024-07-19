import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChangePasswordRoutingModule } from './change-password-routing.module';
import { ChangePasswordComponent } from './change-password.component';
import { FormsModule } from '@angular/forms';
import { OwnerService } from 'src/app/services/owner.service';


@NgModule({
  declarations: [ChangePasswordComponent],
  imports: [
    CommonModule,
    ChangePasswordRoutingModule,
    FormsModule
  ],
  exports:[ChangePasswordComponent],
  providers:[OwnerService]
})
export class ChangePasswordModule { }
