import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CEUSeoManagementComponent } from './CEU-seo-management/CEU-seo-management.component';


const routes: Routes = [
	{
		path: '', component: CEUSeoManagementComponent,
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
export class CEUSeoRoutingModule {}
