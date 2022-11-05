import { NgModule } from "@angular/core";
import { CustomMultiSelectComponent } from "./custom-multi-select.component";
import { FormsModule }   from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [CustomMultiSelectComponent],
    imports     : [CommonModule,FormsModule],
    exports     : [CustomMultiSelectComponent],
})

export class CustomMultiSelectModule {}