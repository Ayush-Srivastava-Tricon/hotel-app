import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { count } from 'rxjs';
import { AppConstants } from 'src/app/constants/app.constant';
import { PropertyService } from 'src/app/services/property.service';
import { AlertService } from 'src/app/shared/alert.service';
import { environment } from './../../../../environments/environment.development';

@Component({
  selector: 'app-manage-rooms',
  templateUrl: './manage-rooms.component.html',
  styleUrls: ['./manage-rooms.component.scss']
})
export class ManageRoomsComponent {
  roomModal: any;
  roomsList: any = [];
  showModal: any = { property: false, delete: false };
  showActionDropDown: any = {};
  isEditModal: boolean = false;
  deleteRoomIndex: number = 0;
  loader: boolean = false;
  currentRoomId: number = 0;
  addImageConfig: any = { 'image': [], 'imagePreview': [] };
  toUploadImagefile: any = [];
  imageArrayContainer: any = [{
    thumbnailUrl: '',
    image: ''
  }];
  formData: any = new FormData();
  currentPropertyId:any;
  removedImgObj:any=[];
  deleteImageConfig:any={};
  parentRooms:any=[];
  ratePlans:any=[];
  defaultAltImg:any='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7kbSHKpngjoblArIsRQxd-axRS9x2zi49sg&usqp=CAU';
  applyDerivationRuleConfig:any={};

  constructor(private fb: FormBuilder, private constants: AppConstants, private alertService: AlertService, private proService: PropertyService) {
    this.roomModal = this.fb.group(
      {
        property_id: [''],
        room_name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9_ ]*$/)]],
        adult: [0, [Validators.pattern(/^[0-9]+$/)]],
        child: [0, [Validators.pattern(/^[0-9]+$/)]],
        default_price: ['', [Validators.required, Validators.pattern(/^\d*\.?\d*$/)]],
        default_quantity: ['', [Validators.pattern(/^[0-9]+$/)]],
        default_min: ['', [Validators.pattern(/^[0-9]+$/)]],
        default_max: ['', [Validators.pattern(/^[0-9]+$/)]],
        description: ['',],
        parent_room_id: [''],
        rate_plan_id: [null],
        nonrefundable: [''],
        is_pms: [false],
        is_dorm: [false],
        cald_show: [false],
        be_show: [false],
        breakfast: [false],
        price_type: ['Price'],
        price: [0],
        disp_on_booking_engine:[1],
        disp_on_octosite:[1],
        disp_on_calendar:[1],
        disp_on_add_reservation:[1],
        room_counted_on_stats:[1],
        map_change_avail:['true'],
        map_change_stay:[1],
        map_change_restriction:[1],
        map_change_stopsale:[1],
        // apply_derivation_rule:[0],
      }
    )
  }

  ngOnInit() {
    this.currentPropertyId = JSON.parse(<any>localStorage.getItem("selectedPropertyId"));
    if(!this.currentPropertyId){
      this.currentPropertyId = JSON.parse(<any>localStorage.getItem("userId"));
    }
    this.fetchAllRooms();
  }

  fetchAllRooms() {
    this.loader = true;
    this.proService.fetchAllRooms(this.currentPropertyId,(res: any) => {
      if (res.status == 200) {
        this.loader = false;
        this.roomsList = res.data;
        this.roomModal.controls.property_id.setValue(this.currentPropertyId);
        this.roomModal.controls.property_id.updateValueAndValidity();

      } else {
        this.roomsList = [];
        this.loader = false;
      }
    })
  }

  createNewRoom() {
  console.log(this.roomModal.value);
  
    if (this.roomModal.status == "VALID") {
      this.loader=true;
      this.roomModal.controls.property_id.setValue(this.currentPropertyId);
      this.roomModal.controls.property_id.updateValueAndValidity();
      this.convertStringToNumber();
      const formData: any = new FormData();

      formData.append('roomData', JSON.stringify(this.roomModal.value));

      for (var i = 0; i < this.toUploadImagefile.length; i++) {
        formData.append("fileKey[]", this.toUploadImagefile[i]);
      }

      this.proService.addRooms(formData, (res: any) => {
        if (res[0].status == 200) {
          // this.roomsList.push(this.roomModal.value);
          this.loader=false;
          this.showModal.property = false;
          this.roomModal.reset();
          this.imageArrayContainer = [];
          this.alertService.alert("success", "New Room Created", "Success", { displayDuration: 3000, pos: 'top' });
          this.fetchAllRooms();
        }
        else {
          this.loader=false;
          this.alertService.alert("error", "Something went wrong", "Error", { displayDuration: 3000, pos: 'top' });
        }
      });
    }
    else {
      this.loader=false;
      this.alertService.alert("error", "Please Check Fields Again", "Error", { displayDuration: 3000, pos: 'top' });
    }

  }

  openModal() {
    this.showModal.property = true;
    this.roomModal.reset();
    this.isEditModal = false;
    this.getParentRoomId();
  }

  getParentRoomId(){
    this.parentRooms = this.roomsList.filter((e:any)=>e.parent_room_id && e.parent_room_id == 0);
    if(this.isEditModal){
      this.getRatePlanByParent({target:{value:this.roomModal.controls.parent_room_id.value}});

    }
    
  }

  closeModal() {
    this.showModal.property = false;
    this.showModal.delete = false;
    this.showModal.apply_derivation_rule=false;
    this.isEditModal = false;
    this.showModal.deleteImage = false;
    this.ratePlans=[];
    this.roomModal.reset();
    this.imageArrayContainer = [];
    
  }

  closeDeleteImgModal(){
    this.showModal.delete=false;
    this.showModal.deleteImage = false;
  }

  showDropDown(idx: any) {
    this.showActionDropDown[idx] = !this.showActionDropDown[idx];
  }

  editRoomOpenModal(item: any) {
    this.proService.getRoomDataToEdit(item.room_id,(res:any)=>{
      if(res.status == 200){
        this.isEditModal = true;
        this.convertRatePlanIntoNumeric(res.data);
        this.roomModal.patchValue(res.data[0]);
        console.log(res.data[0]);
        this.showModal.property = true;
        this.currentRoomId = item.room_id;
        this.toUploadImagefile = JSON.parse(JSON.stringify([]));
        this.getUploadedImage(item.room_id);
        if(res.data[0].parent_room_id){
          this.getParentRoomId();
        }
      }
    })

  }

  convertRatePlanIntoNumeric(data:any){
      data.forEach((e:any)=>{
        e.nonrefundable = +e.nonrefundable;
        e.is_pms = +e.is_pms;
        e.is_dorm = +e.is_dorm;
        e.cald_show = +e.cald_show;
        e.be_show = +e.be_show;
        e.parent_room_id = +e.parent_room_id;
      })
  }

  getUploadedImage(roomId:any){
      this.proService.getUploadedImageByRoom(roomId,(res:any)=>{
        if(res.status === 200 && res.data.length>0){
          console.log(res);
          this.imageArrayContainer = JSON.parse(JSON.stringify(res.data));
        }else{
          this.imageArrayContainer = [{
            thumbnailUrl: this.defaultAltImg,
            image: ''
            }];
          this.alertService.alert("error", "No Image Found", "Error", { displayDuration: 3000, pos: 'top' });
        }
      })
  }

  editRoom() {

    if (this.roomModal.status == "VALID") {
      this.loader=true;

      let isUploadedDeleted = false;
      if (this.removedImgObj.length > 0) {
        this.deleteUploadedImages();
        isUploadedDeleted = true;
      } else {
        isUploadedDeleted = true;
      }
      if (isUploadedDeleted) {
        this.convertStringToNumber();
        // const editModalObj: any = JSON.parse(JSON.stringify(this.roomModal.value));
        this.roomModal.value['room_id'] = this.currentRoomId;
        const formData: any = new FormData();
        formData.append('roomData', JSON.stringify(this.roomModal.value));
        for (var i = 0; i < this.toUploadImagefile.length; i++) {
          formData.append("fileKey[]", this.toUploadImagefile[i]);
        }
        this.proService.editRoom(formData, (res: any) => {
          if (res[0].status == 200) {
            this.loader=false;
            this.showModal.property = false;
            this.isEditModal = false;
            this.showActionDropDown = {};
            this.roomModal.reset();
            this.currentRoomId = 0;
            this.removedImgObj=[];
            this.fetchAllRooms();
            this.alertService.alert("success", "Edit Room Successfully", "Success", { displayDuration: 2000, pos: 'top' });
          }else{
            this.loader=false;
            this.alertService.alert("error", "Please Check Fields Again", "Error", { displayDuration: 2000, pos: 'top' });
          }
        })
      } else {
        this.loader=false;
        this.alertService.alert("error", "Please Check Fields Again", "Error", { displayDuration: 2000, pos: 'top' });
      }
    }

  }

  deleteUploadedImages(){
    this.proService.deleteUploadedFiles(this.removedImgObj,(res:any)=>{
      if(res.status == 200){
        console.log(res);
        this.alertService.alert("error",res.message,"Success",{ displayDuration: 2000, pos: 'top' })
        
      }
    })
  }

  deleteRoomModal(roomId: any, idx: any) {
    this.deleteRoomIndex = idx;
    this.currentRoomId = +roomId;
    this.showModal.delete = true;
  }

  deleteRoom() {
    this.proService.deleteRoom(this.currentRoomId, (res: any) => {
      if (res.status == 200) {
        this.roomsList.splice(this.deleteRoomIndex, 1);
        this.showModal.delete = false;
        this.deleteRoomIndex = 0;
        this.alertService.alert("error", "Room Deleted", "Success", { displayDuration: 2000, pos: 'top' });
      } else {
        this.alertService.alert("error", "Something Went Wrong ", "Error", { displayDuration: 2000, pos: 'top' });
      }
    })
  }

  backToManageRoom() {
    this.showModal.property = false;
    this.closeModal();
    this.showActionDropDown = {};
    this.imageArrayContainer = [{
    thumbnailUrl: '',
    image: ''
      }];
  }

  convertStringToNumber() {
    this.roomModal.value.property_id = +this.roomModal.value.property_id;
    this.roomModal.value.adult = +this.roomModal.value.adult;
    this.roomModal.value.child = +this.roomModal.value.child;
    this.roomModal.value.default_max = +this.roomModal.value.default_max;
    this.roomModal.value.default_min = +this.roomModal.value.default_min;
    this.roomModal.value.default_price = +this.roomModal.value.default_price;
    this.roomModal.value.default_quantity = +this.roomModal.value.default_quantity;
    if (this.roomModal.value.room_id) {
      this.roomModal.value.room_id = +this.roomModal.value.room_id;
    }
    if (this.roomModal.value.parent_room_id) {
      this.roomModal.value.parent_room_id = +this.roomModal.value.parent_room_id;
    }
  }

  uploadImage(event: any, idx: any) {
    let file = event.target.files[0];
    let filesize :any= ((file.size/1024)/1024).toFixed(4);
    if(filesize<16){
      const reader: any = new FileReader();
      const imageSrc = URL.createObjectURL(file);
      reader.readAsDataURL(file);
      this.imageArrayContainer[idx].imageUrl = file.name;
      this.imageArrayContainer[idx].thumbnailUrl = imageSrc;
      this.toUploadImagefile.push(<File>file);
    }else{
      this.alertService.alert("error", "Size should be less than 16MB", "Error", { displayDuration: 2000, pos: 'top' });
    }
    
  }

  filterNullImages() {
    return this.toUploadImagefile.filter((e: any) => e != null);
  }

  selectImg(file: any) {
    file.click();
  }

  addMoreImageSection() {
    this.imageArrayContainer.push({ thumbnailUrl: this.defaultAltImg, image: '' });
  }

  removeImgConfirm(file:any,idx:any){
      this.showModal.delete = true;
      this.showModal.deleteImage = true;
      this.deleteImageConfig.file = JSON.parse(JSON.stringify(file));
      this.deleteImageConfig.idx = JSON.parse(JSON.stringify(idx));
  }

  deleteImage(){
    this.imageArrayContainer.splice(this.deleteImageConfig.idx,1);
    this.toUploadImagefile.splice(this.deleteImageConfig.idx,1);
    let obj:any={
      ...this.deleteImageConfig.file,
      'property_id':this.currentPropertyId
    }
    if(this.isEditModal){
      this.removedImgObj.push(obj);
    }
    this.showModal.delete=false;
    this.showModal.deleteImage=false;
    if(this.imageArrayContainer.length == 0){
      this.imageArrayContainer = [{
        thumbnailUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7kbSHKpngjoblArIsRQxd-axRS9x2zi49sg&usqp=CAU',
        image: ''
          }];
    }
  }

  getRatePlanByParent(event:any){
    if(event.target.value){
      this.proService.getRatePlanByParent(event.target.value,(res:any)=>{
        if(res.status ==200){
          console.log(res);
          this.ratePlans=res.data;
          this.setDefaultDerivationRuleValue();
        }
      })
    }else{
      this.ratePlans=[];
      this.roomModal.controls.parent_room_id.setValue("");
      this.roomModal.controls.parent_room_id.updateValueAndValidity();
    }
  }

  setPriceTypeForDeriveRoom(priceType:any){
    this.roomModal.controls.price_type.setValue(priceType);
    this.roomModal.controls.price_type.updateValueAndValidity();
    priceType.toLowerCase() == 'not derived' ?  this.roomModal.controls.price.disable() :  this.roomModal.controls.price.enable();
  }

  setDefaultDerivationRuleValue(){
    this.roomModal.controls.disp_on_booking_engine.setValue(true);
    this.roomModal.controls.disp_on_booking_engine.updateValueAndValidity();

    this.roomModal.controls.disp_on_octosite.setValue(true);
    this.roomModal.controls.disp_on_octosite.updateValueAndValidity();

    this.roomModal.controls.disp_on_calendar.setValue(true);
    this.roomModal.controls.disp_on_calendar.updateValueAndValidity();

    this.roomModal.controls.disp_on_add_reservation.setValue(true);
    this.roomModal.controls.disp_on_add_reservation.updateValueAndValidity();

    this.roomModal.controls.room_counted_on_stats.setValue(true);
    this.roomModal.controls.room_counted_on_stats.updateValueAndValidity();

    this.roomModal.controls.map_change_avail.setValue(true);
    this.roomModal.controls.map_change_avail.updateValueAndValidity();

    this.roomModal.controls.map_change_stay.setValue(true);
    this.roomModal.controls.map_change_stay.updateValueAndValidity();

    this.roomModal.controls.map_change_restriction.setValue(true);
    this.roomModal.controls.map_change_restriction.updateValueAndValidity();

    this.roomModal.controls.map_change_stopsale.setValue(true);
    this.roomModal.controls.map_change_stopsale.updateValueAndValidity();

  }

  confirmationDerivationRule(item:any){
      this.applyDerivationRuleConfig['room_id'] = +item.room_id;
      this.applyDerivationRuleConfig['map_change_avail'] = +item.map_change_avail;
      this.applyDerivationRuleConfig['map_change_restriction'] = +item.map_change_restriction;
      this.applyDerivationRuleConfig['map_change_stay'] = +item.map_change_stay;
      this.applyDerivationRuleConfig['map_change_stopsale'] = +item.map_change_stopsale;
      this.applyDerivationRuleConfig['parent_room_id'] = item.parent_room_id ? +item.parent_room_id : null;
      this.applyDerivationRuleConfig['price'] = item.price ? item.price : "0.00";
      this.applyDerivationRuleConfig['price_type'] = item.price_type;

      this.showModal.apply_derivation_rule = true;
  }
                 
  applyDerivationRule(){
      this.proService.applyDerivationRule(this.applyDerivationRuleConfig,(res:any)=>{
        if(res.status == 200){
          console.log(res);
          this.applyDerivationRuleConfig={};
          this.showModal.apply_derivation_rule=false;
          this.alertService.alert("success", res.message, "Success", { displayDuration: 2000, pos: 'top' });
        }else{
          this.alertService.alert("error", res.error ? res.error.message : res.message, "Error", { displayDuration: 2000, pos: 'top' });
        }
      })
  }
}

