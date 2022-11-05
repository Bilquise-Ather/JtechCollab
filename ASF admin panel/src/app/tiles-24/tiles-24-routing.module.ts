import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Tiles24ManagementComponent } from './tiles-24-management/tiles-24-management.component';


const routes: Routes = [
	{
		path: '', component: Tiles24ManagementComponent,
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
export class Tiles24RoutingModule {}
