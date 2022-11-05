import { NgModule } from '@angular/core';
import { ProductManagementComponent } from './product-management/product-management.component';
import { AddProductComponent } from './add-product/add-product.component';
import { SharedModule } from '../shared/shared.module';
import { SharedPaginationModule } from 'src/app/shared-components/shared-pagination/shared-pagination.module';
import { ProductsRoutingModule } from './products-routing.module';
import { NgxLoadingModule } from 'ngx-loading';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
  declarations: [
    ProductManagementComponent,
    AddProductComponent
  ],
  imports: [
    SharedModule,
    ProductsRoutingModule,
    SharedPaginationModule,
    NgxLoadingModule,
    FormsModule,
    NgSelectModule,
    DropdownModule
  ],
  providers: [
    AddProductComponent
  ],
})
export class ProductsModule {}
