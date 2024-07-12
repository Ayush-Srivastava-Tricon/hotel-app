import { Component } from '@angular/core';
import { AlertService } from 'src/app/shared/alert.service';
import { PropertyService } from './../../../services/property.service';
import { FormBuilder, Validators } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';

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
  otaDetailList:any=[];

  constructor(private alertService: AlertService,private _service:PropertyService,private fb:FormBuilder,private adminService:AdminService){
    this.otaUserModal = this.fb.group({
      property_id:[''],
      ota_details_id:['',[Validators.required]],
      ota_user:['',[Validators.required]],
      ota_pass:['',[Validators.required]],
      ota_hotel_id:['',[Validators.pattern(/^[0-9]+$/)]],
      ota_other_id:['',[Validators.pattern(/^[a-zA-Z0-9-_ ]+$/)]] ,
      currency:['',],
      commission:['',],
      requester_ip:['',Validators.required],
      update:[1],
      reservation:[1],
      review:[1] ,
      promotion:[0],
      content:[0],
      message:[0]
    
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
    this._service.fetchOtaUserDetail(this.loggedInPropertyId,(res:any)=>{
      if(res.status == 200 && res.data.length>0){
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
        if(ipAdress.ip){
          this.otaUserModal.controls.requester_ip.setValue(ipAdress.ip);
          this.otaUserModal.controls.requester_ip.updateValueAndValidity();
        }
        
  }

  openModal() {
    this.showModal.otaUser = true;
    this.fetchOtaDetails();
    // this.otaUserModal.reset();
  }

  fetchOtaDetails(){
    this.adminService.fetchOtaDetails((res:any)=>{
      if(res.status == 200){
        this.otaDetailList = res.data;
      }
    })
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
    this._service.getOtaUserDetailById(item.id,(res:any)=>{
      if(res.status == 200){
        this.isEditModal = true;
        this.otaUserModal.patchValue(res.data[0]);  
        this.showModal.otaUser = true;
        this.currentOtaUserId = item.id;
        this.fetchOtaDetails();
      }
    })
  }


  backToManageOta() {
    this.showModal.otaUser = false;
    this.isEditModal=false;
    this.otaUserModal.reset();
    this.showActionDropDown={};
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
          this.fetchOtaUserDetail();
          this.alertService.alert("success", res.message, "Success", { displayDuration: 3000, pos: 'top' });
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
          this.fetchOtaUserDetail();
          this.showActionDropDown={};
          this.alertService.alert("success", res.message, "Success", { displayDuration: 3000, pos: 'top' });
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
