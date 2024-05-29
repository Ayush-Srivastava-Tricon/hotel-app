import { Component } from '@angular/core';
import { PropertyService } from 'src/app/services/property.service';
import { AlertService } from 'src/app/shared/alert.service';

@Component({
  selector: 'app-manage-pms',
  templateUrl: './manage-pms.component.html',
  styleUrls: ['./manage-pms.component.scss']
})
export class ManagePmsComponent {
  loader:boolean=false;
  pmsDataConfig:any =  {
    parent_room_id: 0,
    name: '',
    priority: 0,
    change_linen_frequency: '',
    cleaning_frequency: [],
    cleaning_status: null,
    internal_notes: '',
    // cleaningDays: {
    //   Mo: false,
    //   Tu: false,
    //   We: false, 
    //   Th: false,
    //   Fr: false,
    //   Sa: false,
    //   Su: false
    // },
    // lastCleaningTime: '',
    previous_cleaning_status:'',
    previous_internal_notes:'',
    previous_last_cleaning_date:''
  };
  currentPropertyId:any=0;
  showModal:any={};
  isEditModal:boolean=false;
  parentRooms:any=[];
  pmsData:any=[];
  showActionDropDown:any={};
  todayDate:any= new Date();
  currentPMSId:any=0;
  weekdays: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  selectedDays: any= [];
  
  constructor(private _service:PropertyService,private alert:AlertService){}

  ngOnInit(){
    this.currentPropertyId = JSON.parse(<any>localStorage.getItem("selectedPropertyId"));
    if(!this.currentPropertyId){
      this.currentPropertyId = JSON.parse(<any>localStorage.getItem("userId"));
    }
    this.fetchPMS();

  }

  fetchPMS(){
    this.loader=true;
    this._service.listPMSRooms(this.currentPropertyId,(res:any)=>{
      if(res.status == 200){
        this.loader=false;
        this.pmsData = res.data;
        console.log(res);
        
      }
    })
  }

  setCurrentTime() {
    // this.pmsDataConfig.lastCleaningTime = new Date().toISOString();
  }

  savePMS(){
    this.loader=true;
    this.pmsDataConfig.parent_room_id = +this.pmsDataConfig.parent_room_id;
    this.pmsDataConfig.priority = +this.pmsDataConfig.priority;
    this._service.savePMS(this.pmsDataConfig,(res:any)=>{
      if(res.status == 200){
        console.log(res);
        this.alert.alert("success",res.message,"Success",{ displayDuration: 2000, pos: 'top' });
        this.fetchPMS();
        this.backToPMS();
      }
    })
  }
  
  openModal(){
    this.showModal.pms = true;
    this.resetConfig();
    this.isEditModal = false;
    this.getParentRoomId();
  }

  resetConfig(){
    this.pmsDataConfig = JSON.parse(JSON.stringify(
      {
        parent_room_id: null,
        name: '',
        priority: 0,
        change_linen_frequency: '',
        cleaning_frequency: [],
        cleaning_status: null,
        internal_notes: '',
        // cleaningDays: {
        //   Mo: false,
        //   Tu: false,
        //   We: false, 
        //   Th: false,
        //   Fr: false,
        //   Sa: false,
        //   Su: false
        // },
        // lastCleaningTime: '',
      }
    ));
  }

  getParentRoomId() {
    this.loader = true;
    this._service.fetchAllRooms(this.currentPropertyId,(res: any) => {
      if (res.status == 200) {
        this.loader = false;
        this.parentRooms = res.data.filter((e:any)=>e.parent_room_id || e.parent_room_id == 0);
      } else {
        this.parentRooms = [];
        this.loader = false;
      }
    })
  }

  showDropDown(idx:any){
    this.showActionDropDown[idx] = !this.showActionDropDown[idx];
  }

  editPMSOpenModal(item:any){
    this.currentPMSId = item.id;
    this._service.getSinglePMS(item.id,(res:any)=>{
      if(res.status == 200){
        this.isEditModal=true;
        this.showModal.pms = true;
        this.getParentRoomId();
        this.pmsDataConfig = res.data[0];
        this.pmsDataConfig.previous_cleaning_status = res.data[0].cleaning_status;
        this.pmsDataConfig.previous_internal_notes = res.data[0].internal_notes;
        this.pmsDataConfig.previous_last_cleaning_date =res.data[0].last_cleaning_date;
      }
    })
  }

  editPMS(){
    // delete this.pmsDataConfig.parent_room_id;
    delete this.pmsDataConfig.parent_room_name;
    this.loader=true;
    this.pmsDataConfig['pms_room_id'] = +this.pmsDataConfig.id;
    delete this.pmsDataConfig.id;
    delete this.pmsDataConfig.last_cleaning_date;
    delete this.pmsDataConfig.update_time;
    
    this._service.updatePMS(this.pmsDataConfig,(res:any)=>{
      if(res.status == 200){
        this.loader=false;
        console.log(res);
        this.backToPMS();
        this.resetConfig();
        this.fetchPMS();
        this.alert.alert("success",res.message,"Success",{ displayDuration: 2000, pos: 'top' });
      }else{
        this.loader=false;
        this.alert.alert("error",res.message,"Error",{ displayDuration: 2000, pos: 'top' });
      }
    })
  }

  deletePMSModal(id:any){
    this.currentPMSId = id;
    this.showModal.delete=true;
  }

  deleteRoom(){
      this._service.deletePMS(this.currentPMSId,(res:any)=>{
        if(res.status = 200){
          console.log(res);
          this.showModal.delete=false;
          this.resetConfig();
          this.backToPMS();
          this.fetchPMS();
          this.alert.alert("error",res.message,"Success",{ displayDuration: 2000, pos: 'top' });
        }else{
          this.showModal.delete=false;
          this.alert.alert("error",res.message,"Error",{ displayDuration: 2000, pos: 'top' });
        }
      })
  }

  closeModal(){
    this.showModal.delete=false;
  }

  backToPMS(){
      this.showModal.pms = false;
      this.showActionDropDown = {};
  }

  selectDay(day: string) {
    if (this.selectedDays.includes(day)) {
      this.selectedDays = this.selectedDays.filter((d:any) => d !== day);
    } else {
      this.selectedDays.push(day);
    }
    console.log(this.selectedDays);
  }

  isSelected(day: string): boolean {
    return this.selectedDays.includes(day);
  }
}
