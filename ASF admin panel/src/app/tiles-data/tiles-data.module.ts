import { NgModule } from '@angular/core';
import { TilesDataManagementComponent } from './tiles-data/tiles-data-management/tiles-data-management.component';
import { SharedModule } from '../shared/shared.module';
import { SharedPaginationModule } from 'src/app/shared-components/shared-pagination/shared-pagination.module';
import { TilesDataRoutingModule } from './tiles-data-routing.module';
import { AddUpdateTilesDataModalComponent } from './tiles-data/tiles-data-management/add-update-tiles-data/add-update-tiles-data.component';
import { NgxLoadingModule } from 'ngx-loading';
import { FormsModule } from '@angular/forms';
import { NgxSummernoteModule } from 'ngx-summernote';
import { DropdownModule } from 'primeng/dropdown';
@NgModule({
  declarations: [
    TilesDataManagementComponent,
    AddUpdateTilesDataModalComponent,

  ],
  imports: [
    SharedModule,
    TilesDataRoutingModule,
    SharedPaginationModule,
    NgxLoadingModule,
    NgxSummernoteModule,
    FormsModule,
    DropdownModule
  ],
  providers: [
  	AddUpdateTilesDataModalComponent
  ],
})
export class TilesDataModule {}
