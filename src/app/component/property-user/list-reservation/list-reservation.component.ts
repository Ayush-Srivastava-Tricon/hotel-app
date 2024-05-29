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
    "ota_details_id":null, 
    "guest_email" : "",
    "arrival_status" : "3_days" 
  };
  showActionDropDown:any={};
  otaDetailList:any=[];
  isEditReservation:boolean=false;
  reservationPayloadDataConfig:any={

  }
  roomAvailConfig:any={};
  guestTotalConfig:any={};
  todayDate:any = new Date();
  guestNameConfig:any={};
  addMoreGuestData:any=[];
  paymentModeList:any=[];
  daysBetweenDates:any;
  currentPropertyId:number=0;

  editReservationDataConfig:any={reservationData:{}};

  @ViewChild(MultiselectDropdownComponent) multiselect!:MultiselectDropdownComponent;


  constructor(private _service:PropertyService,private adminService:AdminService,public constant:AppConstants,private alert:AlertService){
  }

  ngOnInit(){
    this.currentPropertyId = JSON.parse(<any>localStorage.getItem("selectedPropertyId")); 
    if(!this.currentPropertyId){
      this.currentPropertyId = JSON.parse(<any>localStorage.getItem("userId"))
    }
    this.searchConfig['property_id'] = this.currentPropertyId;
    this.getListOfReservation();
    this.getOtaDetailList();
  }


  getListOfReservation(){
    this.loader=true;
    this.searchConfig['property_id'] = this.currentPropertyId;
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
          window.scroll(0,0);
          this.editReservationDataConfig = res.responseData;
          this.editReservationDataConfig['reservationData'] = item;
          this.editReservationDataConfig['reservationData']['reservation_id'] = item.id;
          delete this.editReservationDataConfig['reservationData'].id;
          this.editReservationDataConfig['reservationData']['cancellation_date'] = "";
          this.calculateDaysBetweenDates(item);
          this.getPaymentMethod();
        }else{
          this.alert.alert("error",res.message,"Error",{ displayDuration: 2000, pos: 'top' })
        };
      })
  }

  getPaymentMethod() {
    this._service.getPaymentMethod((res: any) => {
      if (res.status == 200) {
        this.paymentModeList = res.data;
      }
    })
  }

  calculateDaysBetweenDates(reservationDetail: any) {
    let date1 = new Date(reservationDetail.check_in);
    let date2 = new Date(reservationDetail.check_out);

    let Difference_In_Time = date2.getTime() - date1.getTime();

    let Difference_In_Days = Math.round(Difference_In_Time / (1000 * 3600 * 24));

    this.daysBetweenDates = Difference_In_Days;
  }

  receiveChildEvent(event:any){
    if(event['action'] === 'selectedReservationStatus'){
      this.searchConfig['reservation_status'] = event.value;
      console.log(this.searchConfig);
      
    }
  }

  searchByFilter(){
    this.loader=true;
    this.searchConfig['property_id'] = this.currentPropertyId;
    this._service.getListOfReservation(this.searchConfig,(res:any)=>{
      if(res.status == 200 && res.data.length> 0){
        this.reservtionList = res.data;
        this.loader=false;
      } else{
          this.reservtionList =[];
          this.loader=false;
          this.alert.alert("error",res.message,"Success",{ displayDuration: 2000, pos: 'top' })
        }
    })
    
  }

  clearReservationStatus(){
    this.constant.reservation_status.forEach((e:any)=>e.checked=false);
    this.searchConfig['reservation_status']= [];
    this.multiselect?.clearSelectedValues();
  }

  clearAllFilter(){
    this.searchConfig = {
      "reservations_no": "", 
      "reservation_status":[], 
      "ota_details_id":null, 
      "guest_email" : "",
      "arrival_status" : null 
    };
    this.clearReservationStatus();
  }

  backToListReservation(){
    this.isEditReservation=false;
    this.showActionDropDown={};
    this.clearAllFilter();
    this.getListOfReservation();

  }

  setAdultGuestReserve(event: any) {

    const totalAdults = +event.target.value;
    const numRooms = this.editReservationDataConfig.rooms.length;
    const baseAdultsPerRoom = Math.floor(totalAdults / numRooms);
    let remainingAdults = totalAdults % numRooms;
    let additionalAdultsRooms = remainingAdults;

    this.editReservationDataConfig.rooms.forEach((room: any, index: any) => {
      room.adult = baseAdultsPerRoom + (additionalAdultsRooms > 0 ? 1 : 0);
      additionalAdultsRooms = Math.max(0, additionalAdultsRooms - 1);
    });

    console.log(this.editReservationDataConfig.rooms);
  }

  setChildGuestReserve(event: any) {
    const totalAdults = +event.target.value;
    const numRooms = this.editReservationDataConfig.rooms.length;
    const baseAdultsPerRoom = Math.floor(totalAdults / numRooms);
    let remainingChild = totalAdults % numRooms;
    let additionalChildRooms = remainingChild;

    this.editReservationDataConfig.rooms.forEach((room: any, index: any) => {
      room.children = baseAdultsPerRoom + (additionalChildRooms > 0 ? 1 : 0);
      additionalChildRooms = Math.max(0, additionalChildRooms - 1);
    });

    console.log(this.editReservationDataConfig.rooms);
  }

  setBabyGuestReserve(event: any) {

}

addMoreGuestInfo(){
      this.editReservationDataConfig.guestData.push(
        {
          "first_name": "",
          "last_name": "",
          "email": "",
          "mobile": "",
          "language": "",
          "travel_agency": "",
          "customer_type": 2
        }
      )
}

getPaymentDetails(event:any){
    
}

trackBy(idx:any){
  return idx;
}

addExtraFacility(item:any){
  item[`showExtraFac`] = !item[`showExtraFac`];
}

selectExtraFac(event:any,typ:any,item:any){

}

editReservation(){
  this.reMakePayloadData();
  console.log(this.editReservationDataConfig);
      
}

reMakePayloadData(){
    this.editReservationDataConfig.rooms.forEach((e:any)=>{
        e['reserved_room_id'] = e.id;
        delete e.id;
        delete e.reservations_id;
    })
}

copyCode(val: string){
  const selBox = document.createElement('textarea');
  selBox.style.position = 'fixed';
  selBox.style.left = '0';
  selBox.style.top = '0';
  selBox.style.opacity = '0';
  selBox.value = val;
  document.body.appendChild(selBox);
  selBox.focus();
  selBox.select();
  document.execCommand('copy');
  document.body.removeChild(selBox);
  this.alert.alert("success","Reseration Code Copied","Success",{ displayDuration: 1000, pos: 'top' })
}

}
