import { NgModule } from '@angular/core';
import { VisualiserSeoManagementComponent } from './visualiser-seo-management/visualiser-seo-management.component';
import { SharedModule } from '../shared/shared.module';
import { SharedPaginationModule } from 'src/app/shared-components/shared-pagination/shared-pagination.module';
import { VisualiserSeoRoutingModule } from './visualiser-seo-routing.module';
import { NgxLoadingModule } from 'ngx-loading';
import { NgxSummernoteModule } from 'ngx-summernote';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    VisualiserSeoManagementComponent
  ],
  imports: [
    SharedModule,
    VisualiserSeoRoutingModule,
    SharedPaginationModule,
    NgxLoadingModule,
    FormsModule,
    NgxSummernoteModule,
  ],
  providers: [],
})
export class VisualiserSeoModule {}
