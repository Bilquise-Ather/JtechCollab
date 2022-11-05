import { NgModule } from '@angular/core';
import { ProductOptionPageComponent } from './products-options-pages/products-options-pages.component';
import { ProductOptionPageRoutingModule } from './products-options-pages-routing.module';
import { PhonePipeModule } from 'src/app/pipes/phone.pipe';


@NgModule({
  declarations: [
    ProductOptionPageComponent
  ],
  imports: [
    ProductOptionPageRoutingModule,
    PhonePipeModule
  ],
  providers: [
  ],
})
export class ProductOptionPageModule {}
