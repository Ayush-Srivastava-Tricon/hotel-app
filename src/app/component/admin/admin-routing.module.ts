import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  {
    path:'',
    component:AdminComponent,
    children:[
      {
        path:'',
        redirectTo:'manage-owner',
        pathMatch:'full',
      },
     {
      path:'dashboard',
      loadChildren:()=>import("./dashboard/dashboard.module").then(m=>m.AdminDashboardModule)
     },
     {
      path:'manage-owner',
      loadChildren:()=>import("./manage-owner/manage-owner.module").then(m=>m.ManageOwnerModule)
     },
     {
      path:'manage-ota',
      loadChildren:()=>import("./manage-ota/manage-ota.module").then(m=>m.ManageOtaModule)
     },
     {
      path:':id',
      loadChildren:()=>import("../calendar-view/calendar-view.module").then(m=>m.CalendarViewModule)
     }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
