import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseModalComponent } from 'src/app/modals/base-modal.component';
import { SliderService } from 'src/app/services/slider.service';
import { TilesService } from 'src/app/services/tiles.service';
import { ToastMessageService } from 'src/app/services/toast-message.service';
import { CommonHelper } from 'src/app/helpers/common.helper';
import { DomSanitizer } from '@angular/platform-browser';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { environment } from "src/environments/environment";
@Component({
  selector: 'add-update-tiles-data',
  templateUrl: './add-update-tiles-data.template.html',
  styleUrls: ['./add-update-tiles-data.component.css']
})

export class AddUpdateTilesDataModalComponent extends BaseModalComponent implements OnInit {

  base_url = environment.url;
  loading: boolean = false;
  decision: string = '';
  dialogType: string = "";
  slider_obj: any;
  dialogResult: any;
  config = {
    placeholder: '',
    tabsize: 2,
    height: '200px',
    uploadImagePath: '/api/upload',
    toolbar: [
      ['misc', ['codeview', 'undo', 'redo']],
      ['style', ['bold', 'italic', 'underline', 'clear']],
      ['font', ['bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript', 'clear']],
      ['fontsize', ['fontsize']],
      ['para', ['style', 'ul', 'ol', 'paragraph', 'height']],
      ['insert', ['table', 'hr']]
    ],
    fontNames: ['Helvetica', 'Arial', 'Arial Black', 'Comic Sans MS', 'Courier New', 'Roboto', 'Times']
  }
  main_product_list = []
  newImageUploaded: boolean = false;
  @ViewChild('sliderImageFile') sliderImageFile: any;
  constructor(public modalRef: BsModalRef, private _toastMessageService: ToastMessageService, private tilesService: TilesService,
    private commonHelper: CommonHelper, private SliderService: SliderService, private modalService: BsModalService, private sanitizer: DomSanitizer) { super(modalRef); }

  ngOnInit() {
    this.getAllTilesList()
  }

  onClose() {
    this.decision = '';
    this.close(true);
  }

  done() {
    this.decision = 'done';
    this.close(true);
  }
  getAllTilesList() {
    this.loading = true;
    return new Promise((resolve, reject) => {
      this.tilesService.getAllTilesList({}).subscribe((res: any) => {
        if (res.status == 200 && res.data) {
          this.main_product_list = [];
          this.main_product_list = JSON.parse(JSON.stringify(res.data));
        }
        this.loading = false;
        return resolve(true);
      }, (error) => {
        this.loading = false;
        this.commonHelper.showError(error);
        return resolve(false);
      })
    });
  }

  addSlider() {
    const data = new FormData();
    data.append('slider_image', this.slider_obj.sliderImageFile);
    let params = {
      description: this.slider_obj.description,
      mainproduct: this.slider_obj.mainproduct
    }
    data.append('body', JSON.stringify(params));

    this.loading = true;
    this.tilesService.addTilesData(data).subscribe((res: any) => {
      this.loading = false;
      if (res.status == 200 && res.data) {
        this._toastMessageService.alert("success", "Tiles added successfully.");
        this.dialogResult = res.data;
        this.done();
      }
    }, (error) => {
      this.loading = false;
      this.commonHelper.showError(error);
    })
  }

  updateSlider() {
    const data = new FormData();
    data.append('slider_image', this.slider_obj.sliderImageUrl && !this.slider_obj.sliderImageFile ? 'current' : this.slider_obj.sliderImageFile ? this.slider_obj.sliderImageFile : null
    );
    let params = {
      description: this.slider_obj.description,
      mainproduct: this.slider_obj.mainproduct
    }
    console.log(params)
    data.append('body', JSON.stringify(params));
    this.loading = true;
    this.tilesService.updateTilesData(this.slider_obj._id, data).subscribe((res: any) => {
      this.loading = false;
      if (res.status == 200 && res.data) {
        this._toastMessageService.alert("success", "Tiles updated successfully.");
        this.dialogResult = res.data;
        this.done();
      }
    }, (error) => {
      this.loading = false;
      this.commonHelper.showError(error);
    })
  }
  onTagChange(event) {
    this.slider_obj.tag = event.name;
  }

  clearCLFile() {
    this.sliderImageFile.nativeElement.value = '';
    this.slider_obj.sliderImageUrl = '';
    this.slider_obj.sliderImageFile = null;
    this.newImageUploaded = false;
  }

  onCLUpload(event) {
    if (event.target.files && event.target.files[0]) {
      this.newImageUploaded = true;
      this.slider_obj.sliderImageUrl = this.sanitizer.bypassSecurityTrustUrl(
        URL.createObjectURL(event.target.files[0])
      );
      this.slider_obj.sliderImageFile = event.target.files[0];
    }
  }
}
