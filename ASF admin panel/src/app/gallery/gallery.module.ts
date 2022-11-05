import { NgModule } from '@angular/core';
import { GalleryManagementComponent } from './gallery-management/gallery-management.component';
import { SharedModule } from '../shared/shared.module';
import { SharedPaginationModule } from 'src/app/shared-components/shared-pagination/shared-pagination.module';
import { GalleryRoutingModule } from './gallery-routing.module';
import { AddUpdateGalleryModalComponent } from './gallery-management/add-update-gallery-modal/add-update-gallery-modal.component';
import { NgxLoadingModule } from 'ngx-loading';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
@NgModule({
  declarations: [
    GalleryManagementComponent,
    AddUpdateGalleryModalComponent,

  ],
  imports: [
    SharedModule,
    GalleryRoutingModule,
    SharedPaginationModule,
    NgxLoadingModule,
    DropdownModule,
    FormsModule
  ],
  providers: [
    AddUpdateGalleryModalComponent
  ],
})
export class GalleryModule { }
