import { Component } from '@angular/core';
import { AlertService } from 'src/app/shared/alert.service';
import { PropertyService } from './../../../services/property.service';

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

  constructor(private alertService: AlertService,private _service:PropertyService){}

  ngOnInit(){
    this.fetchOtaUserDetail();
  }

  fetchOtaUserDetail(){
    this.loader=true;
    this._service.fetchOtaUserDetail((res:any)=>{
      if(res.status == 200){
        this.otaUserList = res.data;
        
      }
    })
  }

  openModal() {
    this.showModal.ota = true;
    this.otaUserModal.reset();
  }

  closeModal() {
    this.showModal.owner = false;
    this.showModal.delete = false;
    this.showModal.viewOwner = false;
    this.isEditModal = false;
    this.otaUserModal.reset();
  }

  showDropDown(idx: any) {
    this.showActionDropDown[idx] = !this.showActionDropDown[idx];
  }

  editOwnerOpenModal(item:any){
    this.isEditModal = true;
    this.otaUserModal.patchValue(item);
    console.log(item);
    this.showModal.ota = true;
    this.currentOtaUserId = item.id;
  }


  backToManageOta() {
    this.showModal.ota = false;
  }

  addNewOtaDetails(){
    if(this.otaUserModal.status == 'VALID'){
      let params:any={
        otaData:[this.otaUserModal.value]
      };
      this.formData.append('otaData', JSON.stringify(params));
      this._service.addOtaUserDetails(this.formData,(res:any)=>{
        if(res.status == 200){
          this.showModal.property = false;
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

  editOtaDetails(){
    if(this.otaUserModal.status == 'VALID'){
      const editModalObj: any = JSON.parse(JSON.stringify(this.otaUserModal.value));
      editModalObj['id'] = this.currentOtaUserId;
         let params:any={
        otaData:[editModalObj]
      };
      this.formData.append('otaData', JSON.stringify(params));
      this._service.editOtaUserDetails(editModalObj,(res:any)=>{
        if(res.status == 200){
          this.showModal.property = false;
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
