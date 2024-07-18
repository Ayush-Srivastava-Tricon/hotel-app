import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageDropdownComponent } from './language-dropdown.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [LanguageDropdownComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports:[LanguageDropdownComponent]
})
export class LanguageDropdownModule { }
