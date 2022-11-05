import { NgModule } from '@angular/core';
import { ProjectsManagementComponent } from './projects-management/projects-management.component';
import { AddProjectsComponent } from './add-projects/add-projects.component';
import { SharedModule } from '../shared/shared.module';
import { SharedPaginationModule } from 'src/app/shared-components/shared-pagination/shared-pagination.module';
import { ProjectsRoutingModule } from './projects-routing.module';
import { NgxLoadingModule } from 'ngx-loading';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { DropdownModule } from 'primeng/dropdown';
import { InputSwitchModule } from 'primeng/inputswitch';
import { NgxSummernoteModule } from 'ngx-summernote';
@NgModule({
  declarations: [
    ProjectsManagementComponent,
    AddProjectsComponent,

  ],
  imports: [
    SharedModule,
    ProjectsRoutingModule,
    SharedPaginationModule,
    NgxLoadingModule,
    FormsModule,
    NgSelectModule,
    DropdownModule,
    InputSwitchModule,
    NgxSummernoteModule
  ],
  providers: [
    AddProjectsComponent
  ],
})
export class ProjectsModule { }
