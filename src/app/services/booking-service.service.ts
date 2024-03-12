import { Injectable } from '@angular/core';
import { BaseServiceService } from './base-service.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookingServiceService extends BaseServiceService {

  constructor(http:HttpClient) { 
    super(http);
  }

  addHotelAlot(params:any,callback:any){
    this.postData(params,this.httpUrl['addHotelAlot'],callback);
  }

  updatePriceAlot(params:any,callback:any){
    this.postData(params,this.httpUrl['updatePriceAlot'],callback);
  }

  getHotelAvailability(callback:any){
    this.getData({},this.httpUrl['getHotelAvailability'],callback);
  }

  updateHotelAvailability(params:any,callback:any){
    this.postData(params,this.httpUrl['updateHotelAvailability'],callback);
  }

  getHotelPrice(callback:any){
    this.getData({},this.httpUrl['getHotelPrice'],callback);
  }

  getHotelRooms(callback:any){
    this.getData({},this.httpUrl['getHotelRooms'],callback);
  }
}
