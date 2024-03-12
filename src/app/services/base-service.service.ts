import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class BaseServiceService {

  httpUrl:any={
    'addHotelAlot': "hotelapi/addHotelAlot.php",
    'updatePriceAlot': "hotelapi/updatePriceAlot.php",
    'getHotelAvailability': "hotelapi/getHotelAvailability.php",
    'updateHotelAvailability': "hotelapi/updateHotelAvailability.php",
    'getHotelPrice': "hotelapi/getHotelPrice.php",
    'getHotelRooms': "hotelapi/getHotelRooms.php",

    // <=======AUTHENTICATION=======>
    'login': "hotelapi/login",


    //<========Admin Service=========>
    'addOwner':'hotelapi/owners',
    'getOwner':'hotelapp/hotelapi/owners',
    'getOwnerById':'/hotelapp/hotelapi/owners'

  }

  constructor(private http:HttpClient) { }

  getData(data:any,url:any,callback:any){
    return this.http.get(environment.apiUrl+url,data).subscribe((data:any)=>callback(data));
  }

  postData(data:any,url:any,callback:any){
    const  headers = new HttpHeaders()
    .set('content-type','application/json')
    .set('Access-Control-Allow-Origin', '*');
    return this.http.post(environment.apiUrl+url,data,{'headers':headers}).subscribe((data:any)=>callback(data),((error:any)=>callback(error))
    );
  }


}
