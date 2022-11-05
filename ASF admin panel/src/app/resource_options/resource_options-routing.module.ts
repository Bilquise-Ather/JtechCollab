import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResourceOptionsManagementComponent } from './resource_options-management/resource_options-management.component';
import { AddResourceOptionsComponent } from 'src/app/resource_options/add-resource_options/add-resource_options.component';



const routes: Routes = [
  {path: '', component: ResourceOptionsManagementComponent},
  {path:'edit-resource_options/:id', component:AddResourceOptionsComponent},
  {path:'add-resource_options', component:AddResourceOptionsComponent},
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResourceOptionsRoutingModule {}
