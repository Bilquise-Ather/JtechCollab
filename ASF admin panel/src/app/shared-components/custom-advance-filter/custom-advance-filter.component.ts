import { Component, OnInit, HostListener, Output, EventEmitter, Input } from '@angular/core';

import { ToastMessageService } from 'src/app/services/toast-message.service';
@Component({
  selector: 'app-custom-advance-filter',
  templateUrl: './custom-advance-filter.component.html',
  styleUrls: ['./custom-advance-filter.component.css']
})
export class CustomAdvanceFilterComponent implements OnInit {

  @Input('selectItems') selectItems: any;

  @Output() sendValue = new EventEmitter<any>();
  @Input('filters') filters: any;
  showError: any = 0;
  constructor(private _toastMessageService:ToastMessageService) { }

  ngOnInit() {
    this.filters.push({ selectedfield: "", selectedoperator: "", selectedsearchtext: "" });
  }

  addFilter() {
    if (this.filters.length < this.selectItems.length) {
      this.filters.push({ selectedfield: "", selectedoperator: "", selectedsearchtext: "" });
    }
    else {
      this._toastMessageService.alert("error","Can not add more filter");
    }
  }
  deleteFilter(index) {
    this.filters.splice(index, 1);
    if (this.filters.length < this.selectItems.length) {
      this.showError = 0;
    }
    if(this.filters.length == 0){
      this.filters.push({ selectedfield: "", selectedoperator: "", selectedsearchtext: "" });
    }
    this.applyFilter();
  }
  fieldChange(event, tab) {
    let tempData = this.selectItems.filter((filter: any) => filter.fieldID == event.value)[0]
    tab.operator = tempData.operator
    tab.values = tempData.values ? tempData.values : []
    tab.fieldType = tempData.fieldType
    tab.returntype = tempData.returnValuesType
  }
  applyFilter() {
    let temp = this.filters.map((item: any) => { return { field: item.selectedfield, operator: item.selectedoperator, value: item.returntype == "array" ?  Array.isArray(item.selectedsearchtext) ? item.selectedsearchtext : [] : "" } });
    temp = temp.filter((filter: any) => filter.field && filter.operator)
    if (temp.length > 0) {
      this.sendValue.emit(temp);
    }
  }
  resetFilter() {
    this.filters = []
    this.sendValue.emit({ reset: 1 })
  }
}
