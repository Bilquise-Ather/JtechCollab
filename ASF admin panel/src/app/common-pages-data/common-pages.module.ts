import { NgModule } from '@angular/core';
import { CommonPagesComponent } from './common-pages/common-pages.component';
import { CommonPagesRoutingModule } from './common-pages-routing.module';
import { PhonePipeModule } from 'src/app/pipes/phone.pipe';


@NgModule({
  declarations: [
    CommonPagesComponent
  ],
  imports: [
    CommonPagesRoutingModule,
    PhonePipeModule
  ],
  providers: [
  ],
})
export class CommonPagesModule { }
