import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IconManagementComponent } from './icon/icon-management/icon-management.component';


const routes: Routes = [
	{
		path: '', component: IconManagementComponent,
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
export class IconRoutingModule {}
