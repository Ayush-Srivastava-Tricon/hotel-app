import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { BaseServiceService } from './base-service.service';
import { Subject } from 'rxjs';

// const httpOptions = {
//   headers: new HttpHeaders({ 'Content-Type': 'application/json' ,'Access-Control-Allow-Origin': '*'})
// };

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseServiceService {

  public token :any='';
  public refreshToken :any='';

  public roleId:any='';
  public userId:any='';

  constructor(http:HttpClient) {
    super(http);
   }


  login(params:any,callback:any){
    this.http.post(environment.apiUrl + this.httpUrl['login'],
      params).subscribe({
        next: data => { callback((<any>data)); },
        error: error => {
          callback((<any>error));
        }
      })
  };

  logout(roleId:any,userId:any,callback:any){
    this.getData({},`${this.httpUrl['logout']}?role=${roleId}&user_id=${userId}`,callback);
  }

  isOwner(){
    return !!localStorage.getItem("isOwner");
  }

  isManager(){
    return !!localStorage.getItem("isManager");
  }

  isLoggedIn(){
    return !!localStorage.getItem("isLoggedIn")
  }

  setAccessToken(token:any,refreshToken:any){
    this.token = token;
    this.refreshToken = refreshToken;
  }

  setRoleAndUser(data:any){
    this.roleId = data.data.role;
    this.userId = data.data.user_id;
}

  getAccessToken(){
      return this.token;
  }

  getRefreshToken(){
    return this.refreshToken;
  }

  generateRefreshToken(role_id:any,user_id:any,callback?:any){
      return this.http.get(`https://www.e2xinfotech.com/hotelapi/refreshToken/?role=${role_id}&user_id=${user_id}`);
  }

}
