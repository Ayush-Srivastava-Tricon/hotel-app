import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AppConstants } from 'src/app/constants/app.constant';
import { AlertService } from 'src/app/shared/alert.service';
import { AdminService } from './../../../services/admin.service';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.scss']
})
export class ManageUserComponent {
  ownerModal:any;
  ownerList:any=[];
  showModal:any={owner:false,delete:false};
  showActionDropDown:any={};
  isEditModal:boolean=false;
  deleteRoomIndex:number=0;

  constructor(private fb:FormBuilder,private constants:AppConstants,private alertService:AlertService,private adminService:AdminService){
    this.ownerModal  = this.fb.group(
      {
        name:['',[Validators.required]],
        email:['',[Validators.required,Validators.email]],
        alternate_email:['',[Validators.required,Validators.email]],
        mobile:['',[Validators.required,Validators.pattern("^[0-9]*$")]],
        alternate_mobile:['',[Validators.required,Validators.pattern("^[0-9]*$")]],
        password:['',[Validators.required]],
      }
    )
  }

  ngOnInit(){
    this.fetchOwnerList();
  }

  fetchOwnerList(){
    this.adminService.fetchOwnerList((res:any)=>{
      if(res){
        console.log(res);
        
      }
    })
  }

  createNewOwner(){
      if(this.ownerModal.status == "VALID"){
        this.adminService.addOwner(this.ownerModal.value,(res:any)=>{
          if(res.status == 200){
                console.log(res);
                this.ownerList.push(this.ownerModal.value);
                this.showModal.owner=false;
                this.ownerModal.reset();
                this.alertService.alert("success", "New Owner Added", "Success", { displayDuration: 2000, pos: 'top' });
          } else{
            this.alertService.alert("error", res.message, "Error", { displayDuration: 2000, pos: 'top' });
          }
        })
      }else{
        this.alertService.alert("error", "Please Check Fields Again", "Error", { displayDuration: 2000, pos: 'top' });
      }
  }


  openModal(){
    this.showModal.owner= true;
    this.ownerModal.reset();
  }

  closeModal(){
   this.showModal.owner= false;
   this.showModal.delete=false;
   this.isEditModal= false;
   this.ownerModal.reset();
  }

  showDropDown(idx:any){
    this.showActionDropDown[idx] = !this.showActionDropDown[idx];
  }

  editOwnerOpenModal(item:any){
      this.isEditModal= true;
      this.ownerModal.patchValue(item);
      console.log(item);
      this.showModal.owner=true;
  }

  editOwner(){
    if(this.ownerModal.status == "VALID"){
      this.showModal.owner=false;
      this.isEditModal= false;
      this.showActionDropDown={};
      this.ownerModal.reset();
      this.alertService.alert("success", "Edit Owner Successfully", "Success", { displayDuration: 2000, pos: 'top' });
    }else{
      this.alertService.alert("error", "Please Check Fields Again", "Error", { displayDuration: 2000, pos: 'top' });
    }
      
  }

  deleteOwnerModal(idx:any){
    this.deleteRoomIndex = idx;
    this.showModal.delete=true;
  }

  deleteOwner(){
      this.ownerList.splice(this.deleteRoomIndex,1);
      this.showModal.delete=false;
      this.deleteRoomIndex=0;
  } 

  viewOwnerDetails(){

  }
}
