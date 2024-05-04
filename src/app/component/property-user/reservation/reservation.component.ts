import { Component,} from '@angular/core';
import {  FormControl } from '@angular/forms';
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
  searchRoomAvailConfig: any = {};
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
      "property_id": ""
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


  constructor( private _service: PropertyService, private alert: AlertService) {
   
  }

  ngOnInit() {
    // this.fetchReservation();
    this.currentPropertyId = JSON.parse(<any>localStorage.getItem("selectedPropertyId"));
  }


  showAvailibility() {
    this.loader = true;
    this.searchRoomAvailConfig.available = this.searchRoomAvailConfig.available ? 1 : 0;
    this.searchRoomAvailConfig.disc = this.searchRoomAvailConfig.disc ? 1 : 0;
    this.searchRoomAvailConfig.property_id = this.currentPropertyId;
    this._service.fetchReservation(this.searchRoomAvailConfig, (res: any) => {
      if (res.status == 200 && res.responseData?.displayData.length > 0) {
        console.log(res);
        this.loader = false;
        this.reservationList = res.responseData.displayData;

        this.alert.alert("success", res.message, "Success", { displayDuration: 3000, pos: 'top' });
      } else {
        this.reservationList = [];
        this.loader = false;
        this.alert.alert("error", res.message, "Error", { displayDuration: 3000, pos: 'top' });
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
    this.showActionDropDown = {};
    this.addReservationConfig = [];
    this.reservationList = [];
    this.searchRoomAvailConfig = {};
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
    }
  }

  selectAvailabilityReservation(event: any, room: any, parentRoom: any) {

    let selectedRoom: any = room;
    let selectedQuantity: any = +event.target.value;
    if (this.addReservationConfig.length == 0) {
      for (let i = 0; i < selectedQuantity; i++) {
        this.addReservationConfig.push({ ...selectedRoom, 'quantity': selectedQuantity, 'parentRoom': parentRoom.parentRoom, 'parentRoomId': parentRoom.parentRoomId, 'start_date': this.searchRoomAvailConfig.start_date, 'end_date': this.searchRoomAvailConfig.end_date });
      }
    } else {
      let isExist: any = this.addReservationConfig.some((e: any) => e.room_id == selectedRoom.room_id);
      if (!isExist) {
        for (let i = 0; i < selectedQuantity; i++) {
          this.addReservationConfig.push({ ...selectedRoom, 'quantity': selectedQuantity, 'parentRoom': parentRoom.parentRoom, 'parentRoomId': parentRoom.parentRoomId, 'start_date': this.searchRoomAvailConfig.start_date, 'end_date': this.searchRoomAvailConfig.end_date });
        }
      } else {
        let notExistedReservationRooms = this.addReservationConfig.filter((e: any) => e.room_id != room.room_id);
        this.addReservationConfig = [];
        if (notExistedReservationRooms.length == 0) {
          for (let i = 0; i < selectedQuantity; i++) {
            this.addReservationConfig.push({ ...selectedRoom, 'quantity': selectedQuantity, 'parentRoom': parentRoom.parentRoom, 'parentRoomId': parentRoom.parentRoomId, 'start_date': this.searchRoomAvailConfig.start_date, 'end_date': this.searchRoomAvailConfig.end_date });
          }
        } else {
          for (let i = 0; i < selectedQuantity; i++) {
            this.addReservationConfig.push({ ...selectedRoom, 'quantity': selectedQuantity, 'parentRoom': parentRoom.parentRoom, 'parentRoomId': parentRoom.parentRoomId, 'start_date': this.searchRoomAvailConfig.start_date, 'end_date': this.searchRoomAvailConfig.end_date });
          }
          notExistedReservationRooms.forEach((e: any) => this.addReservationConfig.push(e));

        }

      }
    }

    console.log(this.addReservationConfig);



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

    console.log(this.addReservationConfig);
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

    console.log(this.addReservationConfig);
  }

  setBabyGuestReserve(event: any) {

  }

  addMoreGuestInfo(){
    this.addMoreGuestData.push(this.guestNameConfig);
  }

  
  createNewReservation() {

    this.setTotalReservationData();
    this.setGuestData();
    this.setRoomsData();
    this.setPaymentMethodData();

    setTimeout(() => {
      this._service.addReservationDetails(this.reservationPayloadDataConfig,(res:any)=>{
        if(res.status == 200){
          console.log(res);
        }
      })
    }, 0);
   
  
  } 

  setTotalReservationData(){
    this.reservationPayloadDataConfig.reservationData.total_adult =  this.guestTotalConfig.adult;
    this.reservationPayloadDataConfig.reservationData.total_children =  this.guestTotalConfig.child;
    this.reservationPayloadDataConfig.reservationData.total_baby =  this.guestTotalConfig.baby;
    this.reservationPayloadDataConfig.reservationData.check_in =  "2024-05-25";
    this.reservationPayloadDataConfig.reservationData.check_out =  "2024-05-28";
    this.reservationPayloadDataConfig.reservationData.arrival_estimate_time =  "12pm";
    this.reservationPayloadDataConfig.reservationData.cancellation_date =  "";
    this.reservationPayloadDataConfig.reservationData.created_by =  "Ayush";     
  }

  setGuestData(){
        this.addMoreGuestData.push(this.guestNameConfig);
        this.reservationPayloadDataConfig.guestData = this.addMoreGuestData;
  }

  setRoomsData(){
      this.reservationPayloadDataConfig.rooms = this.addReservationConfig;
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

}
