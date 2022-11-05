import { NgModule } from '@angular/core';
import { AboutUsManagementComponent } from './about-us/about-us-management/about-us-management.component';
import { SharedModule } from '../shared/shared.module';
import { SharedPaginationModule } from 'src/app/shared-components/shared-pagination/shared-pagination.module';
import { AboutUsRoutingModule } from './about-us-routing.module';
import { NgxLoadingModule } from 'ngx-loading';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AboutUsManagementComponent
  ],
  imports: [
    SharedModule,
    AboutUsRoutingModule,
    SharedPaginationModule,
    NgxLoadingModule,
    FormsModule
  ],
  providers: [],
})
export class AboutUsModule { }
