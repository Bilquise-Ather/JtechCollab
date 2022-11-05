import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FaqsManagementComponent } from './faqs/faqs-management/faqs-management.component';


const routes: Routes = [
	{
		path: '', component: FaqsManagementComponent,
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
export class FaqsRoutingModule {}
