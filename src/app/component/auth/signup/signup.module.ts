import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignupRoutingModule } from './signup-routing.module';
import { SignupComponent } from './signup.component';
import { AuthService } from 'src/app/services/auth.service';


@NgModule({
  declarations: [SignupComponent],
  imports: [
    CommonModule,
    SignupRoutingModule
  ],
  exports:[SignupComponent],
  providers:[AuthService]

})
export class SignupModule { }
