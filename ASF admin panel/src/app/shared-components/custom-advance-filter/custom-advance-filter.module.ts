import { NgModule } from "@angular/core";
import { CustomAdvanceFilterComponent } from  "./custom-advance-filter.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
@NgModule({
    imports: [CommonModule,FormsModule,DropdownModule,MultiSelectModule],
    declarations: [CustomAdvanceFilterComponent],
    exports: [CustomAdvanceFilterComponent]
})
export class CustomAdvanceFilterModule { }
