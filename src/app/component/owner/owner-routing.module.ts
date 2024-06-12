import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OwnerComponent } from './owner.component';
import { AuthGuard } from 'src/app/permission/auth.guard';

const routes: Routes = [
  {
    path:'',
    component:OwnerComponent,
    children:[
      {
        path:'',
        redirectTo:'manage-property',
        pathMatch:'full',
      },
      {
        path:'manage-property',
        loadChildren:()=>import("./manage-property/manage-property.module").then(m=>m.ManagePropertyModule),
      canActivate:[AuthGuard]
      },
      {
        path:'dashboard',
        loadChildren:()=>import("./dashboard/dashboard.module").then(m=>m.DashboardModule),
      canActivate:[AuthGuard]
      },
      {
        path:'calendar-view/:id',
        pathMatch:'full',
        loadChildren:()=>import("../calendar-view/calendar-view.module").then(m=>m.CalendarViewModule),
        canActivate:[AuthGuard]
      },
      {
        path:'**',
        redirectTo:'/dashboard'
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class OwnerRoutingModule { }
