import { NgModule } from '@angular/core';
import { FaqsSeoManagementComponent } from './faqs-seo-management/faqs-seo-management.component';
import { SharedModule } from '../shared/shared.module';
import { SharedPaginationModule } from 'src/app/shared-components/shared-pagination/shared-pagination.module';
import { FaqsSeoRoutingModule } from './faqs-seo-routing.module';
import { NgxLoadingModule } from 'ngx-loading';
import { NgxSummernoteModule } from 'ngx-summernote';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    FaqsSeoManagementComponent
  ],
  imports: [
    SharedModule,
    FaqsSeoRoutingModule,
    SharedPaginationModule,
    NgxLoadingModule,
    FormsModule,
    NgxSummernoteModule,
  ],
  providers: [],
})
export class FaqsSeoModule {}
