import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import {TranslationService} from "./../../services/translation.service";
import { HttpClient } from '@angular/common/http';
import { AlertService } from 'src/app/shared/alert.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {


  dropdown:any= {};
  loggedUserData:any={};
  
  constructor(private router: Router, private authService: AuthService, private translate:TranslationService,private alert:AlertService,private http:HttpClient) { }

  logout() {
    const role_id:any = this.authService.roleId ? this.authService.roleId : JSON.parse(<any>localStorage.getItem("roleId"));
    const userId:any = this.authService.userId ? this.authService.userId : JSON.parse(<any>localStorage.getItem("userId"));
    this.authService.logout(role_id, userId, (res: any) => {
      if (res && localStorage.getItem("isadmin")) {
        this.router.navigate(['/login']);
        localStorage.clear();
        this.alert.alert("error","Logged Out Successfully","Success",{ displayDuration: 2000, pos: 'top' })
      } else {
        this.router.navigate(['/login']);
        localStorage.clear();
        this.alert.alert("error","Logged Out Successfully","Success",{ displayDuration: 2000, pos: 'top' })
      }
    })

  }

  ngOnInit(){
    this.loggedUserData = JSON.parse(<any>localStorage.getItem('loggedUserData'));
  }
  
  ngAfterViewInit(){
    this.setDefaultLang();
  }

  setDefaultLang(){
    let getCurrentLang:any = localStorage.getItem("defaultLang");
    if(getCurrentLang){
      this.translate.setLanguage(getCurrentLang);
    }else{
      this.translate.setLanguage("en");
    }
  }

  changeLang(event:any){
    this.translate.setLanguage(event.target.value);
  }


}
