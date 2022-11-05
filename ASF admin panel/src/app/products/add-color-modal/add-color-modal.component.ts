import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseModalComponent } from 'src/app/modals/base-modal.component';
import { ProductCategoryService } from 'src/app/services/productcategory.service';
import { ToastMessageService } from 'src/app/services/toast-message.service';
import { CommonHelper } from 'src/app/helpers/common.helper';
import { DomSanitizer } from '@angular/platform-browser';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
@Component({
  selector: 'add-color-modal',
  templateUrl: './add-color-modal.template.html',
  styleUrls: ['./add-color-modal.component.css']
})

export class AddColorModalComponent extends BaseModalComponent implements OnInit {

  loading: boolean = false;
  decision: string = '';
  dialogType: string = "";
  type: string = "";

  data: any = {};
  dialogResult: any;
  newImageUploaded: boolean = false;
  @ViewChild('sliderImageFile') sliderImageFile: any;
  constructor(public modalRef: BsModalRef, private _toastMessageService: ToastMessageService,
    private commonHelper: CommonHelper, private productCategoryService: ProductCategoryService, private modalService: BsModalService, private sanitizer: DomSanitizer) { super(modalRef); }

  ngOnInit() {

  }

  onClose() {
    this.decision = '';
    this.close(true);
  }

  done() {
    this.decision = 'done';
    this.close(true);
  }

  addSlider() {

    let params = {
      text: this.data.text
    }
    this.dialogResult = params;
    this.done();
    // this.loading = true;
    // this.commonService.addColor(params).subscribe((res: any) => {
    //   this.loading = false;
    //   if (res.status == 200 && res.data) {
    //     this._toastMessageService.alert("success", "Color added successfully.");
    //     this.dialogResult = res.data;
    //     this.done();
    //   }
    // }, (error) => {
    //   this.loading = false;
    //   this.commonHelper.showError(error);
    // })
  }

}
