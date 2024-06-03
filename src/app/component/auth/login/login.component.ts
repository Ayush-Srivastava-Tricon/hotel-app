import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/services/common.service';
import { AlertService } from 'src/app/shared/alert.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  userType: any = '';
  userModal: any = {};
  isAdminLogin: boolean = false;
  loader: boolean = false;

  constructor(private router: Router, private authService: AuthService, private alertService: AlertService, private commonService: CommonService) { }

  ngOnInit() {
    console.log(this.router.url);
    if (this.router.url.endsWith("/adminLogin")) {
      this.isAdminLogin = true;
      this.selectUserType('admin', 1);
    }

  }

  selectUserType(userType: any, roleNum: number) {
    localStorage.clear();
    localStorage.setItem(`is${userType}`, 'true');
    this.userType = userType;
    this.userModal['role'] = roleNum.toString();
  }

  login() {
    this.loader = true;
    this.authService.login(this.userModal, (res: any) => {
      if (res.status == 200) {
        this.loader = false;
        console.log(res);
        this.setUserLoggedIn();
        this.setAccessToken(res);
        this.setUserAndRole(res);
        this.setDefaultLang();
        this.router.navigate([this.userType]);
        this.alertService.alert("success", res.message, "Success", { displayDuration: 2000, pos: 'top' });
      } else {
        this.loader = false;
        this.alertService.alert("error", res.error.message, "Error", { displayDuration: 2000, pos: 'top' });      //need to be change
      }
    })
  }

  setAccessToken(data: any) {
    localStorage.setItem("token", data.Bearer);
    localStorage.setItem("refreshToken", data.RefreshToken);
    this.authService.setAccessToken(data.Bearer, data.RefreshToken);
    this.commonService.setAccessToken(data.Bearer, data.RefreshToken);
  }

  setUserAndRole(data: any) {
    this.authService.setRoleAndUser(data);
    this.commonService.setRoleAndUser(data);
    localStorage.setItem("roleId", data.data.role)
    localStorage.setItem("userId", data.data.user_id)
    localStorage.setItem("loggedUserData", JSON.stringify(data.data));
  }

  setUserLoggedIn() {
    localStorage.setItem("isLoggedIn", 'true');
  }

  setDefaultLang(){
    localStorage.setItem("defaultLang","en");
  }



}