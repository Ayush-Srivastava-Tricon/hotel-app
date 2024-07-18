import { Component } from '@angular/core';
import { OwnerService } from 'src/app/services/owner.service';
import { AlertService } from '../alert.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {

  changePassConfig: any = {
    "user_id": 0,
    'role': 0,
    "existing_pass": "",
    "new_pass": ""
  };
  confirmPass: any = '';
  loader: boolean = false;
  error: any = { hasError: false, errorMsg: '', confirmError: false, confirmErrorMsg: '' };
  showPassword: boolean = false;


  constructor(private _service: OwnerService, private alert: AlertService, private commonService: CommonService) { }

  ngOnInit() {
    if (<any>localStorage.getItem("selectedPropertyId")) {               //only For Property User
      this.changePassConfig.user_id = JSON.parse(<any>localStorage.getItem("selectedPropertyId"));
      this.changePassConfig.role = 3;
    } else {
      this.changePassConfig.user_id = JSON.parse(<any>localStorage.getItem("userId"));
      this.changePassConfig.role = JSON.parse(<any>localStorage.getItem("roleId"));
    }
  }

  changePassword() {
    if (this.checkValidation()) {
      this.loader = true;
      this._service.changePassword(this.changePassConfig, (res: any) => {
        if (res.status == 200) {
          this.loader = false;
          this.alert.alert("success", res.message, "Success", { displayDuration: 2000, pos: 'top' });
        }
        this.loader = false;
        this.alert.alert("error", res.error ? res.error.message : res.message, "Error", { displayDuration: 2000, pos: 'top' });
      })
    } else {
      this.alert.alert("error", "Mandatory fields", "Error", { displayDuration: 2000, pos: 'top' });
    }
  }

  checkValidation() {
    return !!this.changePassConfig.existing_pass && !!this.changePassConfig.new_pass;
  }

  validatePass() {
    if (this.commonService.validatePassword(this.changePassConfig.new_pass)) {
      this.error.hasError = true;
      this.error.errorMsg = "Password Should Alphanumeric";
    } else {
      this.error.hasError = false;
    }
  }

  comparePassword() {
    if (this.changePassConfig.new_pass != this.confirmPass) {
      this.error.confirmError = true;
      this.error.confirmErrorMsg = "Password Doesn't Match!";
    } else {
      this.error.confirmError = false;
    }
  }
}
