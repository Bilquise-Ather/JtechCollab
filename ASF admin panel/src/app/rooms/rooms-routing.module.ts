import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoomsManagementComponent } from './rooms-management/rooms-management.component';


const routes: Routes = [
	{
		path: '', component: RoomsManagementComponent,
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
export class RoomsRoutingModule {}
