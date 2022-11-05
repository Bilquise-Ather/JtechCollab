import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { SettingsComponent } from './settings/settings.component';
// import { ProfileSettingsComponent } from './settings/profile-settings/profile-settings.component';
// import { ProfileManagementComponent } from './settings/profile-settings/profile-management/profile-management.component';
import { ProductOptionPageComponent } from './products-options-pages/products-options-pages.component';
import { ProductCategoryManagementComponent } from '../productcategory/productcategory/productcategory-management/productcategory-management.component';
import { CollectionSliderManagementComponent } from '../collection/collection-slider/collection-slider-management/collection-slider-management.component';
import { ProductManagementComponent } from '../products/product-management/product-management.component';
import { ProductOptionsManagementComponent } from '../product_options/product_options-management/product_options-management.component';

const routes: Routes = [
  {
    path: '', component: ProductOptionPageComponent,
    children: [
      { path: '', redirectTo: '/products-options-pages/collection', pathMatch: 'full' },
      { path: 'collection', component: CollectionSliderManagementComponent },
      {path: 'product-category', component: ProductCategoryManagementComponent},
      {path: 'products', component:ProductManagementComponent },
      {path: 'product_options', component:ProductOptionsManagementComponent },

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
export class ProductOptionPageRoutingModule { }
