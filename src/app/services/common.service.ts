import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  public bearerToken : any = new BehaviorSubject("");
  public refreshToken : any = new BehaviorSubject("");
  public roleId : any = new BehaviorSubject("");
  public userId : any = new BehaviorSubject("");


  constructor() { }

  setAccessToken(token:any,refreshToken:any){
    this.bearerToken = token;
    this.refreshToken = refreshToken;
  }

  setRoleAndUser(data:any){
    this.roleId = data.data.role;
    this.userId = data.data.user_id;
}

}
