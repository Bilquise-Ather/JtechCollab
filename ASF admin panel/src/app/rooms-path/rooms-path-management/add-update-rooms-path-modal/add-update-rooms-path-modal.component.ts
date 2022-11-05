import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseModalComponent } from 'src/app/modals/base-modal.component';
import { RoomPathService } from 'src/app/services/room_path.service';
import { ToastMessageService } from 'src/app/services/toast-message.service';
import { CommonHelper } from 'src/app/helpers/common.helper';
import { DomSanitizer } from '@angular/platform-browser';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CollectionService } from 'src/app/services/Collection.service';
import { environment } from "src/environments/environment";
@Component({
  selector: 'add-update-rooms-path-modal',
  templateUrl: './add-update-rooms-path-modal.template.html',
  styleUrls: ['./add-update-rooms-path-modal.component.css']
})

export class AddUpdateRoomsPathModalComponent extends BaseModalComponent implements OnInit {

  base_url = environment.url;
  loading: boolean = false;
  decision: string = '';
  dialogType: string = "";
  slider_obj: any;
  main_product_list = []
  product_options_list = []
  collection_data = []
  dialogResult: any;
  newImageUploaded: boolean = false;
  @ViewChild('sliderImageFile') sliderImageFile: any;
  constructor(public modalRef: BsModalRef, private _toastMessageService: ToastMessageService,
    private commonHelper: CommonHelper, private RoomPathService: RoomPathService, private collectionService: CollectionService, private modalService: BsModalService,private sanitizer: DomSanitizer) { super(modalRef); }

  ngOnInit() {
    this.getAllRooms();
    this.getAllProductOptions();
    this.getAllCollections();
  }

  onClose() {
    this.decision = '';
    this.close(true);
  }

  done() {
    this.decision = 'done';
    this.close(true);
  }
  getAllProductOptions(){
    this.loading = true;
    return new Promise((resolve, reject) => {
      this.RoomPathService.getAllProductOptions({}).subscribe((res: any) => {
        if (res.status == 200 && res.data) {
          this.product_options_list = [];
          this.product_options_list = JSON.parse(JSON.stringify(res.data));
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

  getAllCollections() {
    this.loading = true;
    return new Promise((resolve, reject) => {
      let params = {
        page: 1,
        limit: 100
      };
      this.collectionService.getAllCollection(params).subscribe((res: any) => {
        if (res.status == 200 && res.data.slides) {
          this.collection_data = [];
          this.collection_data = JSON.parse(JSON.stringify(res.data.slides));
          this.collection_data = this.collection_data.map((a) => { return { _id: a._id, name: a.name } })
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

  getAllRooms() {
    this.loading = true;
    return new Promise((resolve, reject) => {
      this.RoomPathService.getAllRooms({}).subscribe((res: any) => {
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
    data.append('slider_image',this.slider_obj.sliderImageFile);
    let params = {
      room_id: this.slider_obj.room_id,
      productoption_id: this.slider_obj.productoption_id,
      label: this.slider_obj.label,
      collections: this.slider_obj.collections,
    }
    data.append('body', JSON.stringify(params));
    this.loading = true;
    this.RoomPathService.addSlider(data).subscribe((res: any) => {
      this.loading = false;
      if (res.status == 200 && res.data) {
        this._toastMessageService.alert("success", "Room added successfully.");
        this.dialogResult = res.data;
        this.done();
      }
    }, (error) => {
      this.loading = false;
      this.commonHelper.showError(error);
    })
  }

  updateSlider(){
    const data = new FormData();
    data.append('slider_image',this.slider_obj.sliderImageUrl && !this.slider_obj.sliderImageFile ? 'current' : this.slider_obj.sliderImageFile ? this.slider_obj.sliderImageFile : null
    );
    let params = {
      room_id: this.slider_obj.room_id,
      productoption_id: this.slider_obj.productoption_id,
      label: this.slider_obj.label,
      collections: this.slider_obj.collections
    }
    data.append('body', JSON.stringify(params));
    this.loading = true;
    this.RoomPathService.updateSlider(this.slider_obj._id,data).subscribe((res: any) => {
      this.loading = false;
      if (res.status == 200 && res.data) {
        this._toastMessageService.alert("success", "Room updated successfully.");
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
