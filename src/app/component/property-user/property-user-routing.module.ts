import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PropertyUserComponent } from './property-user.component';

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
        loadChildren:()=>import("./dashboard/dashboard.module").then(m=>m.DashboardModule)
      },
      {
        path:'manage-room',
        loadChildren:()=>import("./manage-rooms/manage-rooms.module").then(m=>m.ManageRoomsModule)
      },
      {
        path:'manage-ota-user',
        loadChildren:()=>import("./manage-ota-user/manage-ota-user.module").then(m=>m.ManageOtaUserModule)
      },
      {
        path:'manage-ota-rooms',
        loadChildren:()=>import("./manage-ota-rooms/manage-ota-rooms.module").then(m=>m.ManageOtaRoomsModule)
      },
      {
        path:'manage-internal-mapping',
        loadChildren:()=>import("./manage-internal-mapping/manage-internal-mapping.module").then(m=>m.ManageInternalMappingModule)
      },
      {
        path:'calendar-view/:id',
        pathMatch:'full',
        loadChildren:()=>import("../calendar-view/calendar-view.module").then(m=>m.CalendarViewModule)
      },
      {
        path:'calendar-view',
        pathMatch:'full',
        loadChildren:()=>import("../calendar-view/calendar-view.module").then(m=>m.CalendarViewModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PropertyUserRoutingModule { }
