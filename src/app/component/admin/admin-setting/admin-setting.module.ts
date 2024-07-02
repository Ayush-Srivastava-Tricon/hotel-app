import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminSettingRoutingModule } from './admin-setting-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminSettingComponent } from './admin-setting.component';


@NgModule({
  declarations: [AdminSettingComponent],
  imports: [
    CommonModule,
    AdminSettingRoutingModule,
    ReactiveFormsModule
  ],
  exports:[
    AdminSettingComponent
  ]
})
export class AdminSettingModule { }
