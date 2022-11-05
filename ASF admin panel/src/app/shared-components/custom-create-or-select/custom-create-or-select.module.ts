import { NgModule } from "@angular/core";
import { CustomCreateorSelectComponent } from  "./custom-create-or-select.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@NgModule({
    imports: [CommonModule,FormsModule],
    declarations: [CustomCreateorSelectComponent],
    exports: [CustomCreateorSelectComponent]
})
export class CustomCreateorSelectModule { }
