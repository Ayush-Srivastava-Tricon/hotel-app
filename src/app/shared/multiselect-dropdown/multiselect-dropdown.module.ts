import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MultiselectDropdownComponent } from './multiselect-dropdown.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [MultiselectDropdownComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports:[MultiselectDropdownComponent]
})
export class MultiselectDropdownModule { }
