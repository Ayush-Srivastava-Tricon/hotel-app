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

  deleteRoom(roomId:any,callback:any){
    this.deleteData({},this.httpUrl['deleteRoom']+"/"+roomId,callback);
  }

  fetchOtaUserDetail(callback:any){
    this.getData({},this.httpUrl['getOtaUserList'],callback);
  }

  addOtaUserDetails(params:any,callback:any){
    this.postData({},this.httpUrl['addOtaUser'],callback);
  }

  editOtaUserDetails(params:AnimationPlayState,callback:any){
    this.putData(params,this.httpUrl['editOtaUser'],callback);
  }
}
