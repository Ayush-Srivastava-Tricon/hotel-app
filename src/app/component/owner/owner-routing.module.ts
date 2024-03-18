import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OwnerComponent } from './owner.component';

const routes: Routes = [
  {
    path:'',
    component:OwnerComponent,
    children:[
      {
        path:'',
        redirectTo:'dashboard',
        pathMatch:'full',
      },
      {
        path:'manage-property',
        loadChildren:()=>import("./manage-property/manage-property.module").then(m=>m.ManagePropertyModule)
      },
      {
        path:'dashboard',
        loadChildren:()=>import("./dashboard/dashboard.module").then(m=>m.DashboardModule)
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
