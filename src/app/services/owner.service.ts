import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseServiceService } from './base-service.service';

@Injectable({
  providedIn: 'root'
})
export class OwnerService extends BaseServiceService {

  constructor(http:HttpClient) {
    super(http);
   }

   fetchPropertyList(currentOwnerId:any,callback:any){
    this.getData({},`${this.httpUrl['getAllProperty']}?owner_id=${currentOwnerId}`,callback)
   }

   addNewProperty(param:any,callback:any){
    this.postData(param,this.httpUrl['addNewProperty'],callback)
   }

   deleteProperty(propertyId:any,callback:any){
    this.deleteData({},this.httpUrl['deleteProperty']+"/"+propertyId,callback)
   }

   editProperty(param:any,callback:any){
    this.putData(param,this.httpUrl['editProperty'],callback)
   }

   fetchCountry(callback:any){
    this.getData({},this.httpUrl['get-countries'],callback);
   }

   fetchState(countryId:any,callback:any){
    this.getData({},`${this.httpUrl['get-state']}?country_id=${countryId}`,callback);
   }

   fetchCity(countryId:any,stateId:any,callback:any){
    this.getData({},`${this.httpUrl['get-city']}/?country_id=${countryId}&state_id=${stateId}`,callback);
   }

   saveDefaultSetting(param:any,callback:any){
    this.postData(param,this.httpUrl['settings'],callback)
   }

   fetchDefaultUserSetting(user_id:any,role_id:any,callback:any){
    this.getData({},`${this.httpUrl['defaultData']}?user_id=${user_id}&role_id=${role_id}`,callback)
   }

   changePassword(param:any,callback:any){
    this.putData(param,this.httpUrl['changepassword'],callback)
   }

   addMailTemplate(param:any,callback:any){
    this.postData(param,this.httpUrl['addMailTemplate'],callback)
   }

   fetchEmailTempalte(param:any,callback:any){
    this.getData({},`${this.httpUrl['fetchEmailTemplate']}?role_id=${param.role_id}&user_id=${param.user_id}`,callback)
   }

   fetchEmailTempalteById(template_id:any,callback:any){
    this.getData({},`${this.httpUrl['viewMailTemplate']}/${template_id}`,callback)
   }

   deleteTemplate(template_id:any,callback:any){
    this.deleteData({},`${this.httpUrl['pDeleteRec']}/${template_id}`,callback)
   }
   
   updateTemplate(param:any,callback:any){
    this.putData(param,this.httpUrl['updateTemplate'],callback)
   }
}
