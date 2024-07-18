import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PropertyUserRoutingModule } from './property-user-routing.module';
import { PropertyUserComponent } from './property-user.component';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageDropdownModule } from "../../shared/language-dropdown/language-dropdown.module";


@NgModule({
  declarations: [PropertyUserComponent],
  imports: [
    CommonModule,
    PropertyUserRoutingModule,
    TranslateModule,
    LanguageDropdownModule
],
  exports:[PropertyUserComponent]
})
export class PropertyUserModule { }
