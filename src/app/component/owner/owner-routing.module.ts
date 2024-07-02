import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OwnerComponent } from './owner.component';
import { AuthGuard } from 'src/app/permission/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: OwnerComponent,
    children: [
      {
        path: '',
        redirectTo: 'manage-property',
        pathMatch: 'full',
      },
      {
        path: 'manage-property',
        loadChildren: () => import("./manage-property/manage-property.module").then(m => m.ManagePropertyModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'dashboard',
        loadChildren: () => import("./dashboard/dashboard.module").then(m => m.DashboardModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'user_setting',
        loadChildren: () => import("../../shared/default-user-setting/default-user-setting.module").then(m => m.DefaultUserSettingModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'change_password',
        loadChildren: () => import("../../shared/change-password/change-password.module").then(m => m.ChangePasswordModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'calendar-view/:id',
        pathMatch: 'full',
        loadChildren: () => import("../calendar-view/calendar-view.module").then(m => m.CalendarViewModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'e_mail',
        loadChildren: () => import("../../shared/e-mail-template/e-mail-template.module").then(m => m.EMailTemplateModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'owner-setting',
        loadChildren:()=>import("../owner/owner-setting/owner-setting.module").then(m=>m.OwnerSettingModule)
      },
      {
        path: '**',
        redirectTo: '/dashboard'
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OwnerRoutingModule { }
