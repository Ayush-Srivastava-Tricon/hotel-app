import { Component } from '@angular/core';
import { AppConstants } from 'src/app/constants/app.constant';
import { OwnerService } from 'src/app/services/owner.service';
import { AlertService } from '../alert.service';

@Component({
  selector: 'app-default-user-setting',
  templateUrl: './default-user-setting.component.html',
  styleUrls: ['./default-user-setting.component.scss']
})
export class DefaultUserSettingComponent {

  userSettingConfig: any = {
    "user_id": null,
    "language": '',
    "calendar_start_day": '',
    "auto_assignment_pms": false,
    "time_zone": ''
  };
  loader: boolean = false;

  constructor(private _service: OwnerService, public constants: AppConstants, private alert: AlertService) {

  }

  ngOnInit() {
    this.userSettingConfig.user_id = JSON.parse(<any>localStorage.getItem("userId"));
    this.fetchDefaultUserSetting();
  }

  fetchDefaultUserSetting(){
    this._service.fetchDefaultUserSetting(this.userSettingConfig.user_id,(res:any)=>{
      if(res.status == 200){
        console.log(res);
        this.userSettingConfig = res.data[0];
      }
    })
  }

  selectTimeZone(event: any) {
    this.userSettingConfig.time_zone = event.target.value.split("UTC")[1];
  }

  selectCalendarStartDay(event: any) {
    this.userSettingConfig.calendar_start_day = event.target.value;
  }

  saveDefaultSetting() {
    this.loader = true;
    if (this.userSettingConfig.user_id) {
      this._service.saveDefaultSetting(this.userSettingConfig, (res: any) => {
        if (res.status == 200) {
          this.loader = false;
          console.log(res);
          this.alert.alert("success", res.message, "Success", { displayDuration: 2000, pos: 'top' })
        } else {
          this.alert.alert("error", "Something went wrong", "Error", { displayDuration: 2000, pos: 'top' })
          this.loader = false;
        }
      })
    }else{
      this.alert.alert("error", "UserID is mandatory", "Error", { displayDuration: 2000, pos: 'top' })
      this.loader = false;
    }
  }

}
