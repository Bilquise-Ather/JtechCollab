import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FooterWebsiteDataManagementComponent } from './footer-website-data-management/footer-website-data-management.component';


const routes: Routes = [
	{
		path: '', component: FooterWebsiteDataManagementComponent,
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
export class FooterWebsiteDataRoutingModule {}
