import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { BaseServiceService } from './base-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseServiceService {

  constructor(http:HttpClient) {
    super(http);
   }


  login(params:any,callback:any){
     this.postData(params,this.httpUrl['login'],callback);
  }

  isOwner(){
    return !!localStorage.getItem("isOwner");
  }

  isManager(){
    return !!localStorage.getItem("isManager");
  }

}
