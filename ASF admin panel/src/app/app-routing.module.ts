import { AuthGuard } from './auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotfoundComponent } from './notfound/notfound.component';
import { NavbarComponent } from './navbar/navbar.component';

const routes: Routes = [
  { path: 'login', loadChildren: () => import('src/app/login/login.module').then(m => m.LoginModule) },
  { path: 'reset-password', loadChildren: () => import('src/app/reset-password/reset-password.module').then(m => m.ResetPasswordModule) },
  {
    path: '', component: NavbarComponent,
    canActivateChild: [AuthGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadChildren: () => import('src/app/dashboard/dashboard.module').then(m => m.DashboardModule) },
      { path: 'homeslider', loadChildren: () => import('src/app/home-slider/home-slider.module').then(m => m.HomeSliderModule) },
      { path: 'gallery', loadChildren: () => import('src/app/gallery/gallery.module').then(m => m.GalleryModule) },
      { path: 'category', loadChildren: () => import('src/app/category/category.module').then(m => m.CategoryModule) },
      { path: 'icon', loadChildren: () => import('src/app/icon/icon.module').then(m => m.IconModule) },
      { path: 'common-settings', loadChildren: () => import('src/app/common-settings/common-settings.module').then(m => m.CommonSettingsModule) },
      { path: 'collection', loadChildren: () => import('src/app/collection/collection-slider.module').then(m => m.CollectionSliderModule) },
      { path: 'product-category', loadChildren: () => import('src/app/productcategory/productcategory.module').then(m => m.ProductCategoryModule) },
      { path: 'products', loadChildren: () => import('src/app/products/products.module').then(m => m.ProductsModule) },
      { path: 'product_options', loadChildren: () => import('src/app/product_options/product_options.module').then(m => m.ProductOptionsModule) },
      { path: 'contact_us', loadChildren: () => import('src/app/contact-us/contact-us.module').then(m => m.ContactusModule) },
      { path: 'about_us', loadChildren: () => import('src/app/about-us/about-us.module').then(m => m.AboutUsModule) },
      { path: 'privacy_policy', loadChildren: () => import('src/app/privacy-policy/privacy-policy.module').then(m => m.PrivacyPolicyModule) },
      { path: 'terms_condition', loadChildren: () => import('src/app/terms-condition/terms-condition.module').then(m => m.TermsConditionModule) },
      { path: 'faqs', loadChildren: () => import('src/app/faqs/faqs.module').then(m => m.FaqsModule) },
      { path: 'faqs-seo', loadChildren: () => import('src/app/faqs-seo/faqs-seo.module').then(m => m.FaqsSeoModule) },
      { path: 'contact-us-seo', loadChildren: () => import('src/app/contact-us-seo/contact-us-seo.module').then(m => m.ContactUsSeoModule) },
      { path: 'resource', loadChildren: () => import('src/app/resource/resource.module').then(m => m.ResourceModule) },
      { path: 'resource_options', loadChildren: () => import('src/app/resource_options/resource_options.module').then(m => m.ResourceOptionsModule) },
      { path: 'common-pages', loadChildren: () => import('src/app/common-pages-data/common-pages.module').then(m => m.CommonPagesModule) },
      { path: 'tiles-page', loadChildren: () => import('src/app/tiles-pages/common-pages.module').then(m => m.CommonPagesModule) },
      { path: 'seo-settings', loadChildren: () => import('src/app/seo-settings/seo-settings.module').then(m => m.SeoSettingModule) },
      { path: 'products-options-pages', loadChildren: () => import('src/app/products-options-pages/products-options-pages.module').then(m => m.ProductOptionPageModule) },
      { path: 'projects', loadChildren: () => import('src/app/projects/projects.module').then(m => m.ProjectsModule) },
      { path: 'resource-page', loadChildren: () => import('src/app/resource-seo/resource-page.module').then(m => m.ResourceSeoModule) },
      { path: 'footer_website_data', loadChildren: () => import('src/app/footer-website-data/footer-website-data.module').then(m => m.FooterWebsiteDataModule) },
      { path: 'home-seo', loadChildren: () => import('src/app/home-seo/home-seo.module').then(m => m.HomeSeoModule) },
      { path: 'resource-seo-setting', loadChildren: () => import('src/app/resource-seo-setting/resource-seo-setting.module').then(m => m.ResourceSeoSettingModule) },
      { path: 'DIY', loadChildren: () => import('src/app/DIY/DIY.module').then(m => m.DIYModule) },
      { path: 'DIY-seo', loadChildren: () => import('src/app/DIY-seo/DIY-seo.module').then(m => m.DIYSeoModule) },
      { path: 'CEU', loadChildren: () => import('src/app/CEU/CEU.module').then(m => m.CEUModule) },
      { path: 'CEU-seo', loadChildren: () => import('src/app/CEU-seo/CEU-seo.module').then(m => m.CEUSeoModule) },
      { path: 'project-seo', loadChildren: () => import('src/app/project-seo/project-seo.module').then(m => m.ProjectSeoModule) },
      { path: 'search-seo', loadChildren: () => import('src/app/search-seo/search-seo.module').then(m => m.SearchSEOModule) },
      { path: 'gallery-seo', loadChildren: () => import('src/app/gallery-seo/gallery-seo.module').then(m => m.GallerySeoModule) },
      { path: 'visualiser-seo', loadChildren: () => import('src/app/visualiser-seo/visualiser-seo.module').then(m => m.VisualiserSeoModule) },
      { path: 'rooms', loadChildren: () => import('src/app/visualiser/common-pages.module').then(m => m.CommonPagesModule) }
    ]
  },
  { path: '**', component: NotfoundComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
