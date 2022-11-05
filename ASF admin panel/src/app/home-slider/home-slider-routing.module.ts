import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeSliderManagementComponent } from './home-slider/home-slider-management/home-slider-management.component';


const routes: Routes = [
	{
		path: '', component: HomeSliderManagementComponent,
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
export class HomeSliderRoutingModule {}
