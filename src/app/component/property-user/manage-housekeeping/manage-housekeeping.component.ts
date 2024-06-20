import { Component } from '@angular/core';
import { PropertyService } from 'src/app/services/property.service';
import { AlertService } from 'src/app/shared/alert.service';

@Component({
  selector: 'app-manage-housekeeping',
  templateUrl: './manage-housekeeping.component.html',
  styleUrls: ['./manage-housekeeping.component.scss']
})
export class ManageHousekeepingComponent {
  loader:boolean=false;
  housekeeperDataConfig:any =  {
    "property_id":0,
    "name":"",
    "gender":null,
    "dob":"",
    "mobile":"",
    "email":""
  };
  currentPropertyId:any=0;
  showModal:any={};
  isEditModal:boolean=false;
  housekeeperData:any=[];
  showActionDropDown:any={};
  currentHouseKeeperId:any=0;
  mapHousekeeperConfig:any={
    "house_keeper_id":0,
    "pmsRooms":[]
  };
  pmsData:any=[];


  constructor(private _service:PropertyService,private alert:AlertService){}

  ngOnInit(){
    this.currentPropertyId = JSON.parse(<any>localStorage.getItem("selectedPropertyId"));
    if(!this.currentPropertyId){
      this.currentPropertyId = JSON.parse(<any>localStorage.getItem("userId"));
    }
    this.fetchHousekeepers();

  }

  fetchHousekeepers(){
    this.loader=true;
    this._service.listHouseKeepers(this.currentPropertyId,(res:any)=>{
      if(res.status == 200){
        this.loader=false;
        this.housekeeperData = res.data;
        console.log(res);
        
      }
    })
  }


  saveHousekeeping(){
    this.loader=true;
    this.housekeeperDataConfig['property_id'] = this.currentPropertyId;
    this._service.createHousekeeper(this.housekeeperDataConfig,(res:any)=>{
      if(res.status == 200){
        this.alert.alert("success",res.message,"Success",{ displayDuration: 2000, pos: 'top' });
        this.fetchHousekeepers();
        this.backToKeeper();
        this.loader=false;
      }else{
        this.alert.alert("error",res.message,"Error",{ displayDuration: 2000, pos: 'top' });
        this.loader=false;
      }
    })
  }
  
  openModal(){
    this.showModal.housekeeping = true;
    this.resetConfig();
    this.isEditModal = false;
  }

  resetConfig(){
    this.housekeeperDataConfig = JSON.parse(JSON.stringify(
      {
        "property_id":0,
        "name":"",
        "gender":null,
        "dob":"",
        "mobile":"",
        "email":""
      }
    ));
  }

  showDropDown(idx:any){
    this.showActionDropDown[idx] = !this.showActionDropDown[idx];
  }

  editKeeperOpenModal(item:any){
    this.currentHouseKeeperId = item.id;
    this._service.getSingleKeeper(item.id,(res:any)=>{
      if(res.status == 200){
        this.isEditModal=true;
        this.showModal.housekeeping = true;
        this.housekeeperDataConfig = res.data[0];
      }
    })
  }

  editHousekeeping(){
    this.loader=true;
    this._service.updateHouseKeeper(this.housekeeperDataConfig,(res:any)=>{
      if(res.status == 200){
        this.loader=false;
        console.log(res);
        this.backToKeeper();
        this.resetConfig();
        this.fetchHousekeepers();
        this.alert.alert("success",res.message,"Success",{ displayDuration: 2000, pos: 'top' });
      }else{
        this.loader=false;
        this.alert.alert("error",res.message,"Error",{ displayDuration: 2000, pos: 'top' });
      }
    })
  }

  deleteKeeperModal(id:any){
    this.currentHouseKeeperId = id;
    this.showModal.delete=true;
  }

  deleteRoom(){
      this._service.deleteKeeper(this.currentHouseKeeperId,(res:any)=>{
        if(res.status = 200){
          console.log(res);
          this.showModal.delete=false;
          this.resetConfig();
          this.backToKeeper();
          this.fetchHousekeepers();
          this.alert.alert("error",res.message,"Success",{ displayDuration: 2000, pos: 'top' });
        }else{
          this.showModal.delete=false;
          this.alert.alert("error",res.message,"Error",{ displayDuration: 2000, pos: 'top' });
        }
      })
  }

  closeModal(){
    this.showModal.delete=false;
    this.showModal.map=false;
    this.mapHousekeeperConfig = JSON.parse(JSON.stringify({
      "house_keeper_id":0,
      "pmsRooms":[]
    }));
    this.pmsData = [];
  }

  backToKeeper(){
      this.showModal.housekeeping = false;
      this.showActionDropDown = {};
  }

  mapKeeperModal(id:any){
    this.showModal.map=true;
    this.mapHousekeeperConfig.house_keeper_id = id;
    this.getPMSRooms();
  }

  getPMSRooms(){
    this._service.listPMSRooms(this.currentPropertyId,(res:any)=>{
      if(res.status == 200){
        this.listPMSRoomsWithHouseKeeper(res.data);

      }else{
        this.pmsData=[];
      }
    })
  }

  listPMSRoomsWithHouseKeeper(pmsData:any){
    this._service.listPMSRoomsWithHouseKeeper(this.mapHousekeeperConfig.house_keeper_id,(res:any)=>{
      if(res.status == 200){
        console.log(res);
        this.pmsData = pmsData.map((e:any)=>{return{'value':e.name,'id':e.id,'checked':false}});
        this.pmsData.forEach((e:any)=>{
          if(res.data[0]?.pms_room_id.includes(+e.id)){
            e.checked=true;
          }
        })
      }
    })
  }

  receiveChildEvent(event:any){
      if(event.action === 'getPMSRoom'){
        this.mapHousekeeperConfig.pmsRooms = event.value;
      }
  }

  mapHousekeeper(){
    this.loader=true;
      this._service.mapPMSRoomsWithHouseKeeper(this.mapHousekeeperConfig,(res:any)=>{
        if(res.status == 200){
          console.log(res);
          this.loader=false;
          this.alert.alert("success",res.message,"Success",{ displayDuration: 2000, pos: 'top' });
          this.closeModal();
        }else{
          this.closeModal();
          this.loader=false;
          this.alert.alert("error",res.message,"Error",{ displayDuration: 2000, pos: 'top' });
        }
      })
  }
}
