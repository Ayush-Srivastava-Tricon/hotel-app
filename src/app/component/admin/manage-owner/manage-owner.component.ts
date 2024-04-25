import { Component, Pipe } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AppConstants } from 'src/app/constants/app.constant';
import { AlertService } from 'src/app/shared/alert.service';
import { AdminService } from '../../../services/admin.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
declare var homeLanguages: any;

@Component({
  selector: 'app-manage-owner',
  templateUrl: './manage-owner.component.html',
  styleUrls: ['./manage-owner.component.scss']
})
export class ManageOwnerComponent {
  ownerModal: any;
  ownerList: any = [];
  showModal: any = { owner: false, delete: false, viewOwner: false };
  showActionDropDown: any = {};
  isEditModal: boolean = false;
  deleteRoomIndex: number = 0;
  loader: boolean = false;
  isLangTranslating: boolean = false;
  allLang: any = [];
  selectedOwnerId:any;
  selectedPropertyId:any=0;
  showPassword:boolean=false;

  constructor(private router: Router, private fb: FormBuilder, private constants: AppConstants, 
    private alertService: AlertService, private adminService: AdminService, private commonService:CommonService,
    private translate: TranslateService) {
    this.ownerModal = this.fb.group(
      {
        name: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        alternate_email: ['', [ Validators.email]],
        mobile: ['', [ Validators.pattern("^[0-9]*$")]],
        alternate_mobile: ['', [Validators.pattern("^[0-9]*$")]],
        password: ['', [Validators.required, Validators.minLength(8), this.commonService.validatePassword]],
      }
    )
  }


  ngOnInit() {
    this.setDefaultLang('en');
    this.fetchOwnerList();
  }


  ngAfterContentInit() {
    this.getAllSortedLang();
  }

  getAllSortedLang() {
    this.allLang = homeLanguages;
  }

  setDefaultLang(lang: any) {
    this.translate.use(lang);
  }

  fetchOwnerList() {
    this.loader= true;
    this.adminService.fetchOwnerList((res: any) => {
      if (res.status == 200) {
        this.loader= false;
        this.ownerList = res.data;
      }
    })
  }

  createNewOwner() {
    if (this.ownerModal.status == "VALID") {
      this.adminService.addOwner(this.ownerModal.value, (res: any) => {
        if (res.status == 200) {
          this.ownerList.push(this.ownerModal.value);
          this.showModal.owner = false;
          this.ownerModal.reset();
          this.alertService.alert("success", "New Owner Added", "Success", { displayDuration: 2000, pos: 'top' });
        } else {
          this.alertService.alert("error", res.message, "Error", { displayDuration: 2000, pos: 'top' });
        }
      })
    } else {
      this.alertService.alert("error", "Please Check Fields Again", "Error", { displayDuration: 2000, pos: 'top' });
    }
  }


  openModal() {
    this.showModal.owner = true;
    this.ownerModal.reset();
  }

  closeModal() {
    this.showModal.owner = false;
    this.showModal.delete = false;
    this.showModal.viewOwner = false;
    this.isEditModal = false;
    this.ownerModal.reset();
  }

  showDropDown(idx: any) {
    this.showActionDropDown[idx] = !this.showActionDropDown[idx];
  }

  editOwnerOpenModal(item: any) {
    this.isEditModal = true;
    this.ownerModal.patchValue(item);
    this.showModal.owner = true;
    this.ownerModal.controls.password.removeValidators();
    this.ownerModal.controls.password.updateValueAndValidity("");
    this.selectedOwnerId = +item.owner_id;
    
  }

  editOwner() {
    if (this.ownerModal.status == "VALID") {
        delete this.ownerModal.value.password; 
        const editModalObj:any = JSON.parse(JSON.stringify(this.ownerModal.value));
        editModalObj['owner_id'] = this.selectedOwnerId;
      this.adminService.editOwner(editModalObj,(res:any)=>{
        if(res.status == 200){
          this.fetchOwnerList();
          this.showModal.owner = false;
          this.isEditModal = false;
          this.showActionDropDown = {};
          this.ownerModal.reset();
          this.alertService.alert("success", "Edit Owner Successfully", "Success", { displayDuration: 2000, pos: 'top' });
        }
      })
    } else {
      this.alertService.alert("error", "Please Check Fields Again", "Error", { displayDuration: 2000, pos: 'top' });
    }

  }

  deleteOwnerModal(ownerId:any,idx: any) {
    this.deleteRoomIndex = idx;
    this.showModal.delete = true;
    this.selectedOwnerId = +ownerId;
  }

  deleteOwner() {
    this.adminService.deleteOwner(this.selectedOwnerId,(res:any)=>{
      if(res.status == 200){
          this.ownerList.splice(this.deleteRoomIndex, 1);
          this.showModal.delete = false;
          this.deleteRoomIndex = 0;
          this.alertService.alert("error", "Owner Deleted", "Success", { displayDuration: 2000, pos: 'top' });
      }else {
        this.alertService.alert("error", "Please Check Fields Again", "Error", { displayDuration: 2000, pos: 'top' });
      }
    })
  }


  onLangChange(event: any) {
    const selectedLangKey :any= event.target.value; 
    const targetLang:any = selectedLangKey.split("|")[1];
    if(selectedLangKey.split("|")[1] == 'en' || selectedLangKey.split("|")[1] == 'es'){
      this.translate.use(targetLang);
    }else{
      const htmlContent:any = document.querySelector(".form-check-label");
      this.adminService.doGTranslate(htmlContent.innerText,selectedLangKey,(res:any)=>{
          if(res){
            console.log(res);
            
          }
      })
    }
    
  }


 

  backToManageOwner() {
    this.showModal.owner = false;
  }

  
  
}