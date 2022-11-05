import { NgModule } from '@angular/core';
import { RoomsPathManagementComponent } from './rooms-path-management/rooms-path-management.component';
import { SharedModule } from '../shared/shared.module';
import { SharedPaginationModule } from 'src/app/shared-components/shared-pagination/shared-pagination.module';
import { RoomsPathRoutingModule } from './rooms-path-routing.module';
import { AddUpdateRoomsPathModalComponent } from './rooms-path-management/add-update-rooms-path-modal/add-update-rooms-path-modal.component';
import { NgxLoadingModule } from 'ngx-loading';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
@NgModule({
  declarations: [
    RoomsPathManagementComponent,
    AddUpdateRoomsPathModalComponent,

  ],
  imports: [
    SharedModule,
    RoomsPathRoutingModule,
    SharedPaginationModule,
    NgxLoadingModule,
    FormsModule,
    DropdownModule
  ],
  providers: [
  	AddUpdateRoomsPathModalComponent
  ],
})
export class RoomsPathModule {}
