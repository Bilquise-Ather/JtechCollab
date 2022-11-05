import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CEUManagementComponent } from './CEU/CEU-management/CEU-management.component';


const routes: Routes = [
  {
    path: '', component: CEUManagementComponent,
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
export class CEURoutingModule { }
