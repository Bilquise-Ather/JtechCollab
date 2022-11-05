import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Tiles19ManagementComponent } from './tiles-19-management/tiles-19-management.component';


const routes: Routes = [
	{
		path: '', component: Tiles19ManagementComponent,
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
export class Tiles19RoutingModule {}
