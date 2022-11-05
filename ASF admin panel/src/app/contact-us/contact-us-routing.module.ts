import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactusManagementComponent } from './contact-us/contact-us-management/contact-us-management.component';


const routes: Routes = [
	{
		path: '', component: ContactusManagementComponent,
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
export class ContactusRoutingModule {}
