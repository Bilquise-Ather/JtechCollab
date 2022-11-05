import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { SettingsComponent } from './settings/settings.component';
// import { ProfileSettingsComponent } from './settings/profile-settings/profile-settings.component';
// import { ProfileManagementComponent } from './settings/profile-settings/profile-management/profile-management.component';
import { CommonPagesComponent } from './common-pages/common-pages.component';

import { Tiles19ManagementComponent } from '../tiles-19/tiles-19-management/tiles-19-management.component';
import { Tiles24ManagementComponent } from '../tiles-24/tiles-24-management/tiles-24-management.component';
import { TilesDataManagementComponent } from '../tiles-data/tiles-data/tiles-data-management/tiles-data-management.component';


const routes: Routes = [
  {
    path: '', component: CommonPagesComponent,
    children: [
      { path: '', redirectTo: '/tiles-page/19x19', pathMatch: 'full' },
      { path: '19x19', component: Tiles19ManagementComponent },
      { path: '24x24', component: Tiles24ManagementComponent },
      { path: 'color-options', component: TilesDataManagementComponent },

    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommonPagesRoutingModule { }
