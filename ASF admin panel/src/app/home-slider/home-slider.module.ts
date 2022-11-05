import { NgModule } from '@angular/core';
import { HomeSliderManagementComponent } from './home-slider/home-slider-management/home-slider-management.component';
import { SharedModule } from '../shared/shared.module';
import { SharedPaginationModule } from 'src/app/shared-components/shared-pagination/shared-pagination.module';
import { HomeSliderRoutingModule } from './home-slider-routing.module';
import { AddUpdateSliderModalComponent } from './home-slider/home-slider-management/add-update-slider-modal/add-update-slider-modal.component';
import { NgxLoadingModule } from 'ngx-loading';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    HomeSliderManagementComponent,
    AddUpdateSliderModalComponent,

  ],
  imports: [
    SharedModule,
    HomeSliderRoutingModule,
    SharedPaginationModule,
    NgxLoadingModule,
    FormsModule
  ],
  providers: [
  	AddUpdateSliderModalComponent
  ],
})
export class HomeSliderModule {}
