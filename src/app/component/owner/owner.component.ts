import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.scss']
})
export class OwnerComponent {

  loggedUserData:any={};

  constructor(private router:Router,private authService:AuthService){}

  ngOnInit(){
    this.loggedUserData = JSON.parse(<any>localStorage.getItem('loggedUserData'));
    console.log(this.loggedUserData);
  }

  logout(){
    const role_id:any = this.authService.roleId ? this.authService.roleId : JSON.parse(<any>localStorage.getItem("roleId"));
    const userId:any = this.authService.userId ? this.authService.userId : JSON.parse(<any>localStorage.getItem("userId"));
    this.authService.logout(role_id, userId, (res: any) => {
      if (res) {
        this.router.navigate(['/login']);
        localStorage.clear();
      } else {
        this.router.navigate(['/login']);
        localStorage.clear();
      }
    })
  }

}
