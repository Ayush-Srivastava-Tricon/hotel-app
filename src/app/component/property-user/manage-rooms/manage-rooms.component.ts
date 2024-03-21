import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AppConstants } from 'src/app/constants/app.constant';
import { PropertyService } from 'src/app/services/property.service';
import { AlertService } from 'src/app/shared/alert.service';

@Component({
  selector: 'app-manage-rooms',
  templateUrl: './manage-rooms.component.html',
  styleUrls: ['./manage-rooms.component.scss']
})
export class ManageRoomsComponent {
  roomModal:any;
  roomsList:any=[];
  showModal:any={property:false,delete:false};
  showActionDropDown:any={};
  isEditModal:boolean=false;
  deleteRoomIndex:number=0;

  constructor(private fb:FormBuilder,private constants:AppConstants,private alertService:AlertService,private proService:PropertyService){
    this.roomModal  = this.fb.group(
      {
        property_id:[''],
        room_name:['',[Validators.required,Validators.pattern(/^[a-zA-Z ]*$/)]],
        adult:['',[Validators.required,Validators.pattern(/^[0-9]+$/)]],
        child:['',[Validators.required,Validators.pattern(/^[0-9]+$/)]],
        default_price:['',[Validators.required,Validators.pattern(/^\d+\.\d{2}$/)]],
        default_quantity:['',[Validators.required,Validators.pattern(/^[0-9]+$/)]],
        default_min:['',[Validators.required,Validators.pattern(/^[0-9]+$/)]],
        default_max:['',[Validators.required,Validators.pattern(/^[0-9]+$/)]],
        description:['',Validators.required],
        parent_room_id:[null],
        nonrefundable:[''],
        is_pms:[false],
        is_dorm:[false],
        cald_show:[false],
        be_show:[false],
        breakfast:[false],
        // is_active:[true],
      }
    )
    // this.roomsList =[
    //   {
    //     property_id:1,
    //     room_name:'99Accres',
    //     adult:'Flat',
    //     child:'Lucknow',
    //     default_price:'Lucknow',
    //     default_quantity:'India',
    //     default_min:'UP',
    //     default_max:'Flat beuatiful',
    //     parent_room_id:34,
    //     nonrefundable:3999,
    //     is_pms:'Gomti Nagar',
    //     is_dorm:12,
    //     cald_show:2,
    //     be_show:5,
    //     breakfast:5,
    //     // is_active:5,
    //     description:''
    //   }
    // ]
  }

  ngOnInit(){
    this.fetchAllRooms();
  }

  fetchAllRooms(){
    this.proService.fetchAllRooms((res:any)=>{
      if(res.status == 200){
        console.log(res);
        this.roomsList = res.data;
        
      }
    })
  }

  createNewRoom(){
      if(this.roomModal.status == "VALID"){
      //   this.proService.addRooms(this.roomModal.value,(res:any)=>{
      //     if(res.status == 200){
      //       this.roomsList.push(this.roomModal.value);
      //       this.showModal.property=false;
      //       this.roomModal.reset();
      //       this.alertService.alert("success", "New Room Created", "Success", { displayDuration: 2000, pos: 'top' });
      //     }
      //   else{
      //     this.alertService.alert("error", "Something went wrong", "Error", { displayDuration: 2000, pos: 'top' });
      //   }
      // })
      this.roomsList.push(this.roomModal.value);
            this.showModal.property=false;
            this.roomModal.reset();
            this.alertService.alert("success", "New Room Created", "Success", { displayDuration: 2000, pos: 'top' });
    }
      else{
        this.alertService.alert("error", "Please Check Fields Again", "Error", { displayDuration: 2000, pos: 'top' });
      }
  }


  openModal(){
    this.showModal.property= true;
    this.roomModal.reset();
  }

  closeModal(){
   this.showModal.property= false;
   this.showModal.delete=false;
   this.isEditModal= false;
   this.roomModal.reset();
  }

  showDropDown(idx:any){
    this.showActionDropDown[idx] = !this.showActionDropDown[idx];
  }

  editRoomOpenModal(item:any){
      this.isEditModal= true;
      this.roomModal.patchValue(item);
      console.log(item);
      this.showModal.property=true;
  }

  editRoom(){
    if(this.roomModal.status == "VALID"){
      this.showModal.property=false;
      this.isEditModal= false;
      this.showActionDropDown={};
      this.roomModal.reset();
      this.alertService.alert("success", "Edit Property Successfully", "Success", { displayDuration: 2000, pos: 'top' });
    }else{
      this.alertService.alert("error", "Please Check Fields Again", "Error", { displayDuration: 2000, pos: 'top' });
    }
      
  }

  deleteRoomModal(idx:any){
    this.deleteRoomIndex = idx;
    this.showModal.delete=true;
  }

  deleteRoom(){
      this.roomsList.splice(this.deleteRoomIndex,1);
      this.showModal.delete=false;
      this.deleteRoomIndex=0;
  }

  backToManageRoom(){
    this.showModal.property=false;
  }
}
