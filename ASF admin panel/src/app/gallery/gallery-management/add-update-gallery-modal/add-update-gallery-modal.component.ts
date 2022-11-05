import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseModalComponent } from 'src/app/modals/base-modal.component';
import { GalleryService } from 'src/app/services/gallery.service';
import { ToastMessageService } from 'src/app/services/toast-message.service';
import { CommonHelper } from 'src/app/helpers/common.helper';
import { CollectionService } from 'src/app/services/Collection.service';
import { DomSanitizer } from '@angular/platform-browser';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { environment } from "src/environments/environment";
@Component({
  selector: 'add-update-gallery-modal',
  templateUrl: './add-update-gallery-modal.template.html',
  styleUrls: ['./add-update-gallery-modal.component.css']
})

export class AddUpdateGalleryModalComponent extends BaseModalComponent implements OnInit {
  collection_data = []
  base_url = environment.url;
  loading: boolean = false;
  decision: string = '';
  dialogType: string = "";
  category_data = []
  slider_obj: any;
  dialogResult: any;
  newImageUploaded: boolean = false;
  @ViewChild('sliderImageFile') sliderImageFile: any;
  constructor(public modalRef: BsModalRef, private _toastMessageService: ToastMessageService,
    private commonHelper: CommonHelper, private GalleryService: GalleryService,private collectionService: CollectionService, private modalService: BsModalService,private sanitizer: DomSanitizer) { super(modalRef); }

  ngOnInit() {
    this.getAllCollections();
  }

  onClose() {
    this.decision = '';
    this.close(true);
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
  done() {
    this.decision = 'done';
    this.close(true);
  }

  addProductCategory() {
    const data = new FormData();
    data.append('productcategory_image',this.slider_obj.sliderImageFile);

    let params = {
      name: this.slider_obj.name,
      link: this.slider_obj.link,
      color: ' ',
      selectedCollection: this.slider_obj.selectedCollection
    }
    data.append('body', JSON.stringify(params));
    this.loading = true;
    this.GalleryService.addGallery(data).subscribe((res: any) => {
      this.loading = false;
      if (res.status == 200 && res.data) {
        this._toastMessageService.alert("success", "Gallery added successfully.");
        this.dialogResult = res.data;
        this.done();

      }
    }, (error) => {
      this.loading = false;
      this.commonHelper.showError(error);
    })
  }
  generateSlug(event) {
    this.slider_obj.slug = event.target.value.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')
  }
  updateProductCategory(){
    const data = new FormData();
    data.append('productcategory_image',this.slider_obj.sliderImageUrl && !this.slider_obj.sliderImageFile ? 'current' : this.slider_obj.sliderImageFile ? this.slider_obj.sliderImageFile : null
    );
    let params = {
      _id: this.slider_obj._id,
      name: this.slider_obj.name,
      link: this.slider_obj.link,
      color: ' ',
      selectedCollection: this.slider_obj.selectedCollection,
    }
    data.append('body', JSON.stringify(params));
    this.loading = true;
    this.GalleryService.updateGallery(this.slider_obj._id,data).subscribe((res: any) => {
      this.loading = false;
      if (res.status == 200 && res.data) {
        this._toastMessageService.alert("success", "Gallery updated successfully.");
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
