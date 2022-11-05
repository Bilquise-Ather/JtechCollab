import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from "src/environments/environment";
import { DomSanitizer } from '@angular/platform-browser';
import { CollectionService } from 'src/app/services/Collection.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CommonHelper } from 'src/app/helpers/common.helper';
import { Subscription, Subject } from 'rxjs';
import { ToastMessageService } from 'src/app/services/toast-message.service';
import { findIndex } from 'lodash-es';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'add-collection',
  templateUrl: './add-collection.template.html',
  styleUrls: ['./add-collection.component.css']
})

export class AddCollectionComponent implements OnInit {
  collection: any = {};
  base_url = environment.url;
  urls = [];
  already_uploadedurls = [];
  loading: boolean = false;
  remaining_url = []
  files = []
  uploaded_files = [];
  type = "add";

  @ViewChild('collectionImageFile') collectionImageFile: any;
  @ViewChild('collectionbanenrImageFile') collectionbanenrImageFile: any;
  @ViewChild('productcolorImageFile') productcolorImageFile: any;
  public modalRef: BsModalRef;
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private _toastMessageService: ToastMessageService, private modalService: BsModalService, private sanitizer: DomSanitizer, private collectionService: CollectionService, private commonHelper: CommonHelper) {
  }

  ngOnInit() {

    this.collection._id = this.activatedRoute.snapshot.paramMap.get('id') ? this.activatedRoute.snapshot.paramMap.get('id') : "";
    if (this.collection._id) {
      this.type = 'edit';
      this.getCollectionData();
    }
  }
  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        this.files.push({ file: event.target.files[i], type: "optional" })
        var reader = new FileReader();
        reader.onload = (event: any) => {
          this.urls.push({ url: event.target.result });
        }
        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }
  clearOptionalFile(i) {
    this.files[i].isdelete = 1
    this.urls[i].isdelete = 1
  }

  clearAlreadyUploadedFile(image) {
    let findI = findIndex(this.already_uploadedurls, v => { return v.baseimage == image })
    if (findI != -1) {
      this.already_uploadedurls[findI].isdelete = 1;
    }
    this.remaining_url = this.already_uploadedurls.filter(fl => { return !fl.isdelete }).map((a) => { return a.baseimage })

  }

  getCollectionData() {
    this.loading = true;
    return new Promise((resolve, reject) => {
      this.collectionService.getSingleCollectionData({ _id: this.collection._id }).subscribe((res: any) => {
        if (res.status == 200 && res.data) {
          this.collection = res.data;
          this.collection.categoryview =  this.collection.categoryview == "false" ? false : true
          this.collection.showinvisualiser =  this.collection.showinvisualiser && this.collection.showinvisualiser == true ? true : false

          this.already_uploadedurls = res.data.room_images;
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



  generateSlug(event) {
    this.collection.slug = event.target.value.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')
  }

  onCLUpload(event) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      this.collection.collectionImageUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(event.target.files[0]));
      this.collection.collectionImageFile = event.target.files[0]
      this.collection.newImageUploaded = true;
    }
  }
  onBannerCLUpload(event) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      this.collection.collectionbannerImageUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(event.target.files[0]));
      this.collection.collectionbannerImageFile = event.target.files[0]
      this.collection.newbannerImageUploaded = true;
    }
  }

  clearBannerCLFile() {
    this.collectionImageFile.nativeElement.value = '';
    this.collection.collectionbannerImageUrl = '';
    this.collection.collectionbannerImageFile = null;
    this.collection.newbannerImageUploaded = false;
  }

  clearCLFile() {
    this.collectionImageFile.nativeElement.value = '';
    this.collection.collectionImageUrl = '';
    this.collection.collectionImageFile = null;
    this.collection.newImageUploaded = false;
  }

  onClickCancel() {
    this.router.navigate(['/products-options-pages/collection']);
  }
  onClickSave() {
    this.remaining_url = this.already_uploadedurls.filter(fl => { return !fl.isdelete }).map((a) => { return a.baseimage })
    const data = new FormData();
    this.uploaded_files = [];
    if (this.collection.collectionImageFile) {
      data.append('image', this.collection.collectionImageFile);
      this.uploaded_files.push({ imageactualname: this.collection.collectionImageFile.name, type: "collectionimage" })
    }
    if (this.collection.collectionbannerImageFile) {
      data.append('image', this.collection.collectionbannerImageFile);
      this.uploaded_files.push({ imageactualname: this.collection.collectionbannerImageFile.name, type: "collectionbannerimage" })
    }
    for (let index in this.files) {
      if (this.files[index].file && !this.files[index].isdelete) {
        data.append('image', this.files[index].file);
        this.uploaded_files.push({ imageactualname: this.files[index].file.name, type: "roomimage" })
      }
    }
    let params = {
      _id: this.collection._id,
      name: this.collection.name,
      slug: this.collection.slug,
      text: this.collection.text,
      seotitle: this.collection.seotitle,
      seodescription: this.collection.seodescription,
      seokeyword: this.collection.seokeyword,
      link: this.collection.link,
      videolink: this.collection.videolink,
      categoryview: this.collection.categoryview,
      showinvisualiser: this.collection.showinvisualiser,
      uploaded_files: this.uploaded_files,
      remaining_url: this.remaining_url
    }
    data.append("body", JSON.stringify(params));
    this.loading = true;
    this.collectionService.addCollection(data).subscribe((res: any) => {
      this.loading = false;

      if (res.status == 200 && res.data) {
        this._toastMessageService.alert("success", "Collection added successfully.");
        this.router.navigate(['/products-options-pages/collection']);
      }
    }, (error) => {
      this.loading = false;
      this.commonHelper.showError(error);
    })

    this.loading = false;

  }
}
