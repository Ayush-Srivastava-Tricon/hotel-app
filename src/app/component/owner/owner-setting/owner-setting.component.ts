import { Component } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { OwnerService } from 'src/app/services/owner.service';
import { AlertService } from 'src/app/shared/alert.service';

@Component({
  selector: 'app-owner-setting',
  templateUrl: './owner-setting.component.html',
  styleUrls: ['./owner-setting.component.scss']
})
export class OwnerSettingComponent {
  profileSettingConfig: any = {};
  error: any = {};
  loader: boolean = false;
  currentOwnerId:number=0;



  constructor(private _service:OwnerService,private alert:AlertService) { }

  ngOnInit(){
    this.currentOwnerId = JSON.parse(<any>localStorage.getItem("userId")); 
  }

  update(){
    this.loader= true;
    this.profileSettingConfig['owner_id'] = this.currentOwnerId;
    this._service.editOwner(this.profileSettingConfig,(res:any)=>{
      if(res.status == 200){
          this.loader= false;
          this.alert.alert("success",res.message,"Success",{displayDuration:2000,pos:'top'});
        }else{
          this.loader=false;
          this.alert.alert("error","Something went wrong","Error",{displayDuration:2000,pos:'top'});
        }
      })
  }

}
