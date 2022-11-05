import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AddCollectionComponent} from './collection-slider/add-collection/add-collection.component'
import { CollectionSliderManagementComponent } from './collection-slider/collection-slider-management/collection-slider-management.component';


const routes: Routes = [
		{path: '', component: CollectionSliderManagementComponent},
    {path:'edit-collection/:id', component:AddCollectionComponent},
    {path:'add-collection', component:AddCollectionComponent},

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CollectionSliderRoutingModule {}
