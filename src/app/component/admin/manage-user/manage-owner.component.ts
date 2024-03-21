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

  showPassword:boolean=false;

  constructor(private router: Router, private fb: FormBuilder, private constants: AppConstants, private alertService: AlertService, private adminService: AdminService, private translate: TranslateService) {
    this.ownerModal = this.fb.group(
      {
        name: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        alternate_email: ['', [Validators.required, Validators.email]],
        mobile: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
        alternate_mobile: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
        password: ['', [Validators.required]],
      }
    )
  }


  ngOnInit() {
    this.setDefaultLang('en');
    // this.fetchOwnerList();
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
    this.adminService.fetchOwnerList((res: any) => {
      if (res) {
        console.log(res);
        this.filteredOwnerList = res.data;

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
  }

  editOwner() {
    if (this.ownerModal.status == "VALID") {
      this.showModal.owner = false;
      this.isEditModal = false;
      this.showActionDropDown = {};
      this.ownerModal.reset();
      this.alertService.alert("success", "Edit Owner Successfully", "Success", { displayDuration: 2000, pos: 'top' });
    } else {
      this.alertService.alert("error", "Please Check Fields Again", "Error", { displayDuration: 2000, pos: 'top' });
    }

  }

  deleteOwnerModal(idx: any) {
    this.deleteRoomIndex = idx;
    this.showModal.delete = true;
  }

  deleteOwner() {
    this.ownerList.splice(this.deleteRoomIndex, 1);
    this.showModal.delete = false;
    this.deleteRoomIndex = 0;
  }

  searchById() {
    this.loader = true;
    // if(this.searchConfig.searchType == 'ownerId'){
    //   this.filteredOwnerList = this.wholeOwnerData.find((e:any)=>e.owner_id == this.searchConfig.ownerId);
    //   this.filteredOwnerList = this.filteredOwnerList ?  [this.filteredOwnerList] : [];
    //   setTimeout(() => {
    //     this.loader=false;
    //   }, 1000);
    // }
    // if(this.searchConfig.searchType == 'propertyId'){
    //   this.filteredOwnerList = this.wholeOwnerData.find((e:any)=>e.owner_id == this.searchConfig.propertyId );
    //   this.filteredOwnerList = this.filteredOwnerList ?  [this.filteredOwnerList] : [];
    //   setTimeout(() => {
    //     this.loader=false;
    //   }, 1000);
    // }

    // if(this.searchConfig.searchType == 'name'){
    //   this.filteredOwnerList = this.wholeOwnerData.filter((e:any)=>e.name.toLowerCase().includes(this.searchConfig.name.toLowerCase()));
    //   this.filteredOwnerList = this.filteredOwnerList ?  this.filteredOwnerList : [];
    //   setTimeout(() => {
    //     this.loader=false;
    //   }, 1000);
    // }
    let params: any = {
      "search_for": +this.searchConfig['searchType'],
      "id": this.searchConfig['searchValue'],
      "name": "",
      "mobile": "",
      "country": "",
      "state": "",
      "city": ""
    };
    this.loader = true;
    this.adminService.filterByIdOrName(params, (res: any) => {
      if (res.status == 200) {
        console.log(res);
        this.loader = false;
        this.filteredOwnerList = res.data;
      }
      this.loader = false;
      this.filteredOwnerList = [ {
        "property_id": 1,
        "property_name": "Vedanta",
        "property_type": "HOTEL",
        "email": "amit-kumar@e2x.com",
        "owner_name": "Amit Kumar",
        "address": "",
        "mobile": "8765654345",
        "city": "New Delhi",
        "state": "Delhi",
        "country": "India",
        "postal_code": "987675",
        "latitudes": "37.38714000",
        "longitudes": "17.38714000",
        "amenities": "",
        "description": "",
        "status": 1,
        "created_at": "2024-03-07 14:23:09"
    },
    {
        "property_id": 3,
        "property_name": "Taj",
        "property_type": "HOTEL",
        "email": "amittkumar@e2x.com",
        "owner_name": "Smith",
        "address": null,
        "mobile": "8765654345",
        "city": "New Delhi",
        "state": "Delhi",
        "country": "India",
        "postal_code": "987675",
        "latitudes": null,
        "longitudes": null,
        "amenities": "",
        "description": null,
        "status": 1,
        "created_at": "2024-03-07 14:34:17"
    }
      ];

    });

    this.showFullDetailRight.showPanel=false;
    this.showFullDetailRight.details={};

  }

  changeOptionFilterOrAddOwner(type: any) {
    this.filteredOwnerList = [];
    this.searchConfig = { searchType: 'Select' };
    this.filterBy = type;
  }

  onLangChange(event: any) {
    this.translate.use(event.target.value);
  }

  viewFullDetails(propertyId: any) {
    this.showFullDetailRight.showPanel = true;
    this.showFullDetailRight['details'] = this.filteredOwnerList[propertyId];
  }

  loginAsProperty() {
    this.router.navigate(['/manage-property'])
  }

  backToManageOwner() {
    this.showModal.owner = false;
    this.filteredOwnerList = [];
    this.searchConfig = { searchType: 'Select' };
    this.filterBy = 'filter';
  }
}
