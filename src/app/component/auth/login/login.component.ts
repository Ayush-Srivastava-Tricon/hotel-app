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
    this.userModal['role'] = roleNum;
  }

  login(){
      this.authService.login(this.userModal,(res:any)=>{
        if(res.status == 200){
              console.log(res);
            }else{
              this.router.navigate([this.userType]);
        }
      })
  }

}
