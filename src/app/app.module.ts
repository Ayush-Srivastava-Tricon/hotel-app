import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http" ;
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient} from '@angular/common/http';
import "../app/constants/javascript.variable";
import { EditorModule,TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';

// const isProduction:boolean = window.location.href.includes("hotel-app") ? true : false;

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
  BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
  }),
  EditorModule
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide :TINYMCE_SCRIPT_SRC, useValue:'tinymce/tinymce.min.js'}
  ],
  bootstrap: [AppComponent],
  exports:[TranslateModule,EditorModule]
})
export class AppModule { }
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http,`./assets/i18n/`, '.json');
  // return new TranslateHttpLoader(http,`./${isProduction ? 'hotel-app/' : ''}assets/i18n/`, '.json');
}

