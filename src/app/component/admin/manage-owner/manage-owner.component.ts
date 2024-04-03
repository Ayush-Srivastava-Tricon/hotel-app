import { Component, Pipe } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AppConstants } from 'src/app/constants/app.constant';
import { AlertService } from 'src/app/shared/alert.service';
import { AdminService } from '../../../services/admin.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
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
  searchConfig: any = { searchType: 'Select' };
  filterBy: any = 'filter';
  filteredOwnerList: any = [];
  isLangTranslating: boolean = false;
  showFullDetailRight: any = {showPanel:false};
  allLang: any = [];
  wholeOwnerData: any = [
    {
      "owner_id": 1,
      "name": "Amit Kumar",
      "email": "amitkumar@e2x.com",
      "alternate_email": "1",
      "mobile": "8765654345",
      "alternate_mobile": "",
      "status": 1,
      "created_at": "2024-03-07 11:42:05",
      "updated_at": "2024-03-07 11:42:05",
      "property_id": "2"
    },
    {
      "owner_id": 2,
      "name": "Amit Kumar",
      "email": "amit.kumar@e2x.com",
      "alternate_email": "amit1@e2x.com",
      "mobile": "8765654345",
      "alternate_mobile": "",
      "status": 1,
      "created_at": "2024-03-07 11:43:24",
      "updated_at": "2024-03-07 11:43:24",
      "property_id": "4"
    }
  ];
  selectedOwnerId:any;
  selectedPropertyId:any=0;

  showPassword:boolean=false;

  constructor(private router: Router, private fb: FormBuilder, private constants: AppConstants, 
    private alertService: AlertService, private adminService: AdminService, 
    private translate: TranslateService) {
    this.ownerModal = this.fb.group(
      {
        name: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        alternate_email: ['', [ Validators.email]],
        mobile: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
        alternate_mobile: ['', [Validators.pattern("^[0-9]*$")]],
        password: ['', [Validators.required]],
      }
    )
  }


  ngOnInit() {
    this.setDefaultLang('en');
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
      if (res) {
        this.loader= false;
        console.log(res);
        this.ownerList = res.data;

      }
    })
  }

  createNewOwner() {
    if (this.ownerModal.status == "VALID") {
      this.adminService.addOwner(this.ownerModal.value, (res: any) => {
        if (res.status == 200) {
          console.log(res);
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
    console.log(item);
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
          console.log(res);
          this.ownerList.splice(this.deleteRoomIndex, 1);
          this.showModal.delete = false;
          this.deleteRoomIndex = 0;
          this.alertService.alert("error", "Owner Deleted", "Success", { displayDuration: 2000, pos: 'top' });
      }else {
        this.alertService.alert("error", "Please Check Fields Again", "Error", { displayDuration: 2000, pos: 'top' });
      }
    })
  }

  searchById() {
    this.loader = true;
    let params: any = {
      "search_for": +this.searchConfig['searchType'],
      "param":this.searchConfig['searchValue']
    };
    this.loader = true;
    this.adminService.filterByIdOrName(params, (res: any) => {
      if (res.status == 200) {
        console.log(res);
        this.loader = false;
        this.filteredOwnerList = res.data;
      }
      this.loader = false;
    });

    this.showFullDetailRight.showPanel=false;
    this.showFullDetailRight.details={};

  }

  changeOptionFilterOrAddOwner(type: any) {
    this.filteredOwnerList = [];
    this.searchConfig = { searchType: 'Select' };
    this.filterBy = type;
    if(type =='owner'){
      this.fetchOwnerList();
    }
  }

  onLangChange(event: any) {
    const selectedLangKey :any= event.target.value; 
    const targetLang:any = selectedLangKey.split("|")[1];
    if(selectedLangKey.split("|")[1] == 'en' || selectedLangKey.split("|")[1] == 'es'){
      this.translate.use(targetLang);
    }else{
      const htmlContent:any = document.querySelector(".form-check-label");
      console.log(htmlContent);
      
      this.adminService.doGTranslate(htmlContent.innerText,selectedLangKey,(res:any)=>{
          if(res){
            console.log(res);
            
          }
      })
    }
    
  }

  viewFullDetails(idx:any,propertyId: any) {
    this.showFullDetailRight.showPanel = true;  
    this.showFullDetailRight['details'] = this.filteredOwnerList[idx];
    this.selectedPropertyId  = propertyId;
    
  }

  loginAsProperty() {
    localStorage.setItem("selectedPropertyId",this.selectedPropertyId);
    this.router.navigate(['/manager']);
  }

  backToManageOwner() {
    this.showModal.owner = false;
    this.filteredOwnerList = [];
    this.searchConfig = { searchType: 'Select' };
    this.filterBy = 'filter';
  }
}