import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FaqsSeoManagementComponent } from './faqs-seo-management/faqs-seo-management.component';


const routes: Routes = [
	{
		path: '', component: FaqsSeoManagementComponent,
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
export class FaqsSeoRoutingModule {}
