import { NgModule } from '@angular/core';
import { CommonSettingsManagementComponent } from './common-settings/common-settings-management/common-settings-management.component';
import { SharedModule } from '../shared/shared.module';
import { SharedPaginationModule } from 'src/app/shared-components/shared-pagination/shared-pagination.module';
import { CommonSettingsRoutingModule } from './common-settings-routing.module';
import { NgxLoadingModule } from 'ngx-loading';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    CommonSettingsManagementComponent
  ],
  imports: [
    SharedModule,
    CommonSettingsRoutingModule,
    SharedPaginationModule,
    NgxLoadingModule,
    FormsModule
  ],
  providers: [],
})
export class CommonSettingsModule {}
