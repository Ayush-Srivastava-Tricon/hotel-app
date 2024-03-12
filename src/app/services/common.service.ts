import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  public bearerToken : any = new Subject();
  public refreshToken : any = new Subject();


  constructor() { }
}
