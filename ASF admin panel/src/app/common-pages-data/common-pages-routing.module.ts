import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { SettingsComponent } from './settings/settings.component';
// import { ProfileSettingsComponent } from './settings/profile-settings/profile-settings.component';
// import { ProfileManagementComponent } from './settings/profile-settings/profile-management/profile-management.component';
import { CommonPagesComponent } from './common-pages/common-pages.component';
import { PrivacyPolicyManagementComponent } from '../privacy-policy/privacy-policy-management/privacy-policy-management.component';
import { TermsConditionManagementComponent } from '../terms-condition/terms-condition-management/terms-condition-management.component';
import { AboutUsManagementComponent } from '../about-us/about-us/about-us-management/about-us-management.component';
import { FaqsManagementComponent } from '../faqs/faqs/faqs-management/faqs-management.component';
import { FooterWebsiteDataManagementComponent } from '../footer-website-data/footer-website-data-management/footer-website-data-management.component';

const routes: Routes = [
  {
    path: '', component: CommonPagesComponent,
    children: [
      { path: '', redirectTo: '/common-pages/terms-condition', pathMatch: 'full' },
      { path: 'terms-condition', component: TermsConditionManagementComponent },
      { path: 'privacy-policy', component: PrivacyPolicyManagementComponent },
      { path: 'about-us', component: AboutUsManagementComponent },
      { path: 'faqs', component: FaqsManagementComponent },
      { path: 'footer_website_data', component: FooterWebsiteDataManagementComponent },


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
export class CommonPagesRoutingModule { }
