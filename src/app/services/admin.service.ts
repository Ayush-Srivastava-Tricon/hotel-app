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

  editOwner(params:any,callback:any){
      this.putData(params,this.httpUrl['editOwner'],callback)
  }

  deleteOwner(ownerId:any,callback:any){
      this.deleteData({},this.httpUrl['deleteOwner']+"/"+ownerId,callback)
  }

  fetchOwnerList(callback:any){
      this.getData({},this.httpUrl['getOwner'],callback)
  }

  fetchOwnerById(ownerId:any,callback:any){
      this.getData({},`${this.httpUrl['getOwnerById']}/${ownerId}`,callback)
  }

  filterByIdOrName(params:any,callback:any){
      this.postData(params,`${this.httpUrl['filter']}`,callback)
  }

  isAdmin(){
    return !!localStorage.getItem("isadmin");
  }

}
