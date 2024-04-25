import { Component, ElementRef, ViewChild } from '@angular/core';
import { PropertyService } from 'src/app/services/property.service';
import { AlertService } from 'src/app/shared/alert.service';

@Component({
  selector: 'app-manage-internal-mapping',
  templateUrl: './manage-internal-mapping.component.html',
  styleUrls: ['./manage-internal-mapping.component.scss']
})
export class ManageInternalMappingComponent {

  internalRoomData:any=[];
  otaUserData:any=[];
  loader:boolean=false;
  showMappingPage:boolean=false;
  externalRoomData:any=[];
  currentOtaUserName:any='';
  selectedInternal:any=[];
  selectedExternal:any=[];

  mapConfig:any={};

  constructor(private propertyService:PropertyService,private alert: AlertService){}

  ngOnInit(){
    this.fetchOtaUserDetail();
  }

  fetchAllRooms(){
    this.loader=true;
    this.propertyService.fetchAllRooms((res:any)=>{
      if(res.status == 200){
        this.internalRoomData = res.data;
        console.log(res.data);
        this.loader=false;
      }else{
        this.loader=false;
      }
    })
  }

  fetchOtaUserDetail(){
    this.propertyService.fetchOtaUserDetail((res:any)=>{
      if(res.status == 200){
        this.otaUserData = res.data;
        console.log(res.data);
        this.loader=false;
      }else{
        this.loader=false;
      }
    })
  }

  mapOta(userId:any,userName:any){
      this.propertyService.fetchOtaRoomsById(userId,(res:any)=>{
        if(res.status == 200 && res.data.length>0){
          console.log(res);
          this.showMappingPage = true;
          this.externalRoomData = res.data;
          this.currentOtaUserName = userName;
          this.fetchAllRooms();
        }else{
          console.log("no data");
        }
      })
      
  }

  selectInternalRoomToMap(room:any){
      this.selectedInternal.push(room);
      this.internalRoomData.forEach((e:any)=>{
        if(e.room_id == room.room_id){
          e['activeIntRoomMap'] = true;
        }
      })
  }
  
  selectExternalRoomToMap(room:any){
    this.selectedExternal.push(room);
    this.externalRoomData.forEach((e:any)=>{
      if(e.room_id == room.room_id){
        e['activeIntRoomMap'] = true;
      }
    })
  }

  backToManageMapping(){
    this.showMappingPage=false;
    this.selectedInternal = [];
    this.selectedExternal = [];
    this.fetchOtaUserDetail();
  }

  removeIntRoom(idx:any,roomId:any){
    this.selectedInternal.splice(idx,1);
    this.internalRoomData.forEach((e:any)=>{
      if(e.room_id == roomId){
        e['activeIntRoomMap'] = false;
        e['activeMapping'] = false;
      }
    })
   

  }
  
  removeExtRoom(idx:any,roomId:any){
    this.selectedExternal.splice(idx,1);
    this.externalRoomData.forEach((e:any)=>{
      if(e.room_id == roomId){
        e['activeIntRoomMap'] = false;
        e['activeMapping'] = false;
      }
    })

  }

  setActiveIntRoomToMap(room:any){
    room['activeMapping'] = true;
    this.mapConfig['internal_room_id'] = +room.room_id;
  }

  setActiveExtRoomToMap(room:any){
    room['activeMapping'] = true;
    this.mapConfig['ota_rooms_id'] = +room.room_id;
    this.mapConfig['ota_user_id'] = +room.id;
    this.setInternalMappingBetweenRoom();
  }

  setInternalMappingBetweenRoom(){
      let params:any= {
        "ota_rooms_id":  this.mapConfig['ota_rooms_id'],
        "ota_user_id": this.mapConfig['ota_user_id'],
        "internal_room_id":this.mapConfig['internal_room_id']
      };

      if(params.ota_rooms_id && params.ota_user_id && params.internal_room_id){
        this.propertyService.setInternalMappingBetweenRoom(params,(res:any)=>{
          if(res.status == 200){
            console.log(res);
            this.alert.alert("success", res.message, "Success", { displayDuration: 2000, pos: 'top' });
            this.mapConfig={};
          }else{
            this.alert.alert("error", res.message, "Error", { displayDuration: 2000, pos: 'top' });
            this.mapConfig={};
          }
        })
      }

      


  }

}
