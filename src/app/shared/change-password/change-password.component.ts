import { Component } from '@angular/core';
import { OwnerService } from 'src/app/services/owner.service';
import { AlertService } from '../alert.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {

  changePassConfig:any={
    "user_id":0,
    'role':0,
    "existing_pass":"",
    "new_pass":""
  };
  loader:boolean=false;

  constructor(private _service:OwnerService,private alert:AlertService){}

  ngOnInit(){
    if(<any>localStorage.getItem("selectedPropertyId")){               //only For Property User
      this.changePassConfig.user_id = JSON.parse(<any>localStorage.getItem("selectedPropertyId"));
      this.changePassConfig.role = 3;   
    }else{
      this.changePassConfig.user_id = JSON.parse(<any>localStorage.getItem("userId"));
      this.changePassConfig.role = JSON.parse(<any>localStorage.getItem("roleId"));
    }
  }

  changePassword(){
    this.loader=true;
    this._service.changePassword(this.changePassConfig,(res:any)=>{
      if(res.status == 200){
        this.loader=false;
        console.log(res);
        this.alert.alert("success",res.message,"Success",{displayDuration: 2000, pos: 'top'});
      }
      this.loader=false;
      this.alert.alert("error",res.error ? res.error.message : res.message,"Error",{displayDuration: 2000, pos: 'top'});
    })
  }
}
