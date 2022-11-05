import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductOptionsManagementComponent } from './product_options-management/product_options-management.component';
import { AddProductOptionsComponent } from 'src/app/product_options/add-product_options/add-product_options.component';



const routes: Routes = [
  { path: '', component: ProductOptionsManagementComponent },
  { path: 'edit-product_options/:id', component: AddProductOptionsComponent },
  { path: 'add-product_options', component: AddProductOptionsComponent },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductOptionsRoutingModule { }
