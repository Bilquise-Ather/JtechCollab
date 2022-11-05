import { NgModule } from '@angular/core';
import { CEUManagementComponent } from './CEU/CEU-management/CEU-management.component';
import { SharedModule } from '../shared/shared.module';
import { SharedPaginationModule } from 'src/app/shared-components/shared-pagination/shared-pagination.module';
import { CEURoutingModule } from './CEU-routing.module';
import { NgxLoadingModule } from 'ngx-loading';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    CEUManagementComponent
  ],
  imports: [
    SharedModule,
    CEURoutingModule,
    SharedPaginationModule,
    NgxLoadingModule,
    FormsModule
  ],
  providers: [],
})
export class CEUModule {}
