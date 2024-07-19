import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageOtaRoutingModule } from './manage-ota-routing.module';
import { ManageOtaComponent } from './manage-ota.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { AdminService } from 'src/app/services/admin.service';


@NgModule({
  declarations: [ManageOtaComponent],
  imports: [
    CommonModule,
    ManageOtaRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule
  ],
  exports:[ManageOtaComponent],
  providers:[AdminService]
})
export class ManageOtaModule { }
