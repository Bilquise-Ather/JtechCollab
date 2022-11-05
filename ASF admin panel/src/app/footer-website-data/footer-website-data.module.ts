import { NgModule } from '@angular/core';
import { FooterWebsiteDataManagementComponent } from './footer-website-data-management/footer-website-data-management.component';
import { SharedModule } from '../shared/shared.module';
import { SharedPaginationModule } from 'src/app/shared-components/shared-pagination/shared-pagination.module';
import { FooterWebsiteDataRoutingModule } from './footer-website-data-routing.module';
import { NgxLoadingModule } from 'ngx-loading';
import { NgxSummernoteModule } from 'ngx-summernote';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    FooterWebsiteDataManagementComponent
  ],
  imports: [
    SharedModule,
    FooterWebsiteDataRoutingModule,
    SharedPaginationModule,
    NgxLoadingModule,
    FormsModule,
    NgxSummernoteModule,
  ],
  providers: [],
})
export class FooterWebsiteDataModule {}
