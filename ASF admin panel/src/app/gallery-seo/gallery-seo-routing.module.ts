import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GallerySeoManagementComponent } from './gallery-seo-management/gallery-seo-management.component';


const routes: Routes = [
	{
		path: '', component: GallerySeoManagementComponent,
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
export class GallerySeoRoutingModule {}
