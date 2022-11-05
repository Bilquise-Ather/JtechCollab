import { NgModule } from '@angular/core';
import { CEUSeoManagementComponent } from './CEU-seo-management/CEU-seo-management.component';
import { SharedModule } from '../shared/shared.module';
import { SharedPaginationModule } from 'src/app/shared-components/shared-pagination/shared-pagination.module';
import { CEUSeoRoutingModule } from './CEU-seo-routing.module';
import { NgxLoadingModule } from 'ngx-loading';
import { NgxSummernoteModule } from 'ngx-summernote';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    CEUSeoManagementComponent
  ],
  imports: [
    SharedModule,
    CEUSeoRoutingModule,
    SharedPaginationModule,
    NgxLoadingModule,
    FormsModule,
    NgxSummernoteModule,
  ],
  providers: [],
})
export class CEUSeoModule {}
