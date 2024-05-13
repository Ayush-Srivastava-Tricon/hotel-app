import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent {

  constructor(private router:Router){}

  backToHome(){
    console.log(34);
    
    let currentUrl:any = this.router.url.split("/");
    if(currentUrl.length>2){
      this.router.navigate([currentUrl[1]])
    }else{
      this.router.navigate(['login']);
      localStorage.clear();
    }

  }
    

}
