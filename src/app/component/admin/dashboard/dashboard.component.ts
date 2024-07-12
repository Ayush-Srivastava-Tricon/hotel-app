import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class AdminDashboardComponent {
  searchConfig: any = { searchType: 'Select' };
  loader:boolean=false;
  filteredList:any=[];
  showFullDetailRight: any = {showPanel:false};
  selectedPropertyId:any;
  allLang:any=[];

  constructor(private adminService:AdminService,private router:Router, private translate: TranslateService){}

  ngOnInit() {
    this.setDefaultLang('en');
  }

  ngAfterContentInit() {
    this.getAllSortedLang();
  }

  getAllSortedLang() {
    this.allLang = homeLanguages;
  }

  setDefaultLang(lang: any) {
    this.translate.use(lang);
  }

  searchById() {
    this.loader = true;
    let params: any = {
      "search_for": +this.searchConfig['searchType'],
      "param":this.searchConfig['searchValue']
    };
    this.loader = true;
    this.adminService.filterByIdOrName(params, (res: any) => {
      if (res.status == 200) {
        this.loader = false;
        this.filteredList = res.data;
        this.setAllPropertyListToLocal(res.data);
      }
      this.loader = false;
    });

    this.showFullDetailRight.showPanel=false;
    this.showFullDetailRight.details={};

  }

  setAllPropertyListToLocal(data:any){
    localStorage.setItem("propertyList",JSON.stringify(data));
  }

  
  viewFullDetails(idx:any,propertyId: any) {
    this.showFullDetailRight.showPanel = true;  
    this.showFullDetailRight['details'] = this.filteredList[idx];
    this.selectedPropertyId  = propertyId;
    
    
  }

  loginAsProperty() {
    localStorage.setItem("selectedPropertyId",this.selectedPropertyId);
    this.router.navigate(['/manager']);
    // localStorage.setItem("loggedUserData",JSON.stringify(this.showFullDetailRight['details']))
  }
}
