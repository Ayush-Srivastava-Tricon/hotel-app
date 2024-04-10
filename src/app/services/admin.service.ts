import { Injectable } from '@angular/core';
import { BaseServiceService } from './base-service.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService extends BaseServiceService {

  googleTranslateApiKey: any = "AIzaSyATBXajvzQLTDHEQbcpq0Ihe0vWDHmO520";
  googleTranslateApiUrl: any = 'https://translation.googleapis.com/language/translate/v2';

  constructor(http: HttpClient) { super(http); }

  addOwner(params: any, callback: any) {
    this.postData(params, this.httpUrl['addOwner'], callback)
  }

  editOwner(params: any, callback: any) {
    this.putData(params, this.httpUrl['editOwner'], callback)
  }

  deleteOwner(ownerId: any, callback: any) {
    this.deleteData({}, this.httpUrl['deleteOwner'] + "/" + ownerId, callback)
  }

  fetchOwnerList(callback: any) {
    this.getData({}, this.httpUrl['getOwner'], callback)
  }

  fetchOwnerById(ownerId: any, callback: any) {
    this.getData({}, `${this.httpUrl['getOwnerById']}/${ownerId}`, callback)
  }

  filterByIdOrName(params: any, callback: any) {
    this.postData(params, `${this.httpUrl['filter']}`, callback)
  }

  isAdmin() {
    return !!localStorage.getItem("isadmin");
  }

  doGTranslate(text: string, targetLang: string, callback: any) {
    const params = {
      key: this.googleTranslateApiKey,
      q: text,
      target: targetLang
    };
    return this.http.post(this.googleTranslateApiUrl, params).subscribe((data: any) => callback(data));
  }

  addOtaDetails(params: any, callback: any) {
    this.postData(params, this.httpUrl['addOta'], callback)
  }

  fetchOtaDetails(callback:any){
    this.getData({}, this.httpUrl['getOta'], callback)
  }

  editOtaDetails(params: any, callback: any) {
    this.putData(params, this.httpUrl['editOta'], callback)
  }

}
