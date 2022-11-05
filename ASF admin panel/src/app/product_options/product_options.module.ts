import { NgModule } from '@angular/core';
import { ProductOptionsManagementComponent } from './product_options-management/product_options-management.component';
import { AddProductOptionsComponent } from './add-product_options/add-product_options.component';
import { AddColorModalComponent } from './add-color-modal/add-color-modal.component';
import { SharedModule } from '../shared/shared.module';
import { SharedPaginationModule } from 'src/app/shared-components/shared-pagination/shared-pagination.module';
import { ProductOptionsRoutingModule } from './product_options-routing.module';
import { NgxLoadingModule } from 'ngx-loading';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { DropdownModule } from 'primeng/dropdown';
import { InputSwitchModule } from 'primeng/inputswitch';
@NgModule({
  declarations: [
    ProductOptionsManagementComponent,
    AddProductOptionsComponent,
    AddColorModalComponent

  ],
  imports: [
    SharedModule,
    ProductOptionsRoutingModule,
    SharedPaginationModule,
    NgxLoadingModule,
    FormsModule,
    NgSelectModule,
    DropdownModule,
    InputSwitchModule
  ],
  providers: [
    AddProductOptionsComponent
  ],
})
export class ProductOptionsModule { }
