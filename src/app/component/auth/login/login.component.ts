import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  userType:any='';
  userModal:any={};

  constructor(private router : Router,private authService:AuthService){}

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
            }else{
              alert("wrong crednetial")            //need to be change
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