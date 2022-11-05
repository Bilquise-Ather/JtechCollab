import { NgModule } from '@angular/core';
import { CommonPagesComponent } from './common-pages/common-pages.component';
import { CommonPagesRoutingModule } from './common-pages-routing.module';
import { PhonePipeModule } from 'src/app/pipes/phone.pipe';
import { RoomsModule } from 'src/app/rooms/rooms.module';
import { RoomsPathModule } from 'src/app/rooms-path/rooms-path.module';


@NgModule({
  declarations: [
    CommonPagesComponent
  ],
  imports: [
    CommonPagesRoutingModule,
    PhonePipeModule,
    RoomsModule,
    RoomsPathModule
  ],
  providers: [
  ],
})
export class CommonPagesModule { }
