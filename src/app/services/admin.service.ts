import { Injectable } from '@angular/core';
import { BaseServiceService } from './base-service.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService extends BaseServiceService {

  constructor(http:HttpClient) { super(http);}

  addOwner(params:any,callback:any){
      this.postData(params,this.httpUrl['addOwner'],callback)
  }

  fetchOwnerList(callback:any){
      this.getData({},this.httpUrl['getOwner'],callback)
  }

  fetchOwnerById(ownerId:any,callback:any){
      this.getData({},`${this.httpUrl['getOwnerById']}/${ownerId}`,callback)
  }

}
