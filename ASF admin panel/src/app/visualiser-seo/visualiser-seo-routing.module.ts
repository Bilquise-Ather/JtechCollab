import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VisualiserSeoManagementComponent } from './visualiser-seo-management/visualiser-seo-management.component';


const routes: Routes = [
	{
		path: '', component: VisualiserSeoManagementComponent,
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
export class VisualiserSeoRoutingModule {}
