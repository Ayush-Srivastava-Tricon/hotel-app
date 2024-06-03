import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import "../../constants/javascript.variable";
import { TranslateModule } from '@ngx-translate/core';
import { TranslationService } from 'src/app/services/translation.service';
import { FormsModule } from '@angular/forms';
import { CustomTranslationModule } from 'src/app/shared/custom-translation/custom-translation.module';

@NgModule({
  declarations: [AdminComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    TranslateModule,
    FormsModule,
    CustomTranslationModule
  ],
  exports:[AdminComponent],
  providers:[TranslationService]

})
export class AdminModule { }