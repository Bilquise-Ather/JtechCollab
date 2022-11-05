import { Component, OnInit, Input, Output, EventEmitter,ElementRef } from '@angular/core';
import { remove,findIndex } from 'lodash-es';
declare var $:any;
@Component({
  selector: 'app-create-or-select',
  templateUrl: './custom-create-or-select.component.html',
  styleUrls: ['./custom-create-or-select.component.css']
})

export class CustomCreateorSelectComponent implements OnInit {

	@Input('label') label: string;
	@Input('type') type: string;
  @Input('name') name: string;
	@Input('optionValue') optionValue: string;
  @Input('optionName') optionName: string;
  @Input('value') value: any;
	@Input('disabled') disabled: boolean = false;
	@Input('placeholder') placeholder: string;
  @Input('option_list') option_list: any;
  @Input('isRequired') isRequired: boolean = false;
  @Input('isSubmitted') isSubmitted: boolean = false;

  @Output() onChange = new EventEmitter<string>();

	value_list: any[] = [];
  temp_option_list: any[] = [];
  showDropDown:boolean = false;
  filter_text: any = "";

  constructor(private elRef: ElementRef) { }

  ngOnInit() {

    var self = this;

      self.setInitialData();
      this.temp_option_list = JSON.parse(JSON.stringify(this.option_list))


    $(document).click(function(event){
        var $trigger = $(".multi-select-dropdown-main-wrapper");
        if($trigger !== event.target && !$trigger.has(event.target).length){
          self.onClickDropDownInput(false);
        }
    });
  }

  onClickDropDownInput(isShow) {
    this.showDropDown = isShow;
    $(this.elRef.nativeElement.parentElement).find("#drop_down_wrapper").css("display",(isShow) ? "block" : "none");
  }

  applyFilter() {
    let tempList = (!this.filter_text) ? this.option_list : this.option_list.filter(ol => { return (ol[this.optionValue].toLowerCase().indexOf(this.filter_text.toLowerCase()) != -1)});
    this.temp_option_list = JSON.parse(JSON.stringify(tempList))
    if(this.temp_option_list.length <=0){

      let t = {};
        t[this.optionValue] = 'Add new "'+this.filter_text + '"';
        t[this.optionName] = "new";
      this.temp_option_list.push(JSON.parse(JSON.stringify(t)));
    }
  }

  removeSelection(val) {
    if(val[this.optionValue] && val[this.optionName] && this.value) {
      let findI = findIndex(this.value, v => { return v[this.optionValue] == val[this.optionValue]})
      if(findI != -1) {
        this.value.splice(findI,1);
        this.sendData();
      }
    }
  }

  onPageClick(event) {
    var $trigger = $(".multi-select-dropdown-main-wrapper");
    if($trigger !== event.target && !$trigger.has(event.target).length){
      this.onClickDropDownInput(false);
    }
  }

  setInitialData(){
    if(Array.isArray(this.value)){
      this.value.forEach(i => {
        if(i[this.optionName]) {
          let fData = this.value_list.filter(it => it[this.optionValue] == i[this.optionValue])
          if(fData.length == 0){
            let t = {};
            t[this.optionName] = i[this.optionName];
            t[this.optionValue] = i[this.optionValue];
            this.value_list.push(t);
          }
        }
      })
    }

    let tempO = {};
    tempO[this.optionName] = "";
    tempO[this.optionValue] = "";
    this.onChangeSelection(tempO,null);
    /*if(this.type == "scene_mood_selection") {
      $(".un-select-list").css({"position":"unset"});
    }*/
  }

  validate(item){
    let fData = this.value.filter(it => it[this.optionName] == item[this.optionName])
    if(fData.length == 0){
      return false;
    }else{
      return true;
    }
  }

  ngOnChanges(changeRecord: any) {
    if(!this.filter_text && this.temp_option_list.length != this.option_list.length) {
      this.temp_option_list = JSON.parse(JSON.stringify(this.option_list));
    }
    if(changeRecord && changeRecord.value && changeRecord.value.currentValue && changeRecord.value.currentValue.length == 0){
      this.value_list = [];
    } else if(changeRecord && changeRecord.value && changeRecord.value.currentValue && changeRecord.value.currentValue.length != 0){
      this.value_list = changeRecord.value.currentValue.map(v => {
        let t = {};
        t[this.optionName] = v[this.optionName] ? v[this.optionName] : 0;
        t[this.optionValue] = v[this.optionName]? v[this.optionValue] : 'Add new "'+v[this.optionValue]+'"';
        return t;
      });
    }

  }

  onChangeSelection(option, index) {
    if(option[this.optionValue] && option[this.optionName] && this.value) {
      let findI = findIndex(this.value, v => { return v[this.optionValue] == option[this.optionValue]})
      this.value = []
      if(findI == -1) {
        this.value.push(option);
      } else {
        this.value.splice(findI,1);
      }

      this.onClickDropDownInput(false);
    }
    this.value_list = this.value;

    return this.value;
  }

  sendData() {
    // [{value: ,name: }
    let newValue = Array.isArray(this.value) ? JSON.parse(JSON.stringify(this.value)) : [];
    if(newValue.length > 0){
    if(newValue[0][this.optionValue].startsWith("Add new")) {
      newValue = Array.isArray(this.value) ? JSON.parse(JSON.stringify([{id:0,name:this.filter_text}])) : [];
      this.onChange.emit(newValue);
    }else{
      let newValue = Array.isArray(this.value) ? JSON.parse(JSON.stringify(this.value)) : [];
      this.onChange.emit(newValue);
    }
  }else{
    let newValue = Array.isArray(this.value) ? JSON.parse(JSON.stringify(this.value)) : [];
    this.onChange.emit(newValue);
  }

  }
}
