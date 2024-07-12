import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AuthGuard } from 'src/app/permission/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadChildren: () => import("./dashboard/dashboard.module").then(m => m.AdminDashboardModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'manage-owner',
        loadChildren: () => import("./manage-owner/manage-owner.module").then(m => m.ManageOwnerModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'manage-ota',
        loadChildren: () => import("./manage-ota/manage-ota.module").then(m => m.ManageOtaModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'change_password',
        loadChildren: () => import("../../shared/change-password/change-password.module").then(m => m.ChangePasswordModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'e_mail',
        loadChildren: () => import("../../shared/e-mail-template/e-mail-template.module").then(m => m.EMailTemplateModule),
        canActivate: [AuthGuard]
      },
      {
        path: "**",
        redirectTo: 'dashboard'
      }
      //  {
      //   path:':id',
      //   loadChildren:()=>import("../calendar-view/calendar-view.module").then(m=>m.CalendarViewModule),
      //   canActivate:[AuthGuard]
      //  }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
