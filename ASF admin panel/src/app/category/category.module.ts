import { NgModule } from '@angular/core';
import { CategoryManagementComponent } from './category/category-management/category-management.component';
import { SharedModule } from '../shared/shared.module';
import { SharedPaginationModule } from 'src/app/shared-components/shared-pagination/shared-pagination.module';
import { CategorySliderRoutingModule } from './category-routing.module';
import { AddUpdateCategoryModalComponent } from './category/category-management/add-update-category-modal/add-update-category-modal.component';
import { NgxLoadingModule } from 'ngx-loading';
import { FormsModule } from '@angular/forms';
import { NgxSummernoteModule } from 'ngx-summernote';
@NgModule({
  declarations: [
    CategoryManagementComponent,
    AddUpdateCategoryModalComponent,

  ],
  imports: [
    SharedModule,
    CategorySliderRoutingModule,
    SharedPaginationModule,
    NgxLoadingModule,
    FormsModule,
    NgxSummernoteModule
  ],
  providers: [
    AddUpdateCategoryModalComponent
  ],
})
export class CategoryModule { }
