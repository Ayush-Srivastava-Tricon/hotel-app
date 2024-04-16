import { Injectable } from '@angular/core';
import { BaseServiceService } from './base-service.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PropertyService extends BaseServiceService {

  constructor(http:HttpClient) { 
    super(http)
  }

  fetchAllRooms(callback:any){
    this.getData({},this.httpUrl['getAllRooms'],callback);
  }

  addRooms(params:any,callback:any){
   // this.postData(params,this.httpUrl['addRooms'],callback);
    this.postDataWithFile(params,this.httpUrl['addRooms'],callback);
  }

  editRoom(params:any,callback:any){
    this.putData(params,this.httpUrl['editRoom'],callback);
  }

  getRoomDataToEdit(id:any,callback:any){
    this.getData({},this.httpUrl['getRoomDataToEdit']+"/"+id,callback);
  }

  getUploadedImageByRoom(roomId:any,callback:any){
    this.getData({},this.httpUrl['getUploadedImageByRoom']+"/"+roomId,callback);
  }

  deleteRoom(roomId:any,callback:any){
    this.deleteData({},this.httpUrl['deleteRoom']+"/"+roomId,callback);
  }

  fetchOtaUserDetail(callback:any){
    this.getData({},this.httpUrl['getOtaUserList'],callback);
  }

  addOtaUserDetails(params:any,callback:any){
    this.postData(params,this.httpUrl['addOtaUser'],callback);
  }

  editOtaUserDetails(params:any,callback:any){
    this.putData(params,this.httpUrl['editOtaUser'],callback);
  }

  fetchOtaRooms(callback:any){
    this.getData({},this.httpUrl['fetchOtaRoom'],callback);
  }

  addOtaRoom(params:any,callback:any){
    this.postData(params,this.httpUrl['addOtaRoom'],callback);
  }

  editOtaRoom(params:any,callback:any){
    this.putData(params,this.httpUrl['editOtaRoom'],callback);
  }

  
}
