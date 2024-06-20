import { Injectable } from '@angular/core';
import { BaseServiceService } from './base-service.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PropertyService extends BaseServiceService {

  constructor(http: HttpClient) {
    super(http)
  }

  fetchAllRooms(propertyid: any, callback: any) {
    this.getData({}, `${this.httpUrl['getAllRooms']}?property_id=${propertyid}`, callback);
  }

  addRooms(params: any, callback: any) {
    // this.postData(params,this.httpUrl['addRooms'],callback);
    this.postDataWithFile(params, this.httpUrl['addRooms'], callback);
  }

  editRoom(params: any, callback: any) {
    this.updateDataWithFile(params, this.httpUrl['editRoom'], callback);
  }

  getRoomDataToEdit(id: any, callback: any) {
    this.getData({}, this.httpUrl['getRoomDataToEdit'] + "/" + id, callback);
  }

  getUploadedImageByRoom(roomId: any, callback: any) {
    this.getData({}, this.httpUrl['getUploadedImageByRoom'] + "/" + roomId, callback);
  }

  deleteRoom(roomId: any, callback: any) {
    this.deleteData({}, this.httpUrl['deleteRoom'] + "/" + roomId, callback);
  }

  deleteUploadedFiles(params: any, callback: any) {
    this.deleteData(params, this.httpUrl['deleteUploadedFiles'], callback);
  }

  fetchOtaUserDetail(loggedInPropertyId: any, callback: any) {
    this.getData({}, `${this.httpUrl['getOtaUserList']}?property_id=${loggedInPropertyId}`, callback);
  }

  addOtaUserDetails(params: any, callback: any) {
    this.postData(params, this.httpUrl['addOtaUser'], callback);
  }

  editOtaUserDetails(params: any, callback: any) {
    this.putData(params, this.httpUrl['editOtaUser'], callback);
  }

  getOtaUserDetailById(otaUserId: any, callback: any) {
    this.getData({}, this.httpUrl['getOtaUserList'] + "/" + otaUserId, callback);
  }

  fetchOtaRooms(currentPropertyId: any, callback: any) {
    this.getData({}, `${this.httpUrl['fetchOtaRoom']}?property_id=${currentPropertyId}`, callback);
  }

  fetchOtaRoomsById(userId: any, callback: any) {
    this.getData({}, `${this.httpUrl['fetchOtaRoomById']}?ota_user_id=${userId}`, callback);
  }

  addOtaRoom(params: any, callback: any) {
    this.postData(params, this.httpUrl['addOtaRoom'], callback);
  }

  editOtaRoom(params: any, callback: any) {
    this.putData(params, this.httpUrl['editOtaRoom'], callback);
  }

  setInternalMappingBetweenRoom(params: any, callback: any) {
    this.putData(params, this.httpUrl['mapping'], callback);
  }

  fetchReservation(param: any, callback: any) {
    this.getData({}, `${this.httpUrl['getReservation']}?property_id=${param.property_id}&start_date=${param.start_date}&end_date=${param.end_date}&available=${param.available}&disc=${param.disc}&reservationType=${param.reservationType}
    `, callback);
  }

  getPaymentMethod(callback: any) {
    this.getData({}, `${this.httpUrl['getPaymentMethod']}`, callback);
  }

  getExtraFacility(callback: any) {
    this.getData({}, `${this.httpUrl['getExtraFacility']}`, callback);
  }

  addReservationDetails(params: any, callback: any) {
    this.postData(params, this.httpUrl['addReservationDetails'], callback);
  }

  getListOfReservation(params: any, callback: any) {
    this.postData(params, this.httpUrl['getListOfReservation'], callback);
  }

  getSingleReservation(reservationId: any, callback: any) {
    this.getData({}, this.httpUrl['getSingleReservation'] + "/" + reservationId, callback);
  }

  updateReservation(params: any, callback: any) {
    this.putData(params, this.httpUrl['updateReservation'], callback);
  }

  unLinkInternalRoom(params: any, callback: any) {
    this.putData(params, this.httpUrl['unLinkInternalRoom'], callback);
  }

  unLinkOtaRoom(params: any, callback: any) {
    this.putData(params, this.httpUrl['unLinkOtaRoom'], callback);
  }

  saveRatePlan(params: any, callback: any) {
    this.postData(params, this.httpUrl['saveRatePlan'], callback);
  }

  savePMS(params: any, callback: any) {
    this.postData(params, this.httpUrl['savePMS'], callback);
  }

  listPMSRooms(property_id: any, callback: any) {
    this.getData({}, `${this.httpUrl['listPMSRooms']}?property_id=${property_id}`, callback);
  }

  fetchRateplan(property_id: any, callback: any) {
    this.getData({}, `${this.httpUrl['listRatePlans']}?property_id=${property_id}`, callback);
  }

  getSingleRateplan(ratePlanId: any, callback: any) {
    this.getData({}, `${this.httpUrl['getSingleRateplan']}?rate_plan_id=${ratePlanId}`, callback);
  }

  updateRateplan(params: any, callback: any) {
    this.putData(params, `${this.httpUrl['updateRatePlans']}`, callback);
  }

  mapRatePlan(params: any, callback: any) {
    this.putData(params, `${this.httpUrl['mapRatePlanWithRooms']}`, callback);
  }

  listMappedRoomWithRatePlan(rate_plan_id: any, callback: any) {
    this.getData({}, `${this.httpUrl['listMappedRatePlans']}/${rate_plan_id}`, callback);
  }

  deleteRatePlans(rateplan_id: any, callback: any) {
    this.deleteData({}, `${this.httpUrl['deleteRatePlans']}/${rateplan_id}`, callback);
  }

  getSinglePMS(pmsId: any, callback: any) {
    this.getData({}, `${this.httpUrl['getSinglePMS']}?pms_id=${pmsId}`, callback);
  }

  updatePMS(params:any,callback:any){
    this.putData(params, `${this.httpUrl['updatePMSByHousekeeper']}`, callback);
  }

  deletePMS(roomId:any,callback:any){
    this.deleteData({}, `${this.httpUrl['deletePMS']}/${roomId}`, callback);
  }

  createHousekeeper(params:any,callback:any){
    this.postData(params,this.httpUrl['createHouseKeeper'],callback)
  }

  updateHouseKeeper(params:any,callback:any){
    this.putData(params,this.httpUrl['updateHouseKeeper'],callback)
  }

  listHouseKeepers(property_id:any,callback:any){
    this.getData({},`${this.httpUrl['listHouseKeepers']}?property_id=${property_id}`,callback)
  }

  getSingleKeeper(housekeeperid:any,callback:any){
    this.getData({},`${this.httpUrl['listHouseKeepers']}?house_keeper_id=${housekeeperid}`,callback)
  }

  deleteKeeper(keeperId:any,callback:any){
    this.deleteData({}, `${this.httpUrl['deleteKeeper']}/${keeperId}`, callback);
  }

  mapPMSRoomsWithHouseKeeper(params:any,callback:any){
    this.postData(params,this.httpUrl['mapPMSRoomsWithHouseKeeper'],callback);
  }

  getRatePlanByParent(parentId:any,callback:any){
    this.getData({},`${this.httpUrl['ratePlanForDrivedRoom']}/${parentId}`,callback);
  }
  
  getAvailablePMSRoom(parentId:any,checkIn:any,callback:any){
    this.getData({},`${this.httpUrl['getAvailablePmsRooms']}?parent_room_id=${parentId}&check_in_date=${checkIn}`,callback);

  }

  fetchRealTimeWeather(params:any,callback:any){
    const apiUrl:any = 'https://weatherapi-com.p.rapidapi.com/current.json';
    const headers:any = new HttpHeaders()
    .set('x-rapidapi-key', '82f6a5ff3cmshc9f47800346a992p147817jsn85cf192dce5c')
    .set('x-rapidapi-host', 'weatherapi-com.p.rapidapi.com');
    
    return this.http.get(`${apiUrl}?q=${params}`,{headers}).subscribe((data:any)=>callback(data));
  }

  applyDerivationRule(params:any,callback:any){
    this.postData(params,this.httpUrl['applyDerivationRule'],callback);
  }

  fetchArrivalDeparture(property_id:any,callback:any){
    this.getData({},`${this.httpUrl['totalArrivalDeparture']}/${property_id}`,callback);
  }
  
  listPMSRoomsWithHouseKeeper(house_keeper_id:any,callback:any){
    this.getData({},`${this.httpUrl['listPMSRoomsWithHouseKeeper']}/${house_keeper_id}`,callback);
  }

}
