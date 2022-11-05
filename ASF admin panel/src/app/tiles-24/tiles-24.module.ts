import { NgModule } from '@angular/core';
import { Tiles24ManagementComponent } from './tiles-24-management/tiles-24-management.component';
import { SharedModule } from '../shared/shared.module';
import { SharedPaginationModule } from 'src/app/shared-components/shared-pagination/shared-pagination.module';
import { Tiles24RoutingModule } from './tiles-24-routing.module';
import { NgxLoadingModule } from 'ngx-loading';
import { NgxSummernoteModule } from 'ngx-summernote';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    Tiles24ManagementComponent
  ],
  imports: [
    SharedModule,
    Tiles24RoutingModule,
    SharedPaginationModule,
    NgxLoadingModule,
    FormsModule,
    NgxSummernoteModule,
  ],
  providers: [],
})
export class Tiles24Module {}
