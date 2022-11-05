import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoomsPathManagementComponent } from './rooms-path-management/rooms-path-management.component';


const routes: Routes = [
	{
		path: '', component: RoomsPathManagementComponent,
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
export class RoomsPathRoutingModule {}
