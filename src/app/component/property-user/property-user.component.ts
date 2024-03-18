import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-property-user',
  templateUrl: './property-user.component.html',
  styleUrls: ['./property-user.component.scss']
})
export class PropertyUserComponent {


  constructor(private router:Router,private adminService:AdminService){}

  logout(){
    if(this.adminService.isAdmin()){
      this.router.navigate(['/admin'])
    }else{
      this.router.navigate(['/login'])
    }
    
  }
}
