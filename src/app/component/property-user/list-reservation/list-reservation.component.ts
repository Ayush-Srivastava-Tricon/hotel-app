import { Component, ViewChild } from '@angular/core';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { AppConstants } from 'src/app/constants/app.constant';
import { AdminService } from 'src/app/services/admin.service';
import { PropertyService } from 'src/app/services/property.service';
import { AlertService } from 'src/app/shared/alert.service';
import { MultiselectDropdownComponent } from 'src/app/shared/multiselect-dropdown/multiselect-dropdown.component';

@Component({
  selector: 'app-list-reservation',
  templateUrl: './list-reservation.component.html',
  styleUrls: ['./list-reservation.component.scss']
})
export class ListReservationComponent {

  loader:boolean=false;
  reservtionList:any=[];
  searchConfig:any={
    "reservations_no": "", 
    "reservation_status":[], 
    "ota_details_id":"", 
    "guest_email" : "",
    "arrival_status" : "" 
  };
  showActionDropDown:any={};
  otaDetailList:any=[];
  isEditReservation:boolean=false;
  reservationPayloadDataConfig:any={

  }
  editReservationConfig:any=[];

  roomAvailConfig:any={};
  guestTotalConfig:any={};
  todayDate:any = new Date();
  guestNameConfig:any={};
  addMoreGuestData:any=[];
  paymentModeList:any=[];

  @ViewChild(MultiselectDropdownComponent) multiselect!:MultiselectDropdownComponent;


  constructor(private _service:PropertyService,private adminService:AdminService,public constant:AppConstants,private alert:AlertService){}

  ngOnInit(){
    this.getListOfReservation();
    this.getOtaDetailList();
  }


  getListOfReservation(){
    this.loader=true;
    this._service.getListOfReservation(this.searchConfig,(res:any)=>{
      if(res.status == 200){
        this.reservtionList = res.data;
      this.loader=false;
      }else{
        this.loader=false;
      }
    })
  }

  getOtaDetailList(){
    this.adminService.fetchOtaDetails((res:any)=>{
      if(res.status == 200){
        this.otaDetailList = res.data;
      }
    })
  }


  showDropDown(idx:any){
      this.showActionDropDown[idx] = !this.showActionDropDown[idx];
  }

  getSingleReservation(item:any){
      this._service.getSingleReservation(item.id,(res:any)=>{
        if(res.status == 200 && (res.responseData.rooms.length>0 || res.responseData.guestData.length > 0 || res.responseData.payments.length > 0 )){
          this.isEditReservation=true;
          this.reservationPayloadDataConfig = res.responseData;
        this.editReservationConfig = this.reservationPayloadDataConfig.rooms;
        this.addMoreGuestData = this.reservationPayloadDataConfig.guestData;
        }else{
          this.alert.alert("error",res.message,"Error",{ displayDuration: 2000, pos: 'top' })
        };
      })
  }

  receiveChildEvent(event:any){
    if(event['action'] === 'selectedReservationStatus'){
      this.searchConfig['reservation_status'] = event.value;
      console.log(this.searchConfig);
      
    }
  }

  searchByFilter(){
    this.loader=true;
    this._service.getListOfReservation(this.searchConfig,(res:any)=>{
      if(res.status == 200 && res.data.length> 0){
        this.reservtionList = res.data;
        this.loader=false;
      } else{
          this.reservtionList =[];
          this.loader=false;
          this.alert.alert("error",res.message,"Error",{ displayDuration: 2000, pos: 'top' })
        }
    })
    
  }

  clearReservationStatus(){
    this.constant.reservation_status.forEach((e:any)=>e.checked=false);
    this.searchConfig['reservation_status']= [];
    this.multiselect.clearSelectedValues();
  }

  clearAllFilter(){
    this.searchConfig = {
      "reservations_no": "", 
      "reservation_status":[], 
      "ota_details_id":"", 
      "guest_email" : "",
      "arrival_status" : "" 
    };
    this.clearReservationStatus();
  }

  backToListReservation(){
    this.isEditReservation=false;
    this.showActionDropDown={};
  }

  setAdultGuestReserve(event: any) {

    const totalAdults = +event.target.value;
    const numRooms = this.editReservationConfig.length;
    const baseAdultsPerRoom = Math.floor(totalAdults / numRooms);
    let remainingAdults = totalAdults % numRooms;
    let additionalAdultsRooms = remainingAdults;

    this.editReservationConfig.forEach((room: any, index: any) => {
      room.adult = baseAdultsPerRoom + (additionalAdultsRooms > 0 ? 1 : 0);
      additionalAdultsRooms = Math.max(0, additionalAdultsRooms - 1);
    });

    console.log(this.editReservationConfig);
  }

  setChildGuestReserve(event: any) {
    const totalAdults = +event.target.value;
    const numRooms = this.editReservationConfig.length;
    const baseAdultsPerRoom = Math.floor(totalAdults / numRooms);
    let remainingChild = totalAdults % numRooms;
    let additionalChildRooms = remainingChild;

    this.editReservationConfig.forEach((room: any, index: any) => {
      room.child = baseAdultsPerRoom + (additionalChildRooms > 0 ? 1 : 0);
      additionalChildRooms = Math.max(0, additionalChildRooms - 1);
    });

    console.log(this.editReservationConfig);
  }

  setBabyGuestReserve(event: any) {

}

addMoreGuestInfo(){

}

getPaymentDetails(event:any){

}

trackBy(idx:any){
  return idx;
}

addExtraFacility(item:any){

}

selectExtraFac(event:any,typ:any,item:any){

}

editReservation(){
  
}
}
