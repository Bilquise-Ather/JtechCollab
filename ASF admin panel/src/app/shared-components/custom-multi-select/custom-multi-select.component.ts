import { Component, OnInit, Input, Output, EventEmitter, ElementRef} from '@angular/core';
import { remove,findIndex } from 'lodash-es';
import { AddNewTechnologyModalComponent } from 'src/app/modals/add-new-technology-modal/add-new-technology-modal.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subscription, Subject } from 'rxjs';
declare var $:any;
@Component({
  selector: 'app-custom-multi-select',
  templateUrl: './custom-multi-select.component.html',
  styleUrls: ['./custom-multi-select.component.css']
})
export class CustomMultiSelectComponent implements OnInit {

	@Input('label') label: string;
	@Input('type') type: string;
  @Input('name') name: string;
	@Input('optionValue') optionValue: string;
  @Input('optionName') optionName: string;
  @Input('value') value: any;
	@Input('disabled') disabled: boolean = false;
	@Input('placeholder') placeholder: string;
  @Input('option_list') option_list: any;
  @Input('show_add_button') show_add_button: any;
  @Input('add_btn_text') add_btn_text: any;

  @Input('isRequired') isRequired: boolean = false;
  @Input('isSubmitted') isSubmitted: boolean = false;

  @Output() onChange = new EventEmitter<string>();

	value_list: any[] = [];
  temp_option_list: any[] = [];
  showDropDown:boolean = false;
  filter_text: any = "";
  public modalRef: BsModalRef;
  constructor(private elRef: ElementRef,private modalService: BsModalService) { }

  ngOnInit() {
    var self = this;
    setTimeout(()=>{
      self.setInitialData();
    },1000);

    setTimeout(() => {
      this.temp_option_list = JSON.parse(JSON.stringify(this.option_list))
    },400);

    $(document).click(function(event){
        var $trigger = $(".multi-select-dropdown-main-wrapper");
        if($trigger !== event.target && !$trigger.has(event.target).length){
          self.onClickDropDownInput(false);
          self.onBlur();
        }
    });
  }

  onClickDropDownInput(isShow) {
    //alert("is - "+isShow);
    /*this.showDropDown = isShow;
    $(this.elRef.nativeElement.parentElement).find("#drop_down_wrapper").css("display",(isShow) ? "block" : "none");*/
    //$("#drop_down_wrapper").css("display",(isShow) ? "block" : "none");
  }
  onClickAddNew(){
    this.modalRef = this.modalService.show(AddNewTechnologyModalComponent, {class: 'add-update-import-modal',backdrop: 'static', keyboard: false});
    this.modalRef.content.decision = '';
    this.modalRef.content.pageTitle = this.add_btn_text;

    var tempSubObj: Subscription = this.modalService.onHide.subscribe(() => {
      if(this.modalRef.content.decision == "done") {
        let t = {};
        t[this.optionName] = this.modalRef.content.dialogResult;
        t[this.optionValue] = this.modalRef.content.dialogResult;
        let findI = findIndex(this.value, v => { return v[this.optionValue] == this.modalRef.content.dialogResult})
        if(findI == -1) {
          this.value.push(t);
          this.option_list.push(t)
          this.value_list.push(t)
          this.temp_option_list = JSON.parse(JSON.stringify(this.option_list))
          this.filter_text = ""
          this.applyFilter()
        }

      }
      tempSubObj.unsubscribe();
    });
  }
  onFocus() {
    this.showDropDown = true;
    $(this.elRef.nativeElement.parentElement).find("#drop_down_wrapper").css("display","block");
  }

  onBlur() {
    this.showDropDown = false;
    $(this.elRef.nativeElement.parentElement).find("#drop_down_wrapper").css("display","none");
  }

  applyFilter() {
    let tempList = (!this.filter_text) ? this.option_list : this.option_list.filter(ol => { return (ol[this.optionName].toLowerCase().indexOf(this.filter_text.toLowerCase()) != -1)});
    this.temp_option_list = JSON.parse(JSON.stringify(tempList))
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
      this.onBlur();
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
    let fData = this.value.filter(it => it[this.optionValue] == item[this.optionValue])

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
        t[this.optionName] = v[this.optionName];
        t[this.optionValue] = v[this.optionValue];
        return t;
      });
    }
  }

  onChangeSelection(option, index) {
    if(option[this.optionValue] && option[this.optionName] && this.value) {
      let findI = findIndex(this.value, v => { return v[this.optionValue] == option[this.optionValue]})
      if(findI == -1) {
        this.value.push(option);
      } else {
        this.value.splice(findI,1);
      }
    }
    return this.value;
  }

  sendData() {
    let newValue = Array.isArray(this.value) ? JSON.parse(JSON.stringify(this.value)) : [];
    this.onChange.emit(newValue);
  }
}
