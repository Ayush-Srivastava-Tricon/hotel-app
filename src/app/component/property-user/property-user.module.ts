import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PropertyUserRoutingModule } from './property-user-routing.module';
import { PropertyUserComponent } from './property-user.component';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [PropertyUserComponent],
  imports: [
    CommonModule,
    PropertyUserRoutingModule,
    TranslateModule
  ],
  exports:[PropertyUserComponent]
})
export class PropertyUserModule { }
