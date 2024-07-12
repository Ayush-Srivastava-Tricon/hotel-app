import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AppConstants } from 'src/app/constants/app.constant';
import { OwnerService } from 'src/app/services/owner.service';
import { AlertService } from 'src/app/shared/alert.service';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-manage-property',
  templateUrl: './manage-property.component.html',
  styleUrls: ['./manage-property.component.scss']
})
export class ManagePropertyComponent {

  propertyUserModal: any;
  countryList: any = [];
  stateList: any = [];
  cityList: any = [];
  countryId: number = 1;
  propertyList: any = [];
  showModal: any = { property: false, delete: false };
  showActionDropDown: any = {};
  isEditModal: boolean = false;
  deletePropertyIndex: number = 0;
  loader: boolean = false;
  selectedPropertyId:number=0;
  currentOwnerId:any;

  constructor(private router:Router,private fb: FormBuilder, public constants: AppConstants, 
    private alertService: AlertService, 
    private ownerService: OwnerService,
    private commonService:CommonService) {
    this.propertyUserModal = this.fb.group(
      {
        property_name: ['', [Validators.required]],
        email: ['', [Validators.required,Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
        password: ['', [Validators.required, Validators.minLength(8), this.commonService.validatePassword]],
        mobile: ['', [Validators.pattern("^[0-9]*$"),Validators.required]],
        property_type: ['', [Validators.required]],
        address: ['',],
        city: ['',[Validators.required]],
        state: ["",[Validators.required]],
        country: ['',Validators.required],
        postal_code: ['',[Validators.required,Validators.pattern("^[0-9]*$")]],
        description: ['', ],
        amenities: ['', ],
        latitudes: ['', ],
        longitudes: ['',],
        owner_id: ['',],
        time_zone:[''],
        city_tax:['']
      }
    )
  }

  ngOnInit() {
    this.currentOwnerId = localStorage.getItem("userId");
    this.fetchPropertyList();
  }


  fetchPropertyList() {
    this.loader = true;
    this.ownerService.fetchPropertyList(this.currentOwnerId,(res: any) => {
      if (res.status == 200 && res.data.length>0) {
        this.loader = false;
        this.propertyList = res.data;
        this.setAllPropertyListToLocal(res.data);
      }else{
        this.loader=false;
      }
    })
  }

  createNewProperty() {
    if (this.propertyUserModal.status == "VALID") {
      this.loader=true;
      this.propertyUserModal.controls.owner_id.setValue(this.currentOwnerId);
      this.propertyUserModal.controls.owner_id.updateValueAndValidity();
      this.ownerService.addNewProperty(this.propertyUserModal.value, (res: any) => {
        if (res.status == 200) {
          this.showModal.property = false;
          this.propertyUserModal.reset();
          this.fetchPropertyList();
          this.alertService.alert("success", "New Property Created", "Success", { displayDuration: 3000, pos: 'top' });
          this.loader=false;
        } else if(res.status == 500){
          this.alertService.alert("error", "Duplicate Email Entry", "Error", { displayDuration: 3000, pos: 'top' });
          this.loader=false;
        } else {
          this.alertService.alert("error", "Something went wrong", "Error", { displayDuration: 3000, pos: 'top' });
          this.loader=false;
        }
      })
    } else {
      this.alertService.alert("error", "Please Check Fields Again", "Error", { displayDuration: 3000, pos: 'top' });
      this.loader=false;
    }
  }

  getStateByCountry(event: any) {
    this.countryId = event.target.value;
    this.propertyUserModal.controls.country.setValue(this.countryId);
    this.propertyUserModal.controls.state.setValue('');
    this.propertyUserModal.controls.city.setValue('');
    this.ownerService.fetchState(this.countryId, (res: any) => {
      if (res.status == 200) {
        this.stateList = res.data;
      } else {
        this.stateList = [];
        this.cityList = [];
        this.propertyUserModal.controls.state.disable();
        this.propertyUserModal.controls.city.disable();
      }
    })

  }


  getCityByState(event: any) {
    const stateId = event.target.value;
    this.propertyUserModal.controls.state.setValue(stateId);
    this.propertyUserModal.controls.city.setValue('');
    this.ownerService.fetchCity(this.countryId, +stateId, (res: any) => {
      if (res.status == 200) {
        this.cityList = res.data;
        this.propertyUserModal.controls.city.enable();
      } else {
        this.cityList = [];
        this.propertyUserModal.controls.city.disable();
      }
    })

  }

  selectCity(event: any) {
    this.propertyUserModal.controls.city.setValue(event.target.value);

  }

  openModal() {
    this.showModal.property = true;
    this.isEditModal = false;
    this.fetchCountry();
    this.propertyUserModal.reset();
  }

  closeModal() {
    this.showModal.property = false;
    this.showModal.delete = false;
    this.isEditModal = false;
    this.propertyUserModal.reset();
  }

  showDropDown(idx: any) {
    this.showActionDropDown[idx] = !this.showActionDropDown[idx];
  }

  editPropertyOpenModal(item: any) {
    this.isEditModal = true;
    this.fetchCountry();
    this.getStateByCountry({target:{value:item.country}});
    this.getCityByState({target:{value:item.state}});

    this.showModal.property = true;
    this.propertyUserModal.controls.password.clearValidators();
    this.propertyUserModal.controls.password.updateValueAndValidity();
    this.selectedPropertyId = item.property_id;
    this.propertyUserModal.patchValue(item);
  }

  editProperty() {
    if (this.propertyUserModal.status == "VALID") {
      this.loader=true;
      delete this.propertyUserModal.value.password;
      const editModalObj:any = JSON.parse(JSON.stringify(this.propertyUserModal.value));
      editModalObj['property_id'] = +this.selectedPropertyId;
      editModalObj['owner_id'] = +this.currentOwnerId;
      this.ownerService.editProperty(editModalObj,(res:any)=>{
        if(res.status == 200){
          this.loader=false;
          this.fetchPropertyList();
          this.showModal.property = false;
          this.isEditModal = false;
          this.showActionDropDown = {};
          this.propertyUserModal.reset();
          this.alertService.alert("success", "Edit Property Successfully", "Success", { displayDuration: 2000, pos: 'top' });
        } else{
          this.alertService.alert("error", "Something went Wrong", "Error", { displayDuration: 2000, pos: 'top' });
        }
      })
    } else {
      this.alertService.alert("error", "Please Check Fields Again", "Error", { displayDuration: 2000, pos: 'top' });
    }

  }

  deletePropertyModal(propertyId:any,idx: any) {
    this.deletePropertyIndex = idx;
    this.selectedPropertyId = propertyId;
    this.showModal.delete = true;
  }

  deleteProperty() {
    this.ownerService.deleteProperty(this.selectedPropertyId,(res:any)=>{
      if(res.status == 200){
        this.fetchPropertyList();
        this.propertyList.splice(this.deletePropertyIndex, 1);
        this.showModal.delete = false;
        this.deletePropertyIndex = 0;
        this.selectedPropertyId = 0;
        this.alertService.alert("error", "Property Deleted Successfully", "Success", { displayDuration: 2000, pos: 'top' });
      }else{
        this.alertService.alert("error", "Please Check Fields Again", "Error", { displayDuration: 2000, pos: 'top' });
      }
    })
  }

  getCurrentLatLong() {
    let ths: any = this;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        ths.propertyUserModal.controls.latitudes.setValue(latitude);
        ths.propertyUserModal.controls.longitudes.setValue(longitude);
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }

  backToManageProperty() {
    this.showModal.property = false;
    this.isEditModal = false;
    this.showActionDropDown= {};
  }

  fetchCountry() {
    this.ownerService.fetchCountry((res: any) => {
      if (res.status == 200) {
        this.countryList = res.data;
      }
    })
  }

  viewCalendar(propertyid:any){
    localStorage.setItem("selectedPropertyId",propertyid);
    this.router.navigate(['/owner/calendar-view',propertyid]);
  }

  setAllPropertyListToLocal(data:any){
    localStorage.setItem("propertyList",JSON.stringify(data));
  }

  
  selectTimeZone(event: any) {
    this.propertyUserModal.controls.time_zone.setValue(event.target.value.split("UTC")[1]);
    this.propertyUserModal.controls.time_zone.updateValueAndValidity();
  }
  
}

