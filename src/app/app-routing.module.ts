import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
 
  {
    path:'login',
    loadChildren:()=>import("./component/auth/login/login.module").then(m=>m.LoginModule)
  },
  {
    path:'signup',
    loadChildren:()=>import("./component/auth/signup/signup.module").then(m=>m.SignupModule)
  },
  {
    path:'calendar-view/:id/:id',
    pathMatch:'full',
    loadChildren:()=>import("./component/calendar-view/calendar-view.module").then(m=>m.CalendarViewModule)
  },
  {
    path:'calendar-view',
    pathMatch:'full',
    loadChildren:()=>import("./component/calendar-view/calendar-view.module").then(m=>m.CalendarViewModule)
  },
  {
    path:'owner',
    loadChildren:()=>import("./component/owner/owner.module").then(m=>m.OwnerModule)
  },
  {
    path:'manager',
    loadChildren:()=>import("./component/property-user/property-user.module").then(m=>m.PropertyUserModule)
  },
  {
    path:'signup',
    loadChildren:()=>import("./component/auth/signup/signup.module").then(m=>m.SignupModule)
  },
  {
    path:'admin',
    loadChildren:()=>import("./component/admin/admin.module").then(m=>m.AdminModule)
  },
  {
    path:'**',
    redirectTo:'/login'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
