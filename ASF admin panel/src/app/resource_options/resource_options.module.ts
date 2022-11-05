import { NgModule } from '@angular/core';
import { ResourceOptionsManagementComponent } from './resource_options-management/resource_options-management.component';
import { AddResourceOptionsComponent } from './add-resource_options/add-resource_options.component';
import { SharedModule } from '../shared/shared.module';
import { SharedPaginationModule } from 'src/app/shared-components/shared-pagination/shared-pagination.module';
import { ResourceOptionsRoutingModule } from './resource_options-routing.module';
import { NgxLoadingModule } from 'ngx-loading';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
  declarations: [
    ResourceOptionsManagementComponent,
    AddResourceOptionsComponent

  ],
  imports: [
    SharedModule,
    ResourceOptionsRoutingModule,
    SharedPaginationModule,
    NgxLoadingModule,
    FormsModule,
    NgSelectModule,
    DropdownModule
  ],
  providers: [
    AddResourceOptionsComponent
  ],
})
export class ResourceOptionsModule {}
