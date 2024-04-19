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
  // files: string[] = [];
  imageArrayContainer: any = [{
    thumbnailUrl: '',
    image: ''
  }];
  formData: any = new FormData();
  currentPropertyId:any;

  constructor(private fb: FormBuilder, private constants: AppConstants, private alertService: AlertService, private proService: PropertyService) {
    this.roomModal = this.fb.group(
      {
        property_id: [''],
        room_name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)]],
        adult: [0, [Validators.required, Validators.pattern(/^[0-9]+$/)]],
        child: [0, [Validators.required, Validators.pattern(/^[0-9]+$/)]],
        default_price: ['', [Validators.required, Validators.pattern(/^\d+\.\d{2}$/)]],
        default_quantity: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
        default_min: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
        default_max: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
        description: ['', Validators.required],
        parent_room_id: [null],
        nonrefundable: [''],
        is_pms: [false],
        is_dorm: [false],
        cald_show: [false],
        be_show: [false],
        breakfast: [false],
        // is_active:[true],
      }
    )
  }

  ngOnInit() {
    this.fetchAllRooms();
    this.currentPropertyId = JSON.parse(<any>localStorage.getItem("selectedPropertyId"));
    if(!this.currentPropertyId){
      this.currentPropertyId = JSON.parse(<any>localStorage.getItem("userId"));
    }
  }

  fetchAllRooms() {
    this.loader = true;
    this.proService.fetchAllRooms((res: any) => {
      if (res.status == 200) {
        this.loader = false;
        this.roomsList = res.data;
        this.roomModal.controls.property_id.setValue(this.currentPropertyId);

      } else {
        this.roomsList = [];
        this.loader = false;
      }
    })
  }

  createNewRoom() {

    if (this.roomModal.status == "VALID") {
      this.roomModal.controls.property_id.setValue(this.currentPropertyId);
      this.convertStringToNumber();
      const formData: any = new FormData();

      formData.append('roomData', JSON.stringify(this.roomModal.value));

      for (var i = 0; i < this.toUploadImagefile.length; i++) {
        formData.append("fileKey[]", this.toUploadImagefile[i]);
      }

      this.proService.addRooms(formData, (res: any) => {
        if (res[0].status == 200) {
          // this.roomsList.push(this.roomModal.value);
          this.showModal.property = false;
          this.roomModal.reset();
          this.imageArrayContainer = [];
          this.alertService.alert("success", "New Room Created", "Success", { displayDuration: 3000, pos: 'top' });
          this.fetchAllRooms();
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



  openModal() {
    this.showModal.property = true;
    this.roomModal.reset();
  }

  closeModal() {
    this.showModal.property = false;
    this.showModal.delete = false;
    this.isEditModal = false;
    this.roomModal.reset();
  }

  showDropDown(idx: any) {
    this.showActionDropDown[idx] = !this.showActionDropDown[idx];
  }

  editRoomOpenModal(item: any) {
    this.proService.getRoomDataToEdit(item.room_id,(res:any)=>{
      if(res.status == 200){
        this.isEditModal = true;
        this.roomModal.patchValue(res.data[0]);
        console.log(item);
        this.showModal.property = true;
        this.currentRoomId = item.room_id;
        this.getUploadedImage(item.room_id);
      }
    })

  }

  getUploadedImage(roomId:any){
      this.proService.getUploadedImageByRoom(roomId,(res:any)=>{
        if(res.status == 200){
          console.log(res);
          
        }
      })
  }

  editRoom() {
    if (this.roomModal.status == "VALID") {
      this.convertStringToNumber();
      const editModalObj: any = JSON.parse(JSON.stringify(this.roomModal.value));
      editModalObj['room_id'] = this.currentRoomId;

      const formData: any = new FormData();
      formData.append('roomData', JSON.stringify(editModalObj));

      for (var i = 0; i < this.toUploadImagefile.length; i++) {
        formData.append("fileKey[]", this.toUploadImagefile[i]);
      }
      this.proService.editRoom(formData, (res: any) => {
        if (res.status == 200) {
          this.showModal.property = false;
          this.isEditModal = false;
          this.showActionDropDown = {};
          this.roomModal.reset();
          this.currentRoomId = 0;
          this.fetchAllRooms();
          this.alertService.alert("success", "Edit Room Successfully", "Success", { displayDuration: 2000, pos: 'top' });
        }
      })
    } else {
      this.alertService.alert("error", "Please Check Fields Again", "Error", { displayDuration: 2000, pos: 'top' });
    }
    console.log(this.roomModal.value);


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
    this.showActionDropDown = {};
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

  // checkFileAlreadyExist(file:any){

  //   this.toUploadImagefile.push(file.name);
  //   if(this.toUploadImagefile)

  // }

  selectImg(file: any) {
    file.click();
  }

  addMoreImageSection() {
    this.imageArrayContainer.push({ thumbnailUrl: '', image: '' });
  }
}

