import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import "../../constants/javascript.variable";
import { TranslateModule } from '@ngx-translate/core';
import { TranslationService } from 'src/app/services/translation.service';

@NgModule({
  declarations: [AdminComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    TranslateModule
  ],
  exports:[AdminComponent],
  providers:[TranslationService]

})
export class AdminModule { }