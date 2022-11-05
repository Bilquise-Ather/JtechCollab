import { NgModule } from '@angular/core';
import { ProjectSeoManagementComponent } from './project-seo-management/project-seo-management.component';
import { SharedModule } from '../shared/shared.module';
import { SharedPaginationModule } from 'src/app/shared-components/shared-pagination/shared-pagination.module';
import { ProjectSeoRoutingModule } from './project-seo-routing.module';
import { NgxLoadingModule } from 'ngx-loading';
import { NgxSummernoteModule } from 'ngx-summernote';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    ProjectSeoManagementComponent
  ],
  imports: [
    SharedModule,
    ProjectSeoRoutingModule,
    SharedPaginationModule,
    NgxLoadingModule,
    FormsModule,
    NgxSummernoteModule,
  ],
  providers: [],
})
export class ProjectSeoModule {}
