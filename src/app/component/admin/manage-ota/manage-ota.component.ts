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
        roomimport_exists:[''],
        calendar_exists:[''],
        reservation_exists:[''],
        review_exists:[''],
        promotion_exists:[''],
        content_exists:[''],
        message_exists:[''],
        roomimport_active:[''],
        calendar_active:[''],
        reservation_active:[''],
        review_active:[''],
        promotion_active:[''],
        content_active:[''],
        message_active:[''],
        alotment:[''],
        price: [''],
        minstay: [''],
        maxstay: [''],
        stopsell: [''],
        cta: [''],
        ctd: [''],
        cutoff: ['']
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
    this.otaModal.reset();
  }

  closeModal() {
    this.showModal.owner = false;
    this.showModal.delete = false;
    this.showModal.viewOwner = false;
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
  }

  addNewOtaDetails(){
    if(this.otaModal.status == 'VALID'){
      let params:any={
        otaData:[this.otaModal.value]
      };
      this.formData.append('otaData', JSON.stringify(params));
      this.adminService.addOtaDetails(this.formData,(res:any)=>{
        if(res.status == 200){
          this.showModal.property = false;
          this.otaModal.reset();
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

  editOtaDetails(){
    if(this.otaModal.status == 'VALID'){
      const editModalObj: any = JSON.parse(JSON.stringify(this.otaModal.value));
      editModalObj['id'] = this.currentOtaId;
         let params:any={
        otaData:[editModalObj]
      };
      this.formData.append('otaData', JSON.stringify(params));
      this.adminService.editOtaDetails(editModalObj,(res:any)=>{
        if(res.status == 200){
          this.showModal.property = false;
          this.otaModal.reset();
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
