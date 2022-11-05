import { NgModule } from '@angular/core';
import { TermsConditionManagementComponent } from './terms-condition-management/terms-condition-management.component';
import { SharedModule } from '../shared/shared.module';
import { SharedPaginationModule } from 'src/app/shared-components/shared-pagination/shared-pagination.module';
import { TermsConditionRoutingModule } from './terms-condition-routing.module';
import { NgxLoadingModule } from 'ngx-loading';
import { NgxSummernoteModule } from 'ngx-summernote';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    TermsConditionManagementComponent
  ],
  imports: [
    SharedModule,
    TermsConditionRoutingModule,
    SharedPaginationModule,
    NgxLoadingModule,
    FormsModule,
    NgxSummernoteModule,
  ],
  providers: [],
})
export class TermsConditionModule {}
