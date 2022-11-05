import { NgModule } from '@angular/core';
import { ContactUsSeoManagementComponent } from './contact-us-seo-management/contact-us-seo-management.component';
import { SharedModule } from '../shared/shared.module';
import { SharedPaginationModule } from 'src/app/shared-components/shared-pagination/shared-pagination.module';
import { ContactUsSeoRoutingModule } from './contact-us-seo-routing.module';
import { NgxLoadingModule } from 'ngx-loading';
import { NgxSummernoteModule } from 'ngx-summernote';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    ContactUsSeoManagementComponent
  ],
  imports: [
    SharedModule,
    ContactUsSeoRoutingModule,
    SharedPaginationModule,
    NgxLoadingModule,
    FormsModule,
    NgxSummernoteModule,
  ],
  providers: [],
})
export class ContactUsSeoModule {}
