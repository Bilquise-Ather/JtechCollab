import { NgModule } from '@angular/core';
import { SearchSEOManagementComponent } from './search-seo-management/search-seo-management.component';
import { SharedModule } from '../shared/shared.module';
import { SharedPaginationModule } from 'src/app/shared-components/shared-pagination/shared-pagination.module';
import { SearchSEORoutingModule } from './search-seo-routing.module';
import { NgxLoadingModule } from 'ngx-loading';
import { NgxSummernoteModule } from 'ngx-summernote';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    SearchSEOManagementComponent
  ],
  imports: [
    SharedModule,
    SearchSEORoutingModule,
    SharedPaginationModule,
    NgxLoadingModule,
    FormsModule,
    NgxSummernoteModule,
  ],
  providers: [],
})
export class SearchSEOModule {}
