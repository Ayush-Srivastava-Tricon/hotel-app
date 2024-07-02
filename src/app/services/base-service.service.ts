import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' })
};

@Injectable({
  providedIn: 'root'
})
export class BaseServiceService {

  httpUrl: any = {



    'addHotelAlot': "hotelapi/addHotelAlot.php",
    'updatePriceAlot': "hotelapi/updatePriceAlot.php",
    'getHotelAvailability': "hotelapi/getHotelAvailability.php",
    'updateHotelAvailability': "hotelapi/updateHotelAvailability.php",
    'getHotelPrice': "hotelapi/getHotelPrice.php",
    'getHotelRooms': "hotelapi/getHotelRooms.php",
    'getCalendarData': "hotelapi/calendar",
    'updateCalendar': "hotelapi/calendar",

    // <=======AUTHENTICATION=======>
    'login': "hotelapi/login",
    'logout': "hotelapi/logout",
    'captcha': "hotelapi/captcha",


    //<========Admin Service=========>
    'addOwner': 'hotelapi/owners',
    'editOwner': 'hotelapi/owners',
    'getOwner': 'hotelapi/owners',
    'deleteOwner': 'hotelapi/owners',
    'getOwnerById': 'hotelapi/owners',
    'filter': 'hotelapi/admin/filter',
    'addOta': 'hotelapi/otadetails',
    'editOta': 'hotelapi/otadetails',
    'getOta': 'hotelapi/otadetails',


    //<=======Owner Serivce===========>
    'getAllProperty': 'hotelapi/properties',
    'addNewProperty': 'hotelapi/properties',
    'deleteProperty': 'hotelapi/properties',
    'editProperty': 'hotelapi/properties',
    'get-countries': 'hotelapi/country',
    'get-state': 'hotelapi/state',
    'get-city': 'hotelapi/city',
    'settings': 'hotelapi/settings',
    'defaultData': 'hotelapi/settings/defaultData',
    'changepassword': 'hotelapi/changepassword',
    'addMailTemplate': 'hotelapi/notifications/addMailTemplate',
    'fetchEmailTemplate':'hotelapi/notifications/listMailTemplate',
    'pDeleteRec':'hotelapi/notifications/pDeleteRec',
    'viewMailTemplate':'hotelapi/notifications/viewMailTemplate',
    'updateTemplate':'hotelapi/notifications/updateTemplate',


    //<========Property Service========>
    'getAllRooms': 'hotelapi/rooms',
    'addRooms': 'hotelapi/rooms',
    'editRoom': 'hotelapi/rooms/update',
    'deleteRoom': 'hotelapi/rooms',
    'getRoomDataToEdit': 'hotelapi/rooms',
    'getUploadedImageByRoom': 'hotelapi/uploadFiles',
    'deleteUploadedFiles': 'hotelapi/uploadFiles',
    'getOtaUserList': 'hotelapi/otausers',
    'addOtaUser': 'hotelapi/otausers',
    'editOtaUser': 'hotelapi/otausers',
    'addOtaRoom': 'hotelapi/otarooms',
    'fetchOtaRoom': 'hotelapi/otarooms',
    'editOtaRoom': 'hotelapi/otarooms',
    'fetchOtaRoomById': 'hotelapi/otarooms/otaRoomByOtaUserId',
    'mapping': 'hotelapi/otarooms/mapping',
    'getReservation': 'hotelapi/roomsForReservation',
    'getPaymentMethod': 'hotelapi/roomsForReservation/getPaymentMethod',
    'getExtraFacility': 'hotelapi/roomsForReservation/getExtraFacility',
    'addReservationDetails': 'hotelapi/roomsForReservation',
    'getListOfReservation': 'hotelapi/roomsForReservation/reservationListing',
    'getSingleReservation': 'hotelapi/roomsForReservation/reservationListing',
    'updateReservation': 'hotelapi/roomsForReservation/updateReservation',
    'unLinkInternalRoom': 'hotelapi/otarooms/unlinkInternalRooms',
    'unLinkOtaRoom': 'hotelapi/otarooms/unlinkOtaRooms',
    'saveRatePlan': 'hotelapi/rooms/createRateplan',
    'savePMS': 'hotelapi/rooms/createPMS',
    'listPMSRooms': 'hotelapi/rooms/listPMSRooms',
    'listRatePlans': 'hotelapi/rooms/listRatePlans',
    'getSingleRateplan': 'hotelapi/rooms/listRatePlans',
    'updateRatePlans': 'hotelapi/rooms/updateRatePlans',
    'mapRatePlanWithRooms': 'hotelapi/rooms/mapRatePlanWithRooms',
    'deleteRatePlans': 'hotelapi/rooms/deleteRatePlans',
    'getSinglePMS': 'hotelapi/rooms/listPMSRooms',
    'updatePMSByHousekeeper': 'hotelapi/rooms/updatePMSByHousekeeper',
    'deletePMS': 'hotelapi/rooms/deletePMS',
    'createHouseKeeper': 'hotelapi/employee/createHouseKeeper',
    'updateHouseKeeper': 'hotelapi/employee/updateHouseKeeper',
    'listHouseKeepers': 'hotelapi/employee/listHouseKeepers',
    'getSingleKeeper': 'hotelapi/employee/listHouseKeepers',
    'deleteKeeper': 'hotelapi/employee',
    'mapPMSRoomsWithHouseKeeper': 'hotelapi/employee/mapPMSRoomsWithHouseKeeper',
    'ratePlanForDrivedRoom': 'hotelapi/rooms/ratePlanForDrivedRoom',
    'getAvailablePmsRooms': 'hotelapi/roomsForReservation/getAvailablePmsRooms',
    'listMappedRatePlans': 'hotelapi/rooms/listMappedRatePlans',
    'applyDerivationRule': 'hotelapi/rooms/applyDerivationRule',
    'totalArrivalDeparture': 'hotelapi/dashboard/totalArrivalDeparture',
    'listPMSRoomsWithHouseKeeper': 'hotelapi/employee/listPMSRoomsWithHouseKeeper',


  }

  constructor(public http: HttpClient) { }

  getTokenFromLocal() {
    let token = localStorage.getItem("token");
    return token;
  }

  getData(data: any, url: any, callback: any) {
    let headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('Authorization', `Bearer ${this.getTokenFromLocal()}`)
      
    return this.http.get(environment.apiUrl + url, { headers: headers, params: data }).subscribe((data: any) => {
      callback(<any>data);
    },
      (error: any) => {
        console.log(error)
        if (error.error.status == 401 && error.error.message == 'Expired token') {
          this.handleRefreshToken(url, (res: any) => {
            if (res) {
              console.log(res);
              localStorage.setItem("token", res.Bearer);
              this.getData({}, url, callback);
            }
          });

        }
        if (error) {
          callback(error);
        }
      })

  }

  handleRefreshToken(url: any, callback: any) {
    let refreshToken: any = localStorage.getItem("refreshToken");
    let headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('Authorization', `Bearer ${refreshToken}`)


    return this.http.get(environment.apiUrl + `hotelapi/refreshToken?role=${localStorage.getItem("roleId")}&user_id=${localStorage.getItem("userId")}`, { headers: headers }).subscribe((data: any) => callback(<any>data));
  }


  postData(data: any, url: any, callback: any) {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('Authorization', `Bearer ${this.getTokenFromLocal()}`)

    return this.http.post(environment.apiUrl + url, data, { headers: headers }).subscribe((data: any) => { callback(data) },
      (error: any) => {
        console.log(error)
        if (error.error.status == 401 && error.error.message == 'Expired token') {
          this.handleRefreshToken(url, (res: any) => {
            if (res) {
              console.log(res);
              localStorage.setItem("token", res.Bearer);
              this.postData(data, url, callback);
            }
          });

        }
        if (error) {
          callback(error);
        }
      })
  }

  postDataWithFile(data: any, url: any, callback: any) {
    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('Authorization', `Bearer ${this.getTokenFromLocal()}`)

    console.log(this.getTokenFromLocal());


    return this.http.post(environment.apiUrl + url, data, { headers: headers }).subscribe((data: any) => { callback(data) },
      (error: any) => {
        console.log(error)
        if (error.error.status == 401 && error.error.message == 'Expired token') {
          this.handleRefreshToken(url, (res: any) => {
            if (res) {
              console.log(res);
              localStorage.setItem("token", res.Bearer);
              this.postData(data, url, callback);
            }
          });

        }
        if (error) {
          callback(error);
        }
      })
  }


  putData(data: any, url: any, callback: any) {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('Authorization', `Bearer ${this.getTokenFromLocal()}`)

    return this.http.put(environment.apiUrl + url, data, { headers: headers }).subscribe((data: any) => { callback(data) },
      (error: any) => {
        console.log(error)
        if (error.error.status == 401 && error.error.message == 'Expired token') {
          this.handleRefreshToken(url, (res: any) => {
            if (res) {
              console.log(res);
              localStorage.setItem("token", res.Bearer);
              this.putData(data, url, callback);
            }
          });
        }
        if (error) {
          callback(error);
        }
      })

  }

  updateDataWithFile(data: any, url: any, callback: any) {
    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('Authorization', `Bearer ${this.getTokenFromLocal()}`)

    return this.http.post(environment.apiUrl + url, data, { headers: headers }).subscribe((data: any) => { callback(data) },
      (error: any) => {
        console.log(error)
        if (error.error.status == 401 && error.error.message == 'Expired token') {
          this.handleRefreshToken(url, (res: any) => {
            if (res) {
              console.log(res);
              localStorage.setItem("token", res.Bearer);
              this.putData(data, url, callback);
            }
          });
        }
        if (error) {
          callback(error);
        }
      })

  }

  deleteData(data: any, url: any, callback: any) {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('Authorization', `Bearer ${this.getTokenFromLocal()}`)

    return this.http.delete(environment.apiUrl + url, { headers: headers, body: data }).subscribe((data: any) => callback(data), ((error: any) => callback(error))
    );

  }

}
