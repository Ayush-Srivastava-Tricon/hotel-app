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
        redirectTo:'dashboard',
        pathMatch:'full',
      },
     {
      path:'dashboard',
      loadChildren:()=>import("./dashboard/dashboard.module").then(m=>m.AdminDashboardModule)
     },
     {
      path:'manage-owner',
      loadChildren:()=>import("./manage-user/manage-user.module").then(m=>m.ManageUserModule)
     },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
