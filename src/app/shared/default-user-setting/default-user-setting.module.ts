import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DefaultUserSettingRoutingModule } from './default-user-setting-routing.module';
import { DefaultUserSettingComponent } from './default-user-setting.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [DefaultUserSettingComponent],
  imports: [
    CommonModule,
    DefaultUserSettingRoutingModule,
    FormsModule
  ],
  exports:[DefaultUserSettingComponent]
})
export class DefaultUserSettingModule { }
