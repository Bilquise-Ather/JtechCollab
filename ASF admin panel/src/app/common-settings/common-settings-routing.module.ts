import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonSettingsManagementComponent } from './common-settings/common-settings-management/common-settings-management.component';


const routes: Routes = [
  {
    path: '', component: CommonSettingsManagementComponent,
    // children: [
    // 	{ path: '', redirectTo: '/homeslider', pathMatch: 'full' },
    //   { path: 'homeslider', component: HomeSliderManagementComponent},

    // ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommonSettingsRoutingModule { }
