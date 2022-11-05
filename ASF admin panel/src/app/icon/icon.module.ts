import { NgModule } from '@angular/core';
import { IconManagementComponent } from './icon/icon-management/icon-management.component';
import { SharedModule } from '../shared/shared.module';
import { SharedPaginationModule } from 'src/app/shared-components/shared-pagination/shared-pagination.module';
import { IconRoutingModule } from './icon-routing.module';
import { AddUpdateIconModalComponent } from './icon/icon-management/add-update-icon-modal/add-update-icon-modal.component';
import { NgxLoadingModule } from 'ngx-loading';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    IconManagementComponent,
    AddUpdateIconModalComponent,

  ],
  imports: [
    SharedModule,
    IconRoutingModule,
    SharedPaginationModule,
    NgxLoadingModule,
    FormsModule
  ],
  providers: [
  	AddUpdateIconModalComponent
  ],
})
export class IconModule {}
