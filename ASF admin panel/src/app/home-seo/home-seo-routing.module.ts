import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeSeoManagementComponent } from './home-seo-management/home-seo-management.component';


const routes: Routes = [
	{
		path: '', component: HomeSeoManagementComponent,
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
export class  HomeSeoRoutingModule {}
