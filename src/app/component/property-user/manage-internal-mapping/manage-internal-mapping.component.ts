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
  currentOtaUserId:number=0;
  currentPropertyId:any;


  constructor(private propertyService:PropertyService,private alert: AlertService){}

  ngOnInit(){
    this.currentPropertyId = JSON.parse(<any>localStorage.getItem("selectedPropertyId"));
    if(!this.currentPropertyId){
      this.currentPropertyId = JSON.parse(<any>localStorage.getItem("userId"));
    }
    this.fetchOtaUserDetail();
  }

  fetchAllRooms(){
    this.loader=true;
    this.propertyService.fetchAllRooms(this.currentPropertyId,(res:any)=>{
      if(res.status == 200){
        this.internalRoomData = res.data;
        console.log(res.data);
        this.loader=false;
        this.checkExisitingMappedRoom(this.externalRoomData);
      }else{
        this.loader=false;
      }
    })
  }

  fetchOtaUserDetail(){
    this.loader=true;
    this.propertyService.fetchOtaUserDetail(this.currentPropertyId,(res:any)=>{
      if(res.status == 200 && res.data.length>0){
        this.loader=false;
        this.otaUserData = res.data;
        console.log(res.data);
      }else{
        this.alert.alert("error", res.message, "Error", { displayDuration: 2000, pos: 'top' });
        this.loader=false;
      }
    })
  }

  viewMapping(userId:any,userName:any){
      this.propertyService.fetchOtaRoomsById(userId,(res:any)=>{
        if(res.status == 200 && res.data.length>0){
          console.log(res);
          this.showMappingPage = true;
          this.externalRoomData = res.data;
          this.currentOtaUserName = userName;
          this.currentOtaUserId = userId;
          this.fetchAllRooms();
        }else{
          console.log("no data");
        }
      })
      
  }

  checkExisitingMappedRoom(exRoom:any){
      exRoom.forEach((e:any)=>{
        if(e.internal_room_id) {
          this.selectedInternal.push({room_id:e.internal_room_id,room_name:e.internal_room_name});                     //room_name will be given in API
          this.setSelectedIntRoomDisabled(e.internal_room_id);
          this.selectedExternal.push({ota_rooms_id:e.ota_rooms_id,room_name:e.room_name});
          this.setSelectedExtRoomDisabled(e.ota_rooms_id);
        } 
      })
  }

  setSelectedIntRoomDisabled(intRoomId:any){
      let isExistRoom:any = this.internalRoomData.find((e:any)=>e.room_id == intRoomId);
      if(isExistRoom){
          isExistRoom['activeIntRoomMap']=true;
      }
      
  }

  setSelectedExtRoomDisabled(extRoomId:any){
    let isExistRoom:any = this.externalRoomData.find((e:any)=>e.ota_rooms_id == extRoomId);
    if(isExistRoom){
        isExistRoom['activeIntRoomMap']=true;
    }
  }

  selectInternalRoomToMap(room:any){
    console.log(room);
    
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
      if(e.ota_rooms_id == room.ota_rooms_id){
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
   let params:any =  {
      "ota_user_id": this.currentOtaUserId,
      "internal_room_id":roomId
    }
    this.propertyService.unLinkInternalRoom(params,(res:any)=>{
      if(res.status == 200){
        this.selectedInternal.splice(idx,1);
        this.internalRoomData.forEach((e:any)=>{
          if(e.room_id == roomId){
            e['activeIntRoomMap'] = false;
            e['activeMapping'] = false;
          }
        })
        this.alert.alert("error",res.message,"Success", { displayDuration: 2000, pos: 'top' });
      }else{
        this.alert.alert("error",res.message,"Error", { displayDuration: 2000, pos: 'top' });
      }
    })
  }
  
  removeExtRoom(idx:any,roomId:any,ota_rooms_id:any){

    let params:any = 
    {
      "ota_rooms_id": ota_rooms_id,
      "ota_user_id": this.currentOtaUserId
    }
    
    this.propertyService.unLinkOtaRoom(params, (res: any) => {
      if (res.status == 200) {
        this.selectedExternal.splice(idx, 1);
        this.externalRoomData.forEach((e: any) => {
          if (e.room_id == roomId) {
            e['activeIntRoomMap'] = false;
            e['activeMapping'] = false;
          }
        }) 
        this.alert.alert("error",res.message,"Success", { displayDuration: 2000, pos: 'top' });
      }else{
        this.alert.alert("error",res.message,"Error", { displayDuration: 2000, pos: 'top' });
      }
    })

    

  }

  setActiveIntRoomToMap(room:any){
    room['activeMapping'] = true;
    this.mapConfig['internal_room_id'] =+room.room_id;
  }

  setActiveExtRoomToMap(room:any){
    room['activeMapping'] = true;
    this.mapConfig['ota_rooms_id'] = +room.ota_rooms_id;
    this.mapConfig['ota_user_id'] = +this.currentOtaUserId;
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
