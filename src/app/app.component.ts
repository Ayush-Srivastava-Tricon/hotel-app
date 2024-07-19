import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title:any='hotel booking system';

  constructor(){}

  ngAfterViewInit(){
    // googleTranslateElementInit();
  }

  changeLang(event:any){
    
  }

}
