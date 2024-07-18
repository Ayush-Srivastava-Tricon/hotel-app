import { Component, EventEmitter, Output } from '@angular/core';
import { AppConstants } from 'src/app/constants/app.constant';

@Component({
  selector: 'app-language-dropdown',
  templateUrl: './language-dropdown.component.html',
  styleUrls: ['./language-dropdown.component.scss']
})
export class LanguageDropdownComponent {

  showLangDropdown:boolean=false;
  currentLang:any='';
  currentFlag:any='';

  @Output() emitToParent:any = new EventEmitter();

  constructor(public constants:AppConstants){
    
  }

  ngOnInit(){
    let defaultLang:any = <any>localStorage.getItem("defaultLang");
    this.currentLang = this.constants.LANGUAGES[defaultLang.toLowerCase()];
    this.emitToParent.emit({action:'setDefaultLang',value:defaultLang.toLowerCase()});

  }

   
  changeLang(lang:any,flagPath:any){
    this.currentLang = lang.name;
    this.currentFlag = flagPath;
    this.emitToParent.emit({action:'changeLang',value:lang.key.toLowerCase()});
  }

}
