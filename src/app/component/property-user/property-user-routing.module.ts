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
        redirectTo:'calendar-view',
        pathMatch:'full',
      },
      {
        path:'manage-room',
        loadChildren:()=>import("./manage-rooms/manage-rooms.module").then(m=>m.ManageRoomsModule)
      },
      {
        path:'calendar-view',
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
