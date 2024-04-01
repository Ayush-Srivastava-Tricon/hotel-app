import { Injectable } from '@angular/core';
import { BaseServiceService } from './base-service.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CalendarService extends BaseServiceService {

  constructor(http:HttpClient) { 
    super(http);
  }

  addHotelAlot(params:any,callback:any){
    this.postData(params,this.httpUrl['addHotelAlot'],callback);
  }

  updateCalendar(params:any,callback:any){
    this.postData(params,this.httpUrl['updateCalendar'],callback);
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
  
  getAllCalendarData(propertyId:any,startEndDate:any,callback:any){
    this.getData({},`${this.httpUrl['getCalendarData']}?property_id=${propertyId}&${startEndDate}`,callback);
    
  }
}
