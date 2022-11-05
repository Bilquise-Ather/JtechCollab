import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DIYSeoManagementComponent } from './DIY-seo-management/DIY-seo-management.component';


const routes: Routes = [
	{
		path: '', component: DIYSeoManagementComponent,
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
export class DIYSeoRoutingModule {}
