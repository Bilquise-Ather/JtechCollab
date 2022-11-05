import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductManagementComponent } from './product-management/product-management.component';
import { AddProductComponent } from 'src/app/products/add-product/add-product.component';



const routes: Routes = [
  {path: '', component: ProductManagementComponent},
  {path:'edit-product/:id', component:AddProductComponent},
  {path:'add-product', component:AddProductComponent},
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
