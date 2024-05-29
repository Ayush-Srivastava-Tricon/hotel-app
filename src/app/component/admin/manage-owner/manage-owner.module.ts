import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageUserRoutingModule } from './manage-owner-routing.module';
import { ManageOwnerComponent } from './manage-owner.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [ManageOwnerComponent],
  imports: [
    CommonModule,
    ManageUserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  exports:[ManageOwnerComponent,TranslateModule]
})
export class ManageOwnerModule { }
