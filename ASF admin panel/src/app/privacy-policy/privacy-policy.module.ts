import { NgModule } from '@angular/core';
import { PrivacyPolicyManagementComponent } from './privacy-policy-management/privacy-policy-management.component';
import { SharedModule } from '../shared/shared.module';
import { SharedPaginationModule } from 'src/app/shared-components/shared-pagination/shared-pagination.module';
import { PrivacyPolicyRoutingModule } from './privacy-policy-routing.module';
import { NgxLoadingModule } from 'ngx-loading';
import { NgxSummernoteModule } from 'ngx-summernote';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    PrivacyPolicyManagementComponent
  ],
  imports: [
    SharedModule,
    PrivacyPolicyRoutingModule,
    SharedPaginationModule,
    NgxLoadingModule,
    FormsModule,
    NgxSummernoteModule,
  ],
  providers: [],
})
export class PrivacyPolicyModule {}
