import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EMailTemplateRoutingModule } from './e-mail-template-routing.module';
import { EMailTemplateComponent } from './e-mail-template.component';
import { FormsModule } from '@angular/forms';
import { EditorModule } from '@tinymce/tinymce-angular';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [EMailTemplateComponent],
  imports: [
    CommonModule,
    EMailTemplateRoutingModule,
    FormsModule,
    EditorModule,
    TranslateModule
  ],
  exports:[EMailTemplateComponent]
})
export class EMailTemplateModule { }
