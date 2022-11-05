import { NgModule } from '@angular/core';
import { RatingComponent } from './rating.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [RatingComponent],
  exports: [RatingComponent],
})
export class RatingModule {}
