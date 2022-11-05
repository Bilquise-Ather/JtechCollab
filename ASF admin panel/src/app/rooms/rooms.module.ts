import { NgModule } from '@angular/core';
import { RoomsManagementComponent } from './rooms-management/rooms-management.component';
import { SharedModule } from '../shared/shared.module';
import { SharedPaginationModule } from 'src/app/shared-components/shared-pagination/shared-pagination.module';
import { RoomsRoutingModule } from './rooms-routing.module';
import { AddUpdateRoomsModalComponent } from './rooms-management/add-update-rooms-modal/add-update-rooms-modal.component';
import { NgxLoadingModule } from 'ngx-loading';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    RoomsManagementComponent,
    AddUpdateRoomsModalComponent,

  ],
  imports: [
    SharedModule,
    RoomsRoutingModule,
    SharedPaginationModule,
    NgxLoadingModule,
    FormsModule
  ],
  providers: [
  	AddUpdateRoomsModalComponent
  ],
})
export class RoomsModule {}
