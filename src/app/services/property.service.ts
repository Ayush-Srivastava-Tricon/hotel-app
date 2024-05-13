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
    this.updateDataWithFile(params,this.httpUrl['editRoom'],callback);
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

  deleteUploadedFiles(params:any,callback:any){
    this.deleteData(params,this.httpUrl['deleteUploadedFiles'],callback);
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

  fetchOtaRoomsById(userId:any,callback:any){
    this.getData({},`${this.httpUrl['fetchOtaRoomById']}?ota_user_id=${userId}`,callback);
  }

  addOtaRoom(params:any,callback:any){
    this.postData(params,this.httpUrl['addOtaRoom'],callback);
  }

  editOtaRoom(params:any,callback:any){
    this.putData(params,this.httpUrl['editOtaRoom'],callback);
  }

  setInternalMappingBetweenRoom(params:any,callback:any){
    this.putData(params,this.httpUrl['mapping'],callback);
  }

  fetchReservation(param:any,callback:any){
    this.getData({},`${this.httpUrl['getReservation']}?property_id=${param.property_id}&start_date=${param.start_date}&end_date=${param.end_date}&available=${param.available}&disc=${param.disc}&reservationType=${param.reservationType}
    `,callback);
  }

  getPaymentMethod(callback:any){
    this.getData({},`${this.httpUrl['getPaymentMethod']}`,callback);
  }
  
  getExtraFacility(callback:any){
    this.getData({},`${this.httpUrl['getExtraFacility']}`,callback);
  }

  addReservationDetails(params:any,callback:any){
    this.postData(params,this.httpUrl['addReservationDetails'],callback);
  }
  
  getListOfReservation(params:any,callback:any){
    this.postData(params,this.httpUrl['getListOfReservation'],callback);
  }
  
  getSingleReservation(reservationId:any,callback:any){
    this.getData({},this.httpUrl['getSingleReservation']+"/"+reservationId,callback);
  }
  
  updateReservation(params:any,callback:any){
    this.putData(params,this.httpUrl['updateReservation'],callback);
  }


}
