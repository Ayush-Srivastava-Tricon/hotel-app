import { Component } from '@angular/core';
import { TranslationService } from 'src/app/services/translation.service';
import { AlertService } from '../alert.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-custom-translation',
  templateUrl: './custom-translation.component.html',
  styleUrls: ['./custom-translation.component.scss']
})
export class CustomTranslationComponent {
  newKey:any='';
  newValue:any=''
  selectedLangToTranslate:any='';
  showModal:boolean=false;
  loader:boolean=false;

  constructor(private translate:TranslationService,private alert:AlertService){}


  setNewTransaltion(key:any,value:any,selectedLangToTranslate:any){
    this.loader=true;
    let underscore:any = key.split(" ").join("_").toUpperCase();
    let params:any = {};
    params[underscore] = value;
    
    this.translate.setNewTranslation(params,selectedLangToTranslate,(res:any)=>{
      if(res){
        this.loader=true;
        this.showModal=false;
        this.alert.alert("success",res.data,"Success",{displayDuration: 2000, pos: 'top'})
        location.reload();
      }
    })

  }
}
