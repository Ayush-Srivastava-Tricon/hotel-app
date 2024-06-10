import { Component } from '@angular/core';
import { PropertyService } from 'src/app/services/property.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  todayDate:any = new Date();
  currentPropertyId:any=0;
  loggedUserData:any={};
  weatherConfig:any={};
  realTime:any='';
  loader:boolean=false;

  constructor(private _service:PropertyService){}

  ngOnInit(){
      this.loggedUserData = JSON.parse(<any>localStorage.getItem("loggedUserData"))
      if(this.loggedUserData.latitudes && this.loggedUserData.longitudes){
        this.fetchRealTimeWeather();
      }else{

      }
      this.setRealTime();

  }

  fetchRealTimeWeather(){
    this.loader=true;
    let params:any= `${this.loggedUserData.latitudes},${this.loggedUserData.longitudes}`;
    this._service.fetchRealTimeWeather(params,(res:any)=>{
      if(res){
        this.weatherConfig['weather'] = res.current;
        this.weatherConfig['location'] = res.location;
        this.loader=false;
      }
    })
  }

  setRealTime(){
    setInterval(()=>{
      this.realTime = new Date().toLocaleTimeString();
    },1000)
  }

}
