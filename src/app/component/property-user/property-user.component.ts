import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-property-user',
  templateUrl: './property-user.component.html',
  styleUrls: ['./property-user.component.scss']
})
export class PropertyUserComponent {


  constructor(private router:Router){}

  logout(){
    this.router.navigate(['/login'])
  }
}
