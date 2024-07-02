import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OwnerSettingRoutingModule } from './owner-setting-routing.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { OwnerComponent } from '../owner.component';
import { OwnerSettingComponent } from './owner-setting.component';


@NgModule({
  declarations: [OwnerSettingComponent],
  imports: [
    CommonModule,
    OwnerSettingRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports:[
    OwnerSettingComponent
  ]

})
export class OwnerSettingModule { }
