import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OwnerComponent } from './owner.component';
import { OwnerRoutingModule } from './owner-routing.module';
import {  TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [OwnerComponent],
  imports: [
    CommonModule,
    OwnerRoutingModule,
    TranslateModule
  //   TranslateModule.forRoot({
  //     loader: {
  //       provide: TranslateLoader,
  //       useFactory: HttpLoaderFactory,
  //       deps: [HttpClient]
  //   }
  // })
  ],
  exports:[OwnerComponent]
})
export class OwnerModule { }
// export function HttpLoaderFactory(http: HttpClient) {
//   return new TranslateHttpLoader(http, './assets/i18n/', '.json');
// }