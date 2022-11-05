import { NgModule } from '@angular/core';
import { ResourseSeoComponent } from './resource-page/resource-page.component';
import { ResourseSeoRoutingModule } from './resource-page-routing.module';
import { PhonePipeModule } from 'src/app/pipes/phone.pipe';


@NgModule({
  declarations: [
    ResourseSeoComponent
  ],
  imports: [
    ResourseSeoRoutingModule,
    PhonePipeModule
  ],
  providers: [
  ],
})
export class ResourceSeoModule {}
