import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchSEOManagementComponent } from './search-seo-management/search-seo-management.component';


const routes: Routes = [
	{
		path: '', component: SearchSEOManagementComponent,
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
export class SearchSEORoutingModule {}
