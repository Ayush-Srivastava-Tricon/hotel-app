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
  latLong:any='';

  constructor(private _service:PropertyService){}

  ngOnInit(){
      this.loggedUserData = JSON.parse(<any>localStorage.getItem("loggedUserData"))
      if(this.loggedUserData.latitudes && this.loggedUserData.longitudes){
        this.fetchRealTimeWeather();
      }else{
        this.getCurrentLatLong();
      }
      this.setRealTime();
    console.log(232);


  }

  getCurrentLatLong() {
    let ths = this;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        ths.latLong = `${latitude},${longitude}`;
        ths.fetchRealTimeWeather(ths.latLong);
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }

  fetchRealTimeWeather(param?:any){
    
    this.loader=true;
    let params:any= `${this.loggedUserData.latitudes},${this.loggedUserData.longitudes}`;
    if(params == ','){
      params = param;
    }
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
