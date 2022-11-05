import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseModalComponent } from 'src/app/modals/base-modal.component';
import { CategoryService } from 'src/app/services/category.service';
import { ToastMessageService } from 'src/app/services/toast-message.service';
import { CommonHelper } from 'src/app/helpers/common.helper';
import { DomSanitizer } from '@angular/platform-browser';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { environment } from "src/environments/environment";
import { CommonService } from 'src/app/services/common.service';
import { findIndex } from 'lodash-es';
@Component({
  selector: 'add-update-category-modal',
  templateUrl: './add-update-category-modal.template.html',
  styleUrls: ['./add-update-category-modal.component.css']
})

export class AddUpdateCategoryModalComponent extends BaseModalComponent implements OnInit {
  all_projects_list = []
  type = "add";
  err=false;
  base_url = environment.url;
  loading: boolean = false;
  decision: string = '';
  dialogType: string = "";
  already_uploadedurls = [];
  slider_obj: any;
  dialogResult: any;
  remaining_url = []
  files = []
  uploaded_files = [];
  urls = [];
  newImageUploaded: boolean = false;
  newAwardImageUploaded: boolean = false;
  newSmallIconImageUploaded: boolean = false;
  newBannerImageUploaded: boolean = false;
  newVideoImageUploaded: boolean = false;
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
  @ViewChild('sliderImageFile') sliderImageFile: any;
  @ViewChild('sliderAwardImageFile') sliderAwardImageFile: any;
  @ViewChild('sliderSmallIconImageFile') sliderSmallIconImageFile: any;
  @ViewChild('sliderBannerImageFile') sliderBannerImageFile: any;
  @ViewChild('sliderVideoImageFile') sliderVideoImageFile: any;
  constructor(public modalRef: BsModalRef, private _toastMessageService: ToastMessageService,
    private commonHelper: CommonHelper, private CategoryService: CategoryService, private commonService: CommonService, private modalService: BsModalService,private sanitizer: DomSanitizer) { super(modalRef); }

  ngOnInit() {
      this.getAllProjects();
  }

  onClose() {
    this.decision = '';
    this.close(true);
  }
  getAllProjects() {
    this.loading = true;
    return new Promise((resolve, reject) => {
      this.commonService.getAllProjectList({}).subscribe((res: any) => {
        if (res.status == 200 && res.data) {
          this.all_projects_list = [];
          this.all_projects_list = JSON.parse(JSON.stringify(res.data));
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
      this.err=false;
    }
  }
  clearOptionalFile(i) {
    this.files[i].isdelete = 1
    this.urls[i].isdelete = 1
    let a= this.urls.filter(fl => { return !fl.isdelete })
    if(a.length > 0){
      this.err=true;
    }
  }
  clearAlreadyUploadedFile(image) {
    let findI = findIndex(this.already_uploadedurls, v => { return v.baseimage == image })
    if (findI != -1) {
      this.already_uploadedurls[findI].isdelete = 1;
    }
    this.remaining_url = this.already_uploadedurls.filter(fl => { return !fl.isdelete }).map((a) => { return a.baseimage })
  }

  generateSlug(event) {
    this.slider_obj.slug = event.target.value.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')
  }
  done() {
    this.decision = 'done';
    this.close(true);
  }

  addCategory() {
    const data = new FormData();
    data.append('category_image',this.slider_obj.sliderImageFile);
    data.append('award_image',this.slider_obj.sliderAwardImageFile);
    data.append('banner_image',this.slider_obj.sliderBannerImageFile);
    data.append('smallicon_image',this.slider_obj.sliderSmallIconImageFile);
    this.uploaded_files = [];
    for (let index in this.files) {
      if (this.files[index].file && !this.files[index].isdelete) {
        data.append('image', this.files[index].file);
        this.uploaded_files.push({ imageactualname: this.files[index].file.name, type: "productoption" })
      }
    }
    if(this.newVideoImageUploaded){
      data.append('video_image',this.slider_obj.sliderVideoImageFile);
    }

    let params = {
      name: this.slider_obj.name,
      slug: this.slider_obj.slug,
      bigtext: this.slider_obj.bigtext,
      video: this.slider_obj.video,
      smalltext: this.slider_obj.smalltext,
      buttontext: this.slider_obj.buttontext,
      buttonlink: this.slider_obj.buttonlink,
      link: this.slider_obj.link,
      relatedprojects: this.slider_obj.relatedprojects,
      seotitle: this.slider_obj.seotitle,
      seodescription: this.slider_obj.seodescription,
      seokeyword: this.slider_obj.seokeyword,
      displayorder: this.slider_obj.displayorder,
      video_image:"default",
      award_image:"default",
      remaining_url: this.remaining_url,
      uploaded_files: this.uploaded_files,
    }
    data.append('body', JSON.stringify(params));
    this.loading = true;
    this.CategoryService.addCategory(data).subscribe((res: any) => {
      this.loading = false;
      if (res.status == 200 && res.data) {
        this._toastMessageService.alert("success", "category added successfully.");
        this.dialogResult = res.data;
        this.done();
      }
    }, (error) => {
      this.loading = false;
      this.commonHelper.showError(error);
    })
  }

  updateCategory(){
    this.remaining_url = this.already_uploadedurls.filter(fl => { return !fl.isdelete }).map((a) => { return a.baseimage })
    const data = new FormData();
    data.append('category_image',this.slider_obj.sliderImageUrl && !this.slider_obj.sliderImageFile ? 'current' : this.slider_obj.sliderImageFile ? this.slider_obj.sliderImageFile : null
    );
    data.append('award_image',this.slider_obj.sliderAwardImageUrl && !this.slider_obj.sliderAwardImageFile ? 'current' : this.slider_obj.sliderAwardImageFile ? this.slider_obj.sliderAwardImageFile : null
    );
    data.append('banner_image',this.slider_obj.sliderBannerImageUrl && !this.slider_obj.sliderBannerImageFile ? 'current' : this.slider_obj.sliderBannerImageFile ? this.slider_obj.sliderBannerImageFile : null
    );
    data.append('smallicon_image',this.slider_obj.sliderSmallIconImageUrl && !this.slider_obj.sliderSmallIconImageFile ? 'current' : this.slider_obj.sliderSmallIconImageFile ? this.slider_obj.sliderSmallIconImageFile : null
    );
    if(this.newVideoImageUploaded){
      data.append('video_image',this.slider_obj.sliderVideoImageUrl && !this.slider_obj.sliderVideoImageFile ? 'current' : this.slider_obj.sliderVideoImageFile ? this.slider_obj.sliderVideoImageFile : null
    );
    }
    this.uploaded_files = [];

    for (let index in this.files) {
      if (this.files[index].file && !this.files[index].isdelete) {
        data.append('image', this.files[index].file);
        this.uploaded_files.push({ imageactualname: this.files[index].file.name, type: "productoption" })
      }
    }
    let params = {
      name: this.slider_obj.name,
      slug: this.slider_obj.slug,
      bigtext: this.slider_obj.bigtext,
      video: this.slider_obj.video,
      link: this.slider_obj.link,
      smalltext: this.slider_obj.smalltext,
      buttontext: this.slider_obj.buttontext,
      buttonlink: this.slider_obj.buttonlink,
      toprelatedprojects: this.slider_obj.toprelatedprojects,
      bottomrelatedprojects: this.slider_obj.bottomrelatedprojects,
      displayorder: this.slider_obj.displayorder,
      video_image:this.slider_obj.video_image,
      award_image:this.slider_obj.award_image,
      seotitle: this.slider_obj.seotitle,
      seodescription: this.slider_obj.seodescription,
      seokeyword: this.slider_obj.seokeyword,
      banner_image:this.slider_obj.banner_image,
      smallicon_image:this.slider_obj.smallicon_image,
      remaining_url: this.remaining_url,
      uploaded_files: this.uploaded_files,
    }
    data.append('body', JSON.stringify(params));
    this.loading = true;
    this.CategoryService.updateCategory(this.slider_obj._id,data).subscribe((res: any) => {
      this.loading = false;
      if (res.status == 200 && res.data) {
        this._toastMessageService.alert("success", "Category updated successfully.");
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

  clearCLAwardFile() {
    this.sliderAwardImageFile.nativeElement.value = '';
    this.slider_obj.sliderAwardImageUrl = '';
    this.slider_obj.sliderAwardImageFile = null;
    this.newAwardImageUploaded = false;
  }
  clearCLSmallIconFile() {
    this.sliderSmallIconImageFile.nativeElement.value = '';
    this.slider_obj.sliderSmallIconImageUrl = '';
    this.slider_obj.sliderSmallIconImageFile = null;
    this.newSmallIconImageUploaded = false;
  }
  clearCLBannerFile() {
    this.sliderBannerImageFile.nativeElement.value = '';
    this.slider_obj.sliderBannerImageUrl = '';
    this.slider_obj.sliderBannerImageFile = null;
    this.newBannerImageUploaded = false;
  }
  onCLAwardUpload(event) {
    if (event.target.files && event.target.files[0]) {
      this.newAwardImageUploaded = true;
      this.slider_obj.sliderAwardImageUrl = this.sanitizer.bypassSecurityTrustUrl(
        URL.createObjectURL(event.target.files[0])
      );
      this.slider_obj.sliderAwardImageFile = event.target.files[0];
    }
  }

  onCLSmallIconUpload(event) {
    if (event.target.files && event.target.files[0]) {
      this.newSmallIconImageUploaded = true;
      this.slider_obj.sliderSmallIconImageUrl = this.sanitizer.bypassSecurityTrustUrl(
        URL.createObjectURL(event.target.files[0])
      );
      this.slider_obj.sliderSmallIconImageFile = event.target.files[0];
    }
  }
  onCLBannerUpload(event) {
    if (event.target.files && event.target.files[0]) {
      this.newBannerImageUploaded = true;
      this.slider_obj.sliderBannerImageUrl = this.sanitizer.bypassSecurityTrustUrl(
        URL.createObjectURL(event.target.files[0])
      );
      this.slider_obj.sliderBannerImageFile = event.target.files[0];
    }
  }

  clearVideoImageFile() {
    this.sliderVideoImageFile.nativeElement.value = '';
    this.slider_obj.sliderVideoImageUrl = '';
    this.slider_obj.sliderVideoImageFile = null;
    this.newVideoImageUploaded = false;
  }
  clearVideoImageFileFull() {
    this.slider_obj.video_image = ""
  }
  clearAwardImageFileFull(){
    this.slider_obj.award_image = ""
  }
  clearSmallImageFileFull(){
    this.slider_obj.smallicon_image = ""
  }
  clearBannerImageFileFull(){
    this.slider_obj.banner_image = ""
  }
  onVideoImageUpload(event) {
    if (event.target.files && event.target.files[0]) {
      this.newVideoImageUploaded = true;
      this.slider_obj.deleteVideoImageUploaded = false;
      this.slider_obj.sliderVideoImageUrl = this.sanitizer.bypassSecurityTrustUrl(
        URL.createObjectURL(event.target.files[0])
      );
      this.slider_obj.sliderVideoImageFile = event.target.files[0];
    }
  }
}
