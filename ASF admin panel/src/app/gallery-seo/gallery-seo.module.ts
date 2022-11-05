import { NgModule } from '@angular/core';
import { GallerySeoManagementComponent } from './gallery-seo-management/gallery-seo-management.component';
import { SharedModule } from '../shared/shared.module';
import { SharedPaginationModule } from 'src/app/shared-components/shared-pagination/shared-pagination.module';
import { GallerySeoRoutingModule } from './gallery-seo-routing.module';
import { NgxLoadingModule } from 'ngx-loading';
import { NgxSummernoteModule } from 'ngx-summernote';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    GallerySeoManagementComponent
  ],
  imports: [
    SharedModule,
    GallerySeoRoutingModule,
    SharedPaginationModule,
    NgxLoadingModule,
    FormsModule,
    NgxSummernoteModule,
  ],
  providers: [],
})
export class GallerySeoModule {}
