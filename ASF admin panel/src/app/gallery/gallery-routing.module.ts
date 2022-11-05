import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GalleryManagementComponent } from './gallery-management/gallery-management.component';


const routes: Routes = [
	{
		path: '', component: GalleryManagementComponent,
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
export class GalleryRoutingModule {}
