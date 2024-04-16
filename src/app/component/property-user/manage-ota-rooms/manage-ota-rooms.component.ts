import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PropertyService } from 'src/app/services/property.service';
import { AlertService } from 'src/app/shared/alert.service';

@Component({
  selector: 'app-manage-ota-rooms',
  templateUrl: './manage-ota-rooms.component.html',
  styleUrls: ['./manage-ota-rooms.component.scss']
})
export class ManageOtaRoomsComponent {

  loader:boolean=false;
  otaRoomModal:any;
  otaRoomList:any=[];
  showModal: any = { otaRoom: false, delete: false };
  showActionDropDown: any = {};
  isEditModal: boolean = false;
  currentOtaRoomId:any;
  deleteOtaRoomIndex:number=0;
  currentPropertyId:number=0;
  otaUserList:any=[];
  roomList:any=[];

  constructor(private _service: PropertyService,private fb:FormBuilder,private alertService:AlertService) { 
    this.otaRoomModal = this.fb.group({
        property_id:[''],
        ota_user_id:[],
        room_id:[''],
        room_name: [''],
        occupancy: ['',[Validators.required]],
        extra_adult_price: ['',[Validators.required,]],
        child_price: ['',[Validators.required,]],
        infant_price: ['',[Validators.required,]],
        internal_room_id: [''],
        requester_ip: ['']
    })
  }

  ngOnInit() {
    this.fetchOtaRoomList();
    this.currentPropertyId = JSON.parse(<any>localStorage.getItem("selectedPropertyId"));
    if(!this.currentPropertyId){
      this.currentPropertyId = JSON.parse(<any>localStorage.getItem("userId"));
    }
  }

  fetchOtaRoomList() {
    this.loader=true;
    this._service.fetchOtaRooms((res:any)=>{
      if(res.status == 200){
        console.log(res);
        this.otaRoomList = res.data;
        this.loader=false;
      }else{
        this.loader =false;
      }
    })
  }

  openModal(){
    this.showModal.otaRoom=true;
    this.fetchOtaUserList();
    this.fetchRoomList();
    this.fetchIpAddress();
  }

  fetchOtaUserList(){
    this._service.fetchOtaUserDetail((res:any)=>{
      if(res.status == 200){
        this.otaUserList = res.data;
      }
    })
  }

  fetchRoomList(){
    this._service.fetchAllRooms((res:any)=>{
      if(res.status == 200){
        this.roomList = res.data;
      }
    })
  }

  closeModal(){
    this.showModal.delete = false;
  }
  
  deleteRoom(){

  }

  showDropDown(idx: any) {
    this.showActionDropDown[idx] = !this.showActionDropDown[idx];
  }

  
  editRoomOpenModal(item: any) {
    this.isEditModal = true;
    this.otaRoomModal.patchValue(item);
    console.log(item);
    this.showModal.otaRoom = true;
    this.currentOtaRoomId = item.room_id;
    this.fetchOtaUserList();
    this.fetchRoomList();

  }

  deleteRoomModal(roomId: any, idx: any) {
    this.deleteOtaRoomIndex = idx;
    this.currentOtaRoomId = +roomId;
    this.showModal.delete = true;
  }
  
  backToManageRoom() {
    this.showModal.otaRoom = false;
    this.showActionDropDown = {};
  }

  createNewOtaRoom(){
    if (this.otaRoomModal.status == "VALID") {
      this.otaRoomModal.controls.property_id.setValue(this.currentPropertyId);

      this._service.addOtaRoom(this.otaRoomModal.value, (res: any) => {
        if (res.status == 200) {
          this.showModal.otaRoom = false;
          this.otaRoomModal.reset();
          this.alertService.alert("success", "New Room Created", "Success", { displayDuration: 3000, pos: 'top' });
        }
        else {
          this.alertService.alert("error", "Something went wrong", "Error", { displayDuration: 3000, pos: 'top' });
        }
      });
    }
    else {
      this.alertService.alert("error", "Please Check Fields Again", "Error", { displayDuration: 3000, pos: 'top' });
    }
  }

  editOtaRoom(){
    if (this.otaRoomModal.status == "VALID") {
      this.convertStringToNumber();
      const editModalObj: any = JSON.parse(JSON.stringify(this.otaRoomModal.value));
      editModalObj['id'] = this.currentOtaRoomId;
      this._service.editOtaRoom(editModalObj, (res: any) => {
        if (res.status == 200) {
          this.showModal.otaRoom = false;
          this.isEditModal = false;
          this.showActionDropDown = {};
          this.otaRoomModal.reset();
          this.currentOtaRoomId = 0;
          this.fetchOtaRoomList();
          this.alertService.alert("success", "Edit Room Successfully", "Success", { displayDuration: 2000, pos: 'top' });
        }
      })
    } else {
      this.alertService.alert("error", "Please Check Fields Again", "Error", { displayDuration: 2000, pos: 'top' });
    }
    console.log(this.otaRoomModal.value);

  }

  getRoomNameAndId(event:any){
    console.log(event.target.value);
    let roomData:any = JSON.parse(event.target.value);
    this.otaRoomModal.controls.room_id.setValue(roomData.room_id);
    this.otaRoomModal.controls.room_name.setValue(roomData.room_name);

    
  }

  convertStringToNumber() {
    //will be converted into number type here !
    return true;
  }

   async fetchIpAddress(){
        let ipAdress = await fetch("https://api.ipify.org?format=json").then((res:any)=>res.json());
        console.log(ipAdress);
        if(ipAdress.ip){
          this.otaRoomModal.controls.requester_ip.setValue(ipAdress.ip);
          this.otaRoomModal.controls.requester_ip.updateValueAndValidity();
          console.log(this.otaRoomModal.value);
          
          
        }
        
  }

}
