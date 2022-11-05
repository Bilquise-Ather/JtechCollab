import { NgModule } from '@angular/core';
import { HomeSeoManagementComponent } from './home-seo-management/home-seo-management.component';
import { SharedModule } from '../shared/shared.module';
import { SharedPaginationModule } from 'src/app/shared-components/shared-pagination/shared-pagination.module';
import { HomeSeoRoutingModule } from './home-seo-routing.module';
import { NgxLoadingModule } from 'ngx-loading';
import { NgxSummernoteModule } from 'ngx-summernote';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    HomeSeoManagementComponent
  ],
  imports: [
    SharedModule,
    HomeSeoRoutingModule,
    SharedPaginationModule,
    NgxLoadingModule,
    FormsModule,
    NgxSummernoteModule,
  ],
  providers: [],
})
export class HomeSeoModule {}
