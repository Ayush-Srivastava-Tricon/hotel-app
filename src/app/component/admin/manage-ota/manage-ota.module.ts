import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageOtaRoutingModule } from './manage-ota-routing.module';
import { ManageOtaComponent } from './manage-ota.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [ManageOtaComponent],
  imports: [
    CommonModule,
    ManageOtaRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule
  ],
  exports:[ManageOtaComponent]
})
export class ManageOtaModule { }
