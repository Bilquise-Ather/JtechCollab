import { NgModule } from '@angular/core';
import { CollectionSliderManagementComponent } from './collection-slider/collection-slider-management/collection-slider-management.component';
import { SharedModule } from '../shared/shared.module';
import { SharedPaginationModule } from 'src/app/shared-components/shared-pagination/shared-pagination.module';
import { CollectionSliderRoutingModule } from './collection-slider-routing.module';
import {AddCollectionComponent} from './collection-slider/add-collection/add-collection.component'
import { InputSwitchModule } from 'primeng/inputswitch';
import { NgxLoadingModule } from 'ngx-loading';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
@NgModule({
  declarations: [
    CollectionSliderManagementComponent,
    AddCollectionComponent

  ],
  imports: [
    SharedModule,
    CollectionSliderRoutingModule,
    SharedPaginationModule,
    NgxLoadingModule,
    FormsModule,
    NgSelectModule,
    InputSwitchModule
  ],
  providers: [
    AddCollectionComponent
  ],
})
export class CollectionSliderModule {}
