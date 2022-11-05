import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { SettingsComponent } from './settings/settings.component';
// import { ProfileSettingsComponent } from './settings/profile-settings/profile-settings.component';
// import { ProfileManagementComponent } from './settings/profile-settings/profile-management/profile-management.component';
import { ResourseSeoComponent } from './resource-page/resource-page.component';
import { ResourceOptionsManagementComponent } from '../resource_options/resource_options-management/resource_options-management.component';
import { ResourceManagementComponent } from '../resource/resource-management/resource-management.component';

const routes: Routes = [
  {
    path: '', component: ResourseSeoComponent,
    children: [
      { path: '', redirectTo: '/resource-page/resource', pathMatch: 'full' },
      { path: 'resource', component: ResourceManagementComponent},
      {path: 'resource_options', component: ResourceOptionsManagementComponent},
      // {
      //   path: 'reminder', component: EmailSettingsComponent,
      //   children: [
      //     { path: 'interview', component: InterviewReminderComponent },
      //     { path: '', redirectTo: '/settings/reminder/interview', pathMatch: 'full' },
      //   ]
      // }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResourseSeoRoutingModule { }
