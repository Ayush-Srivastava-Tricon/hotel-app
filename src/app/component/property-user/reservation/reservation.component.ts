import { Component,} from '@angular/core';
import {  FormControl } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';
import { PropertyService } from 'src/app/services/property.service';
import { AlertService } from 'src/app/shared/alert.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent {


  showModal: any = {};
  loader: boolean = false;
  reservationList: any = [];
  showActionDropDown: any = {};
  isEditModal: boolean = false;
  reservationModal: any = new FormControl();
  currentPropertyId: number = 0;
  currentReservationId: number = 0;
  deleteReservationIndex: number = 0;
  searchRoomAvailConfig: any = {'available':true,'reservationType':'normal'};
  addReservationConfig: any = [];
  todayDate: any = new Date();
  paymentModeList: any = [];
  guestNameConfig: any =
    {
      "first_name": "",
      "last_name": "",
      "email": "",
      "mobile": "",
      "language": "",
      "travel_agency": "",
      "customer_type": 1
    };

  guestListData: any = [];
  guestTotalConfig: any = { adult: 0, child: 0, baby: 0 };
  source:boolean=false;
  otaDetailsList:any=[];

  reservationPayloadDataConfig:any={
    reservationData: {
      "total_adult": "",
      "total_children": "",
      "total_baby": "",
      "special_request": "",
      "check_in": "",
      "check_out": "",
      "arrival_estimate_time": "",
      "cancellation_date": "",
      "created_by": "",
      "property_id": "",
      "colors":""
    },
  guestData:[],
  rooms:[],
  payments:  {
    "payment_method_id":"",
    "paid_amt":"",
    "payment_date":"",
    "received_by":"Shikhar Sir",
  }
  }

  addMoreGuestData:any=[];
  successReservationConfig:any={showAlert:false,alertMsg:''};


  constructor( private _service: PropertyService, private alert: AlertService,private adminService:AdminService) {
   
  }

  ngOnInit() {
    // this.fetchReservation();
    this.currentPropertyId = JSON.parse(<any>localStorage.getItem("selectedPropertyId")); 
    if(!this.currentPropertyId){
      this.currentPropertyId = JSON.parse(<any>localStorage.getItem("userId"))
    }
  }


  showAvailibility() {
    this.loader = true;
    this.reservationList=[];
    this.searchRoomAvailConfig.available = this.searchRoomAvailConfig.available ? 1 : 0;
    this.searchRoomAvailConfig.disc = this.searchRoomAvailConfig.disc ? 1 : 0;
    this.searchRoomAvailConfig.property_id = this.currentPropertyId;
    this._service.fetchReservation(this.searchRoomAvailConfig, (res: any) => {
      if (res.status == 200 && res.responseData?.displayData?.length > 0) {
        this.loader = false;
        this.reservationList = res.responseData.displayData;

        this.alert.alert("success", res.message, "Success", { displayDuration: 3000, pos: 'top' });
      } else {
        this.reservationList = [];
        this.loader = false;
        this.alert.alert("error", "No Rooms Found", "Error", { displayDuration: 3000, pos: 'top' });
      }
    })
  }


  openModal() {
    this.showModal.reservation = true;
    this.reservationModal.reset();
    this.isEditModal = false;
  }

  editReservation() {
    if (this.reservationModal.status == "VALID") {

    }
  }

  showDropDown(idx: any) {
    this.showActionDropDown[idx] = !this.showActionDropDown[idx];
  }

  editReservationOpenModal(item: any) {

  }

  deleteReservationModal(reservationId: any, idx: any) {
    this.deleteReservationIndex = idx;
    this.currentReservationId = +reservationId;
    this.showModal.delete = true;
  }

  backToManageReservation() {
    this.showModal.reservation = false;
    this.successReservationConfig={};
    this.showActionDropDown = {};
    this.addReservationConfig = [];
    this.reservationList = [];
    this.searchRoomAvailConfig = JSON.parse(JSON.stringify({'available':true,'reservationType':'normal'}));
  }

  closeModal() {
    this.showModal.reservation = false;
    this.showModal.delete = false;
    this.isEditModal = false;
    this.reservationModal.reset();
  }

  deleteReservation() {

  }

  addReservationNextStep() {
    if (this.addReservationConfig.length == 0) {
      this.alert.alert("error", "No Room Selected", "Error", { displayDuration: 2000, pos: 'top' });
    } else {
      this.showModal.reservation = true;
      this.getGuestTotal();
      this.getPaymentMethod();
      this.getOtaDetailsList();
    }
  }

  getOtaDetailsList(){
    this.adminService.fetchOtaDetails((res:any)=>{
      if(res.status == 200){
        this.otaDetailsList = res.data;
      }
    })
  }

  selectAvailabilityReservation(event: any, room: any, parentRoom: any) {

    let selectedRoom: any = room;
    let selectedQuantity: any = +event.target.value;
    if (this.addReservationConfig.length == 0) {
      for (let i = 0; i < selectedQuantity; i++) {
        this.addReservationConfig.push(
          {
            ...selectedRoom,
            'quantity': selectedQuantity,
            'parentRoom': parentRoom.parentRoom,
            'parentRoomId': parentRoom.parentRoomId,
            'check_in': this.searchRoomAvailConfig.start_date,
            'check_out': this.searchRoomAvailConfig.end_date,
            'internal_room_id':selectedRoom.room_id,
            'discount_id':0,
            'price':0,
            'deposit':0,
            'extra_facilities':{"SPA":0,"Jim":0,"Pool":0},
            'cancellation_date':''
          });
      }
    } else {
      let isExist: any = this.addReservationConfig.some((e: any) => e.room_id == selectedRoom.room_id);
      if (!isExist) {
        for (let i = 0; i < selectedQuantity; i++) {
          this.addReservationConfig.push(
            {
            ...selectedRoom,
            'quantity': selectedQuantity,
            'parentRoom': parentRoom.parentRoom,
            'parentRoomId': parentRoom.parentRoomId,
            'check_in': this.searchRoomAvailConfig.start_date,
            'check_out': this.searchRoomAvailConfig.end_date,
            'internal_room_id':selectedRoom.room_id,
            'discount_id':0,
            'price':0,
            'deposit':0,
            'extra_facilities':{"SPA":0,"Jim":0,"Pool":0},
            'cancellation_date':''
          });
        }
      } else {
        let notExistedReservationRooms = this.addReservationConfig.filter((e: any) => e.room_id != room.room_id);
        this.addReservationConfig = [];
        if (notExistedReservationRooms.length == 0) {
          for (let i = 0; i < selectedQuantity; i++) {
            this.addReservationConfig.push(
              {
                ...selectedRoom,
                'quantity': selectedQuantity,
                'parentRoom': parentRoom.parentRoom,
                'parentRoomId': parentRoom.parentRoomId,
                'check_in': this.searchRoomAvailConfig.start_date,
                'check_out': this.searchRoomAvailConfig.end_date,
                'internal_room_id':selectedRoom.room_id,
                'discount_id':0,
                'price':0,
                'deposit':0,
                'extra_facilities':{"SPA":0,"Jim":0,"Pool":0},
                'cancellation_date':''
              });
          }
        } else {
          for (let i = 0; i < selectedQuantity; i++) {
            this.addReservationConfig.push(
              {
                ...selectedRoom,
                'quantity': selectedQuantity,
                'parentRoom': parentRoom.parentRoom,
                'parentRoomId': parentRoom.parentRoomId,
                'check_in': this.searchRoomAvailConfig.start_date,
                'check_out': this.searchRoomAvailConfig.end_date,
                'internal_room_id':selectedRoom.room_id,
                'discount_id':0,
                'price':0,
                'deposit':0,
                'extra_facilities':{"SPA":0,"Jim":0,"Pool":0},
                'cancellation_date':''
              });
          }
          notExistedReservationRooms.forEach((e: any) => this.addReservationConfig.push(e));

        }

      }
    }

  }

  getPaymentMethod() {
    this._service.getPaymentMethod((res: any) => {
      if (res.status == 200) {
        this.paymentModeList = res.data;
      }
    })
  }

  trackBy(idx: any) {
    return idx;
  }

  getGuestTotal() {
    this.addReservationConfig.forEach((e: any) => {
      this.guestTotalConfig.adult = this.guestTotalConfig.adult + +e.adult;
      this.guestTotalConfig.child = this.guestTotalConfig.child + +e.child;
      // this.guestTotalConfig.baby  = this.guestTotalConfig.adult + +e.baby;
    })
  }

  setAdultGuestReserve(event: any) {

    const totalAdults = +event.target.value;
    const numRooms = this.addReservationConfig.length;
    const baseAdultsPerRoom = Math.floor(totalAdults / numRooms);
    let remainingAdults = totalAdults % numRooms;
    let additionalAdultsRooms = remainingAdults;

    this.addReservationConfig.forEach((room: any, index: any) => {
      room.adult = baseAdultsPerRoom + (additionalAdultsRooms > 0 ? 1 : 0);
      additionalAdultsRooms = Math.max(0, additionalAdultsRooms - 1);
    });
  }

  setChildGuestReserve(event: any) {
    const totalAdults = +event.target.value;
    const numRooms = this.addReservationConfig.length;
    const baseAdultsPerRoom = Math.floor(totalAdults / numRooms);
    let remainingChild = totalAdults % numRooms;
    let additionalChildRooms = remainingChild;

    this.addReservationConfig.forEach((room: any, index: any) => {
      room.child = baseAdultsPerRoom + (additionalChildRooms > 0 ? 1 : 0);
      additionalChildRooms = Math.max(0, additionalChildRooms - 1);
    });

  }

  setBabyGuestReserve(event: any) {

  }

  addMoreGuestInfo(){
        this.addMoreGuestData.push(
          {
          "first_name": "",
          "last_name": "",
          "email": "",
          "mobile": "",
          "language": "",
          "travel_agency": "",
          "customer_type": 2
        });
  }

  
  createNewReservation() {

    this.setTotalReservationData();
    this.setGuestData();
    this.setRoomsData();
    this.setPaymentMethodData();
    setTimeout(() => {
      this.loader=true;
      this._service.addReservationDetails(this.reservationPayloadDataConfig,(res:any)=>{
        if(res.status == 200){
          this.loader=false;
          this.alert.alert("success", res.message, "Success", { displayDuration: 3000, pos: 'top' });
          this.successReservationConfig.showAlert=true;
          this.successReservationConfig.alertMsg = res.reservation_number;
        }else{
          this.alert.alert("error", res.error ? res.error.message : res.message, "Error", { displayDuration: 3000, pos: 'top' });
          this.loader=false;
        }
      })
    }, 0);
  
  } 

  

  setTotalReservationData(){
    this.reservationPayloadDataConfig.reservationData.total_adult =  this.guestTotalConfig.adult;
    this.reservationPayloadDataConfig.reservationData.total_children =  this.guestTotalConfig.child;
    this.reservationPayloadDataConfig.reservationData.total_baby =  this.guestTotalConfig.baby;
    this.reservationPayloadDataConfig.reservationData.check_in =  this.searchRoomAvailConfig['start_date'];
    this.reservationPayloadDataConfig.reservationData.check_out =  this.searchRoomAvailConfig['end_date'];
    this.reservationPayloadDataConfig.reservationData.cancellation_date =  "";
    this.reservationPayloadDataConfig.reservationData.created_by =  "Ayush";     
    this.reservationPayloadDataConfig.reservationData.property_id = this.currentPropertyId;
    this.reservationPayloadDataConfig.reservationData.total_room = this.addReservationConfig.length;

  }

  setGuestData(){
    if(this.addMoreGuestData.length > 0 ){
      this.addMoreGuestData.push(this.guestNameConfig);
      this.reservationPayloadDataConfig.guestData = this.addMoreGuestData;
    }else{
      this.reservationPayloadDataConfig.guestData = [this.guestNameConfig];

    }
  }

  setRoomsData(){

      let filterPayloadData :any =  this.addReservationConfig.map((e:any)=>{
        return{
          "internal_room_id":e.room_id,
          "adult":e.adult,
          "children":e.child,
          "baby":e.baby,
          "check_in":e.check_in,
          "check_out":e.check_out,
          "discount_id":e.discount_id,
          "price":e.avg_pr,
          "deposit":e.deposit,
          "extra_facilities":e.extra_facilities,
          "cancellation_date":e.cancellation_date
      }
  
      });

      

      this.reservationPayloadDataConfig.rooms = filterPayloadData;
  }

  setPaymentMethodData(){
    this.reservationPayloadDataConfig.payments =  {
      "payment_method_id":1,
      "paid_amt":"3400",
      "payment_date":"2024-05-04",
      "received_by":"Shikhar Sir",
    }
  }

  getPaymentDetails(event:any){
    
  }

  addExtraFacility(item:any){
      item[`showExtraFac`] = !item[`showExtraFac`];
  }

  selectExtraFac(event:any,type:any,item:any){
      if(event.target.checked){
          item.extra_facilities[type] = 150;
      }else{
        delete item.extra_facilities[type];
      }
  }

  
}
