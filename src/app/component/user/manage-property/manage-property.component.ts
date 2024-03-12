import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AppConstants } from 'src/app/constants/app.constant';
import { AlertService } from 'src/app/shared/alert.service';

@Component({
  selector: 'app-manage-property',
  templateUrl: './manage-property.component.html',
  styleUrls: ['./manage-property.component.scss']
})
export class ManagePropertyComponent {

  propertyUserModal:any;
  stateList:any=[];
  cityList:any=[];
  countryId:number=1;
  propertyList:any=[];
  showModal:any={property:false,delete:false};
  showActionDropDown:any={};
  isEditModal:boolean=false;
  deletePropertyIndex:number=0;

  constructor(private fb:FormBuilder,private constants:AppConstants,private alertService:AlertService){
    this.propertyUserModal  = this.fb.group(
      {
        property_name:['',[Validators.required]],
        email:['',[Validators.required]],
        password:['',[Validators.required]],
        mobile:['',[Validators.required]],
        property_type:['',[Validators.required]],
        address:['',[Validators.required]],
        city:[{value:'',disabled:true},[Validators.required]],
        state:[{value:'',disabled:true},[Validators.required]],
        country:['',[Validators.required]],
        postal_code:['',[Validators.required]],
        description:['',[Validators.required]],
        owner_id:['',[Validators.required]],
        amenities:['',[Validators.required]],
        latitudes:['',[Validators.required]],
        longitudes:['',[Validators.required]],
      }
    )
    this.propertyList =[
      {
        "property_id": 1,
        "email": "amit-kumar@e2x.com",
        "property_name": "Taj",
        "property_type": "HOTEL",
        "address": null,
        "mobile": "8765654345",
        "city": "Lucknow",
        "state": "Uttar Pradesh",
        "country": "India",
        "postal_code": "987675",
        "description": null,
        "owner_id": null,
        "amenities": "",
        "status": 1,
        "latitudes": null,
        "longitudes": null,
        "created_at": "2024-03-07 14:23:09",
        "updated_at": "2024-03-07 14:23:09"
    },
     {
      "property_id": 2,
      "email": "amittkumar@e2x.com",
      "property_name": "Taj",
      "property_type": "HOTEL",
      "address": null,
      "mobile": "8765654345",
      "city": "New Delhi",
      "state": "Delhi",
      "country": "India",
      "postal_code": "987675",
      "description": null,
      "owner_id": null,
      "amenities": "",
      "status": 0,
      "latitudes": null,
      "longitudes": null,
      "created_at": "2024-03-07 14:34:17",
      "updated_at": "2024-03-07 14:34:17"
  }

    ]
  }

  createNewProperty(){
      if(this.propertyUserModal.status == "VALID"){
        console.log(this.propertyUserModal.controls);
        this.propertyList.push(this.propertyUserModal.value);
        this.showModal.property=false;
        this.propertyUserModal.reset();
        this.alertService.alert("success", "New Property Created", "Success", { displayDuration: 2000, pos: 'top' });
      }else{
        this.alertService.alert("error", "Please Check Fields Again", "Error", { displayDuration: 2000, pos: 'top' });
      }
  }

  selectCountry(event:any){
        this.stateList=[];
        this.cityList=[];
        this.countryId = event.target.value;
        this.getStateByCountry(event.target.value);

  }

  getStateByCountry(id:any){
      this.cityList=[];
      this.stateList =  this.constants.stateList.find((e:any)=>e.id == id);
      this.propertyUserModal.controls.state.enable();
  }

  getCityByState(event:any){
      this.cityList = this.constants.cityList.find((e:any)=>{
        if(e.country_id == this.countryId && e.state_id == event.target.value){
          return e || [];
        }
      })
      if(this.cityList){
        this.propertyUserModal.controls.city.enable();
      }else{
        this.cityList = [];
        this.propertyUserModal.controls.city.disable();
      }

      
  }

  openModal(){
    this.showModal.property= true;
    this.propertyUserModal.reset();
  }

  closeModal(){
   this.showModal.property= false;
   this.showModal.delete=false;
   this.isEditModal= false;
   this.propertyUserModal.reset();
  }

  showDropDown(idx:any){
    this.showActionDropDown[idx] = !this.showActionDropDown[idx];
  }

  editPropertyOpenModal(item:any){
      this.isEditModal= true;
      this.propertyUserModal.patchValue(item);
      console.log(item);
      this.showModal.property=true;
  }

  editProperty(){
    if(this.propertyUserModal.status == "VALID"){
      this.showModal.property=false;
      this.isEditModal= false;
      this.showActionDropDown={};
      this.propertyUserModal.reset();
      this.alertService.alert("success", "Edit Property Successfully", "Success", { displayDuration: 2000, pos: 'top' });
    }else{
      this.alertService.alert("error", "Please Check Fields Again", "Error", { displayDuration: 2000, pos: 'top' });
    }
      
  }

  deletePropertyModal(idx:any){
    this.deletePropertyIndex = idx;
    this.showModal.delete=true;
  }

  deleteProperty(){
      this.propertyList.splice(this.deletePropertyIndex,1);
      this.showModal.delete=false;
      this.deletePropertyIndex=0;
  }

  getCurrentLatLong(){
    let ths:any= this;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        ths.propertyUserModal.controls.latitudes.setValue(latitude);
        ths.propertyUserModal.controls.longitudes.setValue(longitude);
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }


}

