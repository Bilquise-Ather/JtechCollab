import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { SettingsComponent } from './settings/settings.component';
// import { ProfileSettingsComponent } from './settings/profile-settings/profile-settings.component';
// import { ProfileManagementComponent } from './settings/profile-settings/profile-management/profile-management.component';
import { SeoSettingComponent } from './seo-settings/seo-settings.component';
import { ContactUsSeoManagementComponent } from '../contact-us-seo/contact-us-seo-management/contact-us-seo-management.component';
import { FaqsSeoManagementComponent } from '../faqs-seo/faqs-seo-management/faqs-seo-management.component';
import { ResourceSeoSettingManagementComponent } from '../resource-seo-setting/resource-seo-setting-management/resource-seo-setting-management.component';
import { DIYSeoManagementComponent } from '../DIY-seo/DIY-seo-management/DIY-seo-management.component';
import { CEUSeoManagementComponent } from '../CEU-seo/CEU-seo-management/CEU-seo-management.component';
import { ProjectSeoManagementComponent } from '../project-seo/project-seo-management/project-seo-management.component';
import { GallerySeoManagementComponent } from '../gallery-seo/gallery-seo-management/gallery-seo-management.component';
import { SearchSEOManagementComponent } from '../search-seo/search-seo-management/search-seo-management.component';
import { VisualiserSeoManagementComponent } from '../visualiser-seo/visualiser-seo-management/visualiser-seo-management.component';


const routes: Routes = [
  {
    path: '', component: SeoSettingComponent,
    children: [
      { path: '', redirectTo: '/seo-settings/faqs-seo', pathMatch: 'full' },
      { path: 'faqs-seo', component: FaqsSeoManagementComponent},
      { path: 'contact-us-seo', component: ContactUsSeoManagementComponent},
      { path: 'resource-seo-setting', component: ResourceSeoSettingManagementComponent},
      { path: 'DIY-seo', component: DIYSeoManagementComponent},
      { path: 'CEU-seo', component: CEUSeoManagementComponent},
      { path: 'project-seo', component: ProjectSeoManagementComponent},
      { path: 'gallery-seo', component: GallerySeoManagementComponent},
      { path: 'search-seo', component: SearchSEOManagementComponent},
      { path: 'visualiser-seo', component: VisualiserSeoManagementComponent},
      // {
      //   path: 'reminder', component: EmailSettingsComponent,
      //   children: [
      //     { path: 'interview', component: InterviewReminderComponent },
      //     { path: '', redirectTo: '/settings/reminder/interview', pathMatch: 'full' },
      //   ]
      // }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SeoSettingRoutingModule { }
