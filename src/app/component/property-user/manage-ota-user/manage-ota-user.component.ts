import { Component } from '@angular/core';
import { AlertService } from 'src/app/shared/alert.service';
import { PropertyService } from './../../../services/property.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-manage-ota-user',
  templateUrl: './manage-ota-user.component.html',
  styleUrls: ['./manage-ota-user.component.scss']
})
export class ManageOtaUserComponent {
  loader:boolean=false;
  otaUserList:any=[];
  showActionDropDown:any={};
  showModal:any={};
  otaUserModal:any;
  isEditModal:boolean=false;
  formData:any = new FormData();
  currentOtaUserId:number=0;
  loggedInPropertyId:any;

  constructor(private alertService: AlertService,private _service:PropertyService,private fb:FormBuilder){
    this.otaUserModal = this.fb.group({
      property_id:[''],
      ota_user:[''],
      ota_pass:[''],
      ota_hotel_id:[''],
      ota_other_id:[''] ,
      currency:[''],
      commission:[''],
      requester_ip:[''],
      update:[''],
      reservation:[''],
      review:[''] ,
      promotion:[''],
      content:[''],
      message:['']
    
    })
  }

  ngOnInit(){
    this.loggedInPropertyId = JSON.parse(<any>localStorage.getItem("selectedPropertyId"));
    if(!this.loggedInPropertyId){
      this.loggedInPropertyId = JSON.parse(<any>localStorage.getItem("userId"));
    }
    this.fetchOtaUserDetail();
    this.fetchIpAddress();
  }

  fetchOtaUserDetail(){
    this.loader=true;
    this._service.fetchOtaUserDetail((res:any)=>{
      if(res.status == 200){
        this.otaUserList = res.data;
        this.loader=false;
      }else{
        this.otaUserList = [];
        this.loader=false;
      }
    })
  }

  async fetchIpAddress(){
        let ipAdress = await fetch("https://api.ipify.org?format=json").then((res:any)=>res.json());
        console.log(ipAdress);
        if(ipAdress.ip){
          this.otaUserModal.controls.requester_ip.setValue(ipAdress.ip);
          this.otaUserModal.controls.requester_ip.updateValueAndValidity();
          console.log(this.otaUserModal.value);
          
          
        }
        
  }

  openModal() {
    this.showModal.otaUser = true;
    // this.otaUserModal.reset();
  }

  closeModal() {
    this.showModal.otaUser = false;
    this.showModal.delete = false;
    this.showModal.otaUser = false;
    this.isEditModal = false;
    // this.otaUserModal.reset();
  }

  showDropDown(idx: any) {
    this.showActionDropDown[idx] = !this.showActionDropDown[idx];
  }

  editOwnerOpenModal(item:any){
    this.isEditModal = true;
    this.otaUserModal.patchValue(item);
    console.log(item);
    this.showModal.otaUser = true;
    this.currentOtaUserId = item.id;
  }


  backToManageOta() {
    this.showModal.otaUser = false;
  }

  addNewOtaUser(){
    if(this.otaUserModal.status == 'VALID'){
      // let params:any={
      //   otaData:[this.otaUserModal.value]
      // };
      // this.formData.append('otaData', JSON.stringify(params));
      this.otaUserModal.controls.property_id.setValue(this.loggedInPropertyId);
      this.otaUserModal.controls.property_id.updateValueAndValidity();
      this._service.addOtaUserDetails(this.otaUserModal.value,(res:any)=>{
        if(res.status == 200){
          this.showModal.otaUser = false;
          this.otaUserModal.reset();
          this.alertService.alert("success", "New Room Created", "Success", { displayDuration: 3000, pos: 'top' });
        }
        else {
          this.alertService.alert("error", "Something went wrong", "Error", { displayDuration: 3000, pos: 'top' });
        }
      });
    }
    else {
      this.alertService.alert("error", "Please Check Fields Again", "Error", { displayDuration: 3000, pos: 'top' });
    }

  }

  editOtaUser(){
    if(this.otaUserModal.status == 'VALID'){
      const editModalObj: any = JSON.parse(JSON.stringify(this.otaUserModal.value));
      editModalObj['id'] = this.currentOtaUserId;
         let params:any={
        otaData:[editModalObj]
      };
      this.formData.append('otaData', JSON.stringify(params));
      this._service.editOtaUserDetails(editModalObj,(res:any)=>{
        if(res.status == 200){
          this.showModal.otaUser = false;
          this.otaUserModal.reset();
          this.alertService.alert("success", "New Room Created", "Success", { displayDuration: 3000, pos: 'top' });
        }
        else {
          this.alertService.alert("error", "Something went wrong", "Error", { displayDuration: 3000, pos: 'top' });
        }
      });
    }
    else {
      this.alertService.alert("error", "Please Check Fields Again", "Error", { displayDuration: 3000, pos: 'top' });
    }
  }

}
