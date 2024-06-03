import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomTranslationComponent } from './custom-translation.component';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [CustomTranslationComponent],
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule
  ],
  exports:[CustomTranslationComponent]
})
export class CustomTranslationModule { }
