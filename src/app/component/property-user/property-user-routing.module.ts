import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PropertyUserComponent } from './property-user.component';
import { AuthGuard } from 'src/app/permission/auth.guard';

const routes: Routes = [
  {
    path:'',
    component:PropertyUserComponent,
    children:[
      {
        path:'',
        redirectTo:'dashboard',
        pathMatch:'full',
      },
      {
        path:'dashboard',
        loadChildren:()=>import("./dashboard/dashboard.module").then(m=>m.DashboardModule),
         canActivate:[AuthGuard]
      },
      {
        path:'manage-room',
        loadChildren:()=>import("./manage-rooms/manage-rooms.module").then(m=>m.ManageRoomsModule),
         canActivate:[AuthGuard]
      },
      {
        path:'manage-ota-user',
        loadChildren:()=>import("./manage-ota-user/manage-ota-user.module").then(m=>m.ManageOtaUserModule),
         canActivate:[AuthGuard]
      },
      {
        path:'manage-ota-rooms',
        loadChildren:()=>import("./manage-ota-rooms/manage-ota-rooms.module").then(m=>m.ManageOtaRoomsModule),
         canActivate:[AuthGuard]
      },
      {
        path:'manage-internal-mapping',
        loadChildren:()=>import("./manage-internal-mapping/manage-internal-mapping.module").then(m=>m.ManageInternalMappingModule),
         canActivate:[AuthGuard]
      },
      {
        path:'calendar-view/:id',
        pathMatch:'full',
        loadChildren:()=>import("../calendar-view/calendar-view.module").then(m=>m.CalendarViewModule),
         canActivate:[AuthGuard]
      },
      {
        path:'calendar-view',
        pathMatch:'full',
        loadChildren:()=>import("../calendar-view/calendar-view.module").then(m=>m.CalendarViewModule),
         canActivate:[AuthGuard]
      },
      {
        path:'manage-reservation',
        loadChildren:()=>import("./reservation/reservation.module").then(m=>m.ReservationModule),
         canActivate:[AuthGuard]
      },
      {
        path:'list-reservation',
        loadChildren:()=>import("./list-reservation/list-reservation.module").then(m=>m.ListReservationModule),
         canActivate:[AuthGuard]
      },
      {
        path:'rate-plan',
        loadChildren:()=>import("./rate-plan/rate-plan.module").then(m=>m.RatePlanModule),
         canActivate:[AuthGuard]
      },
      {
        path:'manage-pms',
        loadChildren:()=>import("./manage-pms/manage-pms.module").then(m=>m.ManagePmsModule),
         canActivate:[AuthGuard]
      },
      {
        path:'manage-housekeeping',
        loadChildren:()=>import("./manage-housekeeping/manage-housekeeping.module").then(m=>m.ManageHousekeepingModule),
         canActivate:[AuthGuard]
      },
     
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PropertyUserRoutingModule { }
