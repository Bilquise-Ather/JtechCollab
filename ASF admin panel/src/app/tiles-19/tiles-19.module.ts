import { NgModule } from '@angular/core';
import { Tiles19ManagementComponent } from './tiles-19-management/tiles-19-management.component';
import { SharedModule } from '../shared/shared.module';
import { SharedPaginationModule } from 'src/app/shared-components/shared-pagination/shared-pagination.module';
import { Tiles19RoutingModule } from './tiles-19-routing.module';
import { NgxLoadingModule } from 'ngx-loading';
import { NgxSummernoteModule } from 'ngx-summernote';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    Tiles19ManagementComponent
  ],
  imports: [
    SharedModule,
    Tiles19RoutingModule,
    SharedPaginationModule,
    NgxLoadingModule,
    FormsModule,
    NgxSummernoteModule,
  ],
  providers: [],
})
export class Tiles19Module {}
