import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {

  constructor(private router: Router, private authService: AuthService,private translate:TranslateService) { }

  logout() {
    this.authService.logout(this.authService.roleId, this.authService.userId, (res: any) => {
      if (res) {
        this.router.navigate(['/login']);
        localStorage.clear();
      }else{
        this.router.navigate(['/login']);
        localStorage.clear();
      }
    })

  }
}
