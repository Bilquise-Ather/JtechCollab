import { NgModule } from '@angular/core';
import { DIYSeoManagementComponent } from './DIY-seo-management/DIY-seo-management.component';
import { SharedModule } from '../shared/shared.module';
import { SharedPaginationModule } from 'src/app/shared-components/shared-pagination/shared-pagination.module';
import { DIYSeoRoutingModule } from './DIY-seo-routing.module';
import { NgxLoadingModule } from 'ngx-loading';
import { NgxSummernoteModule } from 'ngx-summernote';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    DIYSeoManagementComponent
  ],
  imports: [
    SharedModule,
    DIYSeoRoutingModule,
    SharedPaginationModule,
    NgxLoadingModule,
    FormsModule,
    NgxSummernoteModule,
  ],
  providers: [],
})
export class DIYSeoModule {}
