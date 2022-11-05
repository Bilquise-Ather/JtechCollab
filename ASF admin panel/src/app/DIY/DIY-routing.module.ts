import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DIYManagementComponent } from './DIY/DIY-management/DIY-management.component';


const routes: Routes = [
	{
		path: '', component: DIYManagementComponent,
		// children: [
		// 	{ path: '', redirectTo: '/homeslider', pathMatch: 'full' },
    //   { path: 'homeslider', component: DIYManagementComponent},

		// ]
	}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DIYRoutingModule {}
