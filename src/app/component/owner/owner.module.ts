import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OwnerComponent } from './owner.component';
import { OwnerRoutingModule } from './owner-routing.module';
import {  TranslateModule } from '@ngx-translate/core';
import { LanguageDropdownModule } from "../../shared/language-dropdown/language-dropdown.module";

@NgModule({
  declarations: [OwnerComponent],
  imports: [
    CommonModule,
    OwnerRoutingModule,
    TranslateModule,
    LanguageDropdownModule
    //   TranslateModule.forRoot({
    //     loader: {
    //       provide: TranslateLoader,
    //       useFactory: HttpLoaderFactory,
    //       deps: [HttpClient]
    //   }
    // })
    ,
    LanguageDropdownModule
],
  exports:[OwnerComponent]
})
export class OwnerModule { }
// export function HttpLoaderFactory(http: HttpClient) {
//   return new TranslateHttpLoader(http, './assets/i18n/', '.json');
// }