import { NgModule } from '@angular/core';
import { DIYManagementComponent } from './DIY/DIY-management/DIY-management.component';
import { SharedModule } from '../shared/shared.module';
import { SharedPaginationModule } from 'src/app/shared-components/shared-pagination/shared-pagination.module';
import { DIYRoutingModule } from './DIY-routing.module';
import { AddUpdateDIYModalComponent } from './DIY/DIY-management/add-update-DIY-modal/add-update-DIY-modal.component';
import { NgxLoadingModule } from 'ngx-loading';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    DIYManagementComponent,
    AddUpdateDIYModalComponent,

  ],
  imports: [
    SharedModule,
    DIYRoutingModule,
    SharedPaginationModule,
    NgxLoadingModule,
    FormsModule
  ],
  providers: [
  	AddUpdateDIYModalComponent
  ],
})
export class DIYModule {}
