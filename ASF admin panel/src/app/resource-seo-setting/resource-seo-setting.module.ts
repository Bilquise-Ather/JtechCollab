import { NgModule } from '@angular/core';
import { ResourceSeoSettingManagementComponent } from './resource-seo-setting-management/resource-seo-setting-management.component';
import { SharedModule } from '../shared/shared.module';
import { SharedPaginationModule } from 'src/app/shared-components/shared-pagination/shared-pagination.module';
import { ResourceSeoSettingRoutingModule } from './resource-seo-setting-routing.module';
import { NgxLoadingModule } from 'ngx-loading';
import { NgxSummernoteModule } from 'ngx-summernote';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    ResourceSeoSettingManagementComponent
  ],
  imports: [
    SharedModule,
    ResourceSeoSettingRoutingModule,
    SharedPaginationModule,
    NgxLoadingModule,
    FormsModule,
    NgxSummernoteModule,
  ],
  providers: [],
})
export class ResourceSeoSettingModule {}
