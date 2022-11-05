import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectsManagementComponent } from './projects-management/projects-management.component';
import { AddProjectsComponent } from 'src/app/projects/add-projects/add-projects.component';



const routes: Routes = [
  { path: '', component: ProjectsManagementComponent },
  { path: 'edit-project/:id', component: AddProjectsComponent },
  { path: 'add-project', component: AddProjectsComponent },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectsRoutingModule { }
