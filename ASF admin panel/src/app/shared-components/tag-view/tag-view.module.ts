import { NgModule } from '@angular/core';
import { TagViewComponent } from './tag-view.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [TagViewComponent],
  exports: [TagViewComponent],
})
export class TagViewModule {}
