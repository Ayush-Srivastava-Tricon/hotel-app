import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/shared/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  userType:any='';
  userModal:any={};

  constructor(private router : Router,private authService:AuthService,private alertService:AlertService){}

  selectUserType(userType:any,roleNum:number){
    localStorage.clear();
    localStorage.setItem(`is${userType}`,'true');
    this.userType=userType;
    this.userModal['role'] = roleNum.toString();
  }

  login(){
    console.log(23);
    
      this.setUserLoggedIn();
      this.authService.login(this.userModal,(res:any)=>{
        if(res.status == 200){
              console.log(res);
              this.setAccessToken(res);
              this.setUserAndRole(res);
              this.router.navigate([this.userType]);
              this.alertService.alert("success", res.message, "Success", { displayDuration: 2000, pos: 'top' });
            }else{
              this.alertService.alert("error",res.error.message, "Error", { displayDuration: 2000, pos: 'top' });      //need to be change
        }
      })
  }

  setAccessToken(data:any){
    localStorage.setItem("token",data.Bearer);
    localStorage.setItem("refreshToken",data.RefreshToken);
    this.authService.setAccessToken(data.Bearer,data.RefreshToken);
  }

  setUserAndRole(data:any){
    this.authService.setRoleAndUser(data);
  }

  setUserLoggedIn(){
    localStorage.setItem("isLoggedIn",'true');
  }



}