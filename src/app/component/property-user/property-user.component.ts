import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { AlertService } from 'src/app/shared/alert.service';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-property-user',
  templateUrl: './property-user.component.html',
  styleUrls: ['./property-user.component.scss']
})
export class PropertyUserComponent {

  currentPropertyId:any=0;
  loggedUserData:any={};
  hideNavbar:boolean=false;
  defaultLang:any='';

  constructor(private router:Router,private adminService:AdminService,private alert:AlertService,private translate:TranslationService){}

  ngOnInit(){
    if(localStorage.getItem("selectedPropertyId")){
      this.currentPropertyId = localStorage.getItem("selectedPropertyId");
    }else{
      this.currentPropertyId = localStorage.getItem("userId");
    }
    this.loggedUserData = JSON.parse(<any>localStorage.getItem('loggedUserData'));
  }



  logout(){
    if(this.adminService.isAdmin()){
      localStorage.removeItem("selectedPropertyId");
      localStorage.removeItem("propertyList");
      this.router.navigate(['/admin']);
      this.alert.alert("error","Logged Out Successfully","Success",{ displayDuration: 2000, pos: 'top' })
    }else{
      localStorage.clear();
      this.router.navigate(['/login']);
      this.alert.alert("error","Logged Out Successfully","Success",{ displayDuration: 2000, pos: 'top' })
    }
    
  }

  setDefaultLang(){
    this.translate.setLanguage(this.defaultLang);
  }

  receiveChildEvent(event:any){
    if(event.action == 'setDefaultLang'){
      this.defaultLang=event.value;
      this.setDefaultLang();
    }else if(event.action == 'changeLang'){
      this.translate.setLanguage(event.value);
    }
  }

  openNav(){
    let el:any =  document.getElementById("mySidenav");
    el.style.width = "282px";
  }
  closeNav(){
    let el:any =  document.getElementById("mySidenav");
    el.style.width = "0";
  }

  hideNav(){
    this.hideNavbar = !this.hideNavbar;
  }
}
