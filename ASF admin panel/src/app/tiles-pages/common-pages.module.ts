import { NgModule } from '@angular/core';
import { CommonPagesComponent } from './common-pages/common-pages.component';
import { CommonPagesRoutingModule } from './common-pages-routing.module';
import { PhonePipeModule } from 'src/app/pipes/phone.pipe';
import { Tiles19Module } from 'src/app/tiles-19/tiles-19.module';
import { Tiles24Module } from 'src/app/tiles-24/tiles-24.module';
import { TilesDataModule } from 'src/app/tiles-data/tiles-data.module';

@NgModule({
  declarations: [
    CommonPagesComponent
  ],
  imports: [
    CommonPagesRoutingModule,
    PhonePipeModule,
    Tiles19Module,
    Tiles24Module,
    TilesDataModule
  ],
  providers: [
  ],
})
export class CommonPagesModule { }
