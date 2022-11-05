import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResourceSeoSettingManagementComponent } from './resource-seo-setting-management/resource-seo-setting-management.component';


const routes: Routes = [
	{
		path: '', component: ResourceSeoSettingManagementComponent,
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
export class ResourceSeoSettingRoutingModule {}
