import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-property-user',
  templateUrl: './property-user.component.html',
  styleUrls: ['./property-user.component.scss']
})
export class PropertyUserComponent {

  currentPropertyId:any=0;

  constructor(private router:Router,private adminService:AdminService){}

  ngOnInit(){
    if(localStorage.getItem("selectedPropertyId")){
      this.currentPropertyId = localStorage.getItem("selectedPropertyId");
    }else{
      this.currentPropertyId = localStorage.getItem("userId");
    }

  }

  logout(){
    if(this.adminService.isAdmin()){
      localStorage.removeItem("selectedPropertyId");
      localStorage.removeItem("propertyList");
      this.router.navigate(['/admin']);
    }else{
      localStorage.clear();
      this.router.navigate(['/login']);
    }
    
  }
}
