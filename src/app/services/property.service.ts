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
    this.getData({},this.httpUrl['getAllRooms'],callback)
  }

  addRooms(params:any,callback:any){
    this.postData(params,this.httpUrl['addRooms'],callback)
  }
}
