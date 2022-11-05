import { NgModule } from '@angular/core';
import { ProductCategoryManagementComponent } from './productcategory/productcategory-management/productcategory-management.component';
import { SharedModule } from '../shared/shared.module';
import { SharedPaginationModule } from 'src/app/shared-components/shared-pagination/shared-pagination.module';
import { ProductCategoryRoutingModule } from './productcategory-routing.module';
import { AddUpdateProductCategoryModalComponent } from './productcategory/productcategory-management/add-update-productcategory-modal/add-update-productcategory-modal.component';
import { NgxLoadingModule } from 'ngx-loading';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    ProductCategoryManagementComponent,
    AddUpdateProductCategoryModalComponent,

  ],
  imports: [
    SharedModule,
    ProductCategoryRoutingModule,
    SharedPaginationModule,
    NgxLoadingModule,
    FormsModule
  ],
  providers: [
    AddUpdateProductCategoryModalComponent
  ],
})
export class ProductCategoryModule { }
