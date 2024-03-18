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

   fetchPropertyList(callback:any){
    this.getData({},this.httpUrl['getAllProperty'],callback)
   }

   addNewProperty(param:any,callback:any){
    this.postData(param,this.httpUrl['addNewProperty'],callback)
   }
}
