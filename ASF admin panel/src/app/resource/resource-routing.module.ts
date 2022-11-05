import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResourceManagementComponent } from './resource-management/resource-management.component';
import { AddResourceComponent } from 'src/app/resource/add-resource/add-resource.component';

const routes: Routes = [
  {path: '', component: ResourceManagementComponent},
  {path:'edit-resource/:id', component:AddResourceComponent},
  {path:'add-resource', component:AddResourceComponent},
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResourceRoutingModule {}
