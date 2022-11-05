import { NgModule } from '@angular/core';
import { ContactusManagementComponent } from './contact-us/contact-us-management/contact-us-management.component';
import { SharedModule } from '../shared/shared.module';
import { SharedPaginationModule } from 'src/app/shared-components/shared-pagination/shared-pagination.module';
import { ContactusRoutingModule } from './contact-us-routing.module';
import { NgxLoadingModule } from 'ngx-loading';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    ContactusManagementComponent
  ],
  imports: [
    SharedModule,
    ContactusRoutingModule,
    SharedPaginationModule,
    NgxLoadingModule,
    FormsModule
  ],
  providers: [],
})
export class ContactusModule {}
