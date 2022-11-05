import { NgModule } from '@angular/core';
import { ResourceManagementComponent } from './resource-management/resource-management.component';
import { AddResourceComponent } from './add-resource/add-resource.component';
import { SharedModule } from '../shared/shared.module';
import { SharedPaginationModule } from 'src/app/shared-components/shared-pagination/shared-pagination.module';
import { ResourceRoutingModule } from './resource-routing.module';
import { NgxLoadingModule } from 'ngx-loading';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [
    ResourceManagementComponent,
    AddResourceComponent
  ],
  imports: [
    SharedModule,
    ResourceRoutingModule,
    SharedPaginationModule,
    NgxLoadingModule,
    FormsModule,
    NgSelectModule
  ],
  providers: [
    AddResourceComponent
  ],
})
export class ResourceModule {}
