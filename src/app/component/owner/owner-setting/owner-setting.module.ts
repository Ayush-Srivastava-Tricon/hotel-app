import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OwnerSettingRoutingModule } from './owner-setting-routing.module';
import { FormsModule } from '@angular/forms';
import { OwnerSettingComponent } from './owner-setting.component';


@NgModule({
  declarations: [OwnerSettingComponent],
  imports: [
    CommonModule,
    OwnerSettingRoutingModule,
    FormsModule
  ],
  exports:[
    OwnerSettingComponent
  ]

})
export class OwnerSettingModule { }
