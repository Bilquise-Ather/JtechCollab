import { NgModule } from '@angular/core';
import { SeoSettingComponent } from './seo-settings/seo-settings.component';
import { SeoSettingRoutingModule } from './seo-settings-routing.module';
import { PhonePipeModule } from 'src/app/pipes/phone.pipe';


@NgModule({
  declarations: [
    SeoSettingComponent
  ],
  imports: [
    SeoSettingRoutingModule,
    PhonePipeModule
  ],
  providers: [
  ],
})
export class SeoSettingModule {}
