import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AppConstants } from 'src/app/constants/app.constant';
import { AdminService } from 'src/app/services/admin.service';
import { AlertService } from 'src/app/shared/alert.service';

@Component({
  selector: 'app-manage-ota',
  templateUrl: './manage-ota.component.html',
  styleUrls: ['./manage-ota.component.scss']
})
export class ManageOtaComponent {

  loader:boolean=false;
  otaList:any=[];
  showActionDropDown:any={};
  showModal:any={};
  otaModal:any;
  isEditModal:boolean=false;
  formData:any = new FormData();
  currentOtaId:number=0;

  constructor( private alertService: AlertService, private adminService: AdminService ,private fb:FormBuilder){
    this.otaModal = this.fb.group(
      {
        name: ['',Validators.required],
        site_def_user: ['',],
        site_def_passw: ['',],
        default_passkey: ['',],
        ip_whitelist: [''],
        push_flag:[''],
        pull_delay:[''],
        pull_priority:[''],
        online_doc_url:[''],
        roomimport_exists:[1],
        calendar_exists:[1],
        reservation_exists:[1],
        review_exists:[0],
        promotion_exists:[0],
        content_exists:[0],
        message_exists:[0],
        roomimport_active:[1],
        calendar_active:[1],
        reservation_active:[1],
        review_active:[0],
        promotion_active:[0],
        content_active:[0],
        message_active:[0],
        alotment:[1],
        price: [1],
        minstay: [1],
        maxstay: [1],
        stopsell: [1],
        cta: [0],
        ctd: [0],
        cutoff: [0]
      }
    )
  }

   ngOnInit(){

    this.fetchOtaDetails();

   }

   fetchOtaDetails(){
    this.loader=true;
    this.adminService.fetchOtaDetails((res:any)=>{
      if(res.status == 200){
        this.loader=false;
        console.log(res);
        this.otaList = res.data;
      }
    })
   }
   
   openModal() {
    this.showModal.ota = true;
    // this.otaModal.reset();
  }

  closeModal() {
    this.showModal.ota = false;
    this.showModal.delete = false;
    this.isEditModal = false;
    this.otaModal.reset();
  }

  showDropDown(idx: any) {
    this.showActionDropDown[idx] = !this.showActionDropDown[idx];
  }

  editOwnerOpenModal(item:any){
    this.isEditModal = true;
    this.otaModal.patchValue(item);
    console.log(item);
    this.showModal.ota = true;
    this.currentOtaId = item.id;
  }


  backToManageOta() {
    this.showModal.ota = false;
    this.isEditModal = false;
    this.showActionDropDown = {};
    this.otaModal.reset();
  }

  addNewOtaDetails(){
    console.log(this.otaModal.value);
    
    if(this.otaModal.status == 'VALID'){
      // let params:any={
      //   otaData:[this.otaModal.value]
      // };
      this.formData.append('otaData', JSON.stringify(this.otaModal.value));
      this.adminService.addOtaDetails(this.formData,(res:any)=>{
        if(res.status == 200){
          this.showModal.ota = false;
          this.otaModal.reset();
          this.alertService.alert("success", res.message, "Success", { displayDuration: 3000, pos: 'top' });
          this.fetchOtaDetails();
        }
        else {
          this.alertService.alert("error",  res.message, "Error", { displayDuration: 3000, pos: 'top' });
        }
      });
    }
    else {
      this.alertService.alert("error", "Please Check Fields Again", "Error", { displayDuration: 3000, pos: 'top' });
    }

  }

  editOtaDetails(){
    if(this.otaModal.status == 'VALID'){
      const editModalObj: any = JSON.parse(JSON.stringify(this.otaModal.value));
      editModalObj['id'] = this.currentOtaId;
      //    let params:any={
      //   otaData:[editModalObj]
      // };
      this.formData.append('otaData', JSON.stringify(editModalObj));
      this.adminService.editOtaDetails(editModalObj,(res:any)=>{
        if(res.status == 200){
          this.showModal.ota = false;
          this.otaModal.reset();
          this.alertService.alert("success", "New Room Created", "Success", { displayDuration: 3000, pos: 'top' });
          this.fetchOtaDetails();
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
