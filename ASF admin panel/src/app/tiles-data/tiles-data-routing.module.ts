import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TilesDataManagementComponent } from './tiles-data/tiles-data-management/tiles-data-management.component';


const routes: Routes = [
	{
		path: '', component: TilesDataManagementComponent,
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
export class TilesDataRoutingModule {}
