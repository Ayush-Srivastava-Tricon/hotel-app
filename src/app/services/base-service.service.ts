import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' ,'Access-Control-Allow-Origin': '*'})
};

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
    'getCalendarData':"hotelapi/calendar",

    // <=======AUTHENTICATION=======>
    'login': "hotelapi/login",
    'logout': "hotelapi/logout",


    //<========Admin Service=========>
    'addOwner':'hotelapi/owners',
    'getOwner':'hotelapi/owners',
    'getOwnerById':'hotelapi/owners',
    'filter':'admin/filter',


    //<=======Owner Serivce===========>
    'getAllProperty':'hotelapi/properties',
    'addNewProperty':'hotelapi/properties',

    //<========Property Service========>
    'getAllRooms':'hotelapi/rooms ',
    'addRooms':'hotelapi/rooms ',
  }

  constructor(public http:HttpClient) { }

  getTokenFromLocal(){
    let token  = localStorage.getItem("token");
    return token;
  }

  getData(data:any,url:any,callback:any){
    let headers  = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*')
    .set('Authorization',`Bearer ${this.getTokenFromLocal()}`)



    return this.http.get(environment.apiUrl+url,{headers:headers}).subscribe((data:any)=>
    {
      callback(<any>data);
    },
    (error: any) => {
      console.log(error)
      if (error.status == 401) {
        this.handleRefreshToken(url,(res:any)=>{
          if(res.data){
            console.log(res);
            localStorage.setItem("token",res.data.Bearer);
            this.getData({},url,callback)
          }
        });

      }
      if (error) {
        callback({status:400,error:error});
      }
    })
  
  }

  handleRefreshToken(url:any,callback:any){
    let refreshToken:any = localStorage.getItem("refreshToken");
    let headers  = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*')
    .set('Authorization',`Bearer ${refreshToken}`)

    return this.http.get(environment.apiUrl+"/refreshToken?role=1&user_id=1",{headers:headers}).subscribe((data:any)=>callback(<any>data));
  }


  postData(data:any,url:any,callback:any){
    const  headers = new HttpHeaders()
    .set('content-type','application/json')
    .set('Access-Control-Allow-Origin', '*')
    .set('Authorization',`Bearer ${this.getTokenFromLocal()}`)

    return this.http.post(environment.apiUrl+url,data,{headers:headers}).subscribe((data:any)=>callback(data),((error:any)=>callback(error))
    );
  }


  putData(data:any,url:any,callback:any){
    const  headers = new HttpHeaders()
    .set('content-type','application/json')
    .set('Access-Control-Allow-Origin', '*')
    .set('Authorization',`Bearer ${this.getTokenFromLocal()}`)

    return this.http.put(environment.apiUrl+url,data,{headers:headers}).subscribe((data:any)=>callback(data),((error:any)=>callback(error))
    );

  }

}
