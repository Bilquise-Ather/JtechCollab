import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { SettingsComponent } from './settings/settings.component';
// import { ProfileSettingsComponent } from './settings/profile-settings/profile-settings.component';
// import { ProfileManagementComponent } from './settings/profile-settings/profile-management/profile-management.component';
import { CommonPagesComponent } from './common-pages/common-pages.component';

import { RoomsManagementComponent } from '../rooms/rooms-management/rooms-management.component';
import { RoomsPathManagementComponent } from '../rooms-path/rooms-path-management/rooms-path-management.component';

const routes: Routes = [
  {
    path: '', component: CommonPagesComponent,
    children: [
      { path: '', redirectTo: '/rooms/rooms', pathMatch: 'full' },
      { path: 'rooms', component: RoomsManagementComponent },
      { path: 'path', component: RoomsPathManagementComponent }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommonPagesRoutingModule { }
