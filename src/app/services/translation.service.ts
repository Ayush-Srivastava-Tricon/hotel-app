import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  translateUrl:any = 'http://localhost:3000/data/'

  constructor(private translate: TranslateService,private http:HttpClient) {}

  setLanguage(language: string) {
    this.translate.use(language);
  }

  setNewTranslation(params:any,lang:any,callback:any){
    return this.http.put(`${this.translateUrl}${lang}`,params).subscribe((data:any)=>callback(data));
  }

}
