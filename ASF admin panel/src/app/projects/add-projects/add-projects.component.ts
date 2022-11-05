import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from "src/environments/environment";
import { DomSanitizer } from '@angular/platform-browser';
import { CollectionService } from 'src/app/services/Collection.service';
import { ProductOptionsService } from 'src/app/services/product_options.service';
import { CommonService } from 'src/app/services/common.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CommonHelper } from 'src/app/helpers/common.helper';
import { AddColorModalComponent } from 'src/app/products/add-color-modal/add-color-modal.component';
import { Subscription, Subject } from 'rxjs';
import { ToastMessageService } from 'src/app/services/toast-message.service';
import { findIndex } from 'lodash-es';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'add-projects',
  templateUrl: './add-projects.template.html',
  styleUrls: ['./add-projects.component.css']
})

export class AddProjectsComponent implements OnInit {
  product: any = { selectedsize: [], selectedcolor: [], selectedmaterial: [], selectedthickness: [], selectedlength: [], selectedwearlayer: [], selectedpad: [], selectedcore: [] };
  base_url = environment.url;
  urls = [];
  already_uploadedurls = [];
  loading: boolean = false;
  collection_data = []
  category_data = []
  main_product_list = []
  all_projects_list = []
  remaining_url = []
  files = []
  uploaded_files = [];
  type = "add";
  imgclr = false;
  err=false;
  @ViewChild('productImageFile') productImageFile: any;
  @ViewChild('productVideoImageFile') productVideoImageFile: any;
  @ViewChild('productBaseImageFile') productBaseImageFile: any;
  @ViewChild('productcolorImageFile') productcolorImageFile: any;
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
  public modalRef: BsModalRef;
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private productOptionsService: ProductOptionsService, private _toastMessageService: ToastMessageService, private modalService: BsModalService, private sanitizer: DomSanitizer, private collectionService: CollectionService, private commonHelper: CommonHelper, private commonService: CommonService) {
  }

  ngOnInit() {
    this.getAllProductListForSubProduct()
    this.getAllProjects()
    this.product._id = this.activatedRoute.snapshot.paramMap.get('id') ? this.activatedRoute.snapshot.paramMap.get('id') : "";
    if (this.product._id) {
      this.type = 'edit';
      this.getProductData();
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

  getAllProductListForSubProduct() {
    this.loading = true;
    return new Promise((resolve, reject) => {
      this.commonService.getAllProjectCategoryList({}).subscribe((res: any) => {
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
  getProductData() {
    this.loading = true;
    return new Promise((resolve, reject) => {
      this.commonService.getProject({ _id: this.product._id }).subscribe((res: any) => {
        if (res.status == 200 && res.data) {
          this.product = res.data;
          this.product.subproductname = res.data.name;
          this.already_uploadedurls = res.data.option_images;
          // this.product.selectedCategory = res.data.category;
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
    this.product.slug = event.target.value.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')
  }
  onCLUpload(event) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      this.product.productImageUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(event.target.files[0]));
      this.product.productImageFile = event.target.files[0]
      this.product.newImageUploaded = true;
    }
  }
  onVideoCLUpload(event) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      this.product.productVideoImageUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(event.target.files[0]));
      this.product.productVideoImageFile = event.target.files[0]
      this.product.newVideoImageUploaded = true;
    }
  }
  onCLUpload1(event) {
  if (event.target.files && event.target.files[0]) {
    const file = event.target.files[0];
    this.product.productBaseImageUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(event.target.files[0]));
    this.product.productBaseImageFile = event.target.files[0]
    this.product.newBaseImageUploaded = true;
  }
}

  clearCLFile() {
    this.productImageFile.nativeElement.value = '';
    this.product.productImageUrl = '';
    this.product.productImageFile = null;
    this.product.newImageUploaded = false;
  }
  clearVideoCLFile() {
    this.productVideoImageFile.nativeElement.value = '';
    this.product.productVideoImageUrl = '';
    this.product.productVideoImageFile = null;
    this.product.newVideoImageUploaded = false;
  }
  clearCLFile1() {
    this.productBaseImageFile.nativeElement.value = '';
    this.product.productBaseImageUrl = '';
    this.product.productBaseImageFile = null;
    this.product.newBaseImageUploaded = false;
  }

  onClickCancel() {
    this.router.navigate(['/products-options-pages/product_options']);
  }
  clearVideoImageFileFull() {
    this.product.video_image = ""
  }
  clearAwardImageFileFull() {
    this.product.image = ""
  }
  onClickSave() {
    this.remaining_url = this.already_uploadedurls.filter(fl => { return !fl.isdelete }).map((a) => { return a.baseimage })
    const data = new FormData();
    this.uploaded_files = [];

    if (this.product.productImageFile) {
      data.append('image', this.product.productImageFile);
      this.uploaded_files.push({ imageactualname: this.product.productImageFile.name, type: "product" })
    }
    if (this.product.productVideoImageFile) {
      data.append('image', this.product.productVideoImageFile);
      this.uploaded_files.push({ imageactualname: this.product.productVideoImageFile.name, type: "product_video" })
    }

    if (this.product.productBaseImageFile) {
      data.append('image', this.product.productBaseImageFile);
      this.uploaded_files.push({ imageactualname: this.product.productBaseImageFile.name, type: "productbaseimage" })
    }


    for (let index in this.files) {
      if (this.files[index].file && !this.files[index].isdelete) {
        data.append('image', this.files[index].file);
        this.uploaded_files.push({ imageactualname: this.files[index].file.name, type: "productoption" })
      }
    }
    //relatedprojects: this.product.relatedprojects,
    let params = {
      _id: this.product._id,
      categoryid: this.product.categoryid,
      name: this.product.name,
      slug: this.product.slug,
      title: this.product.title,
      video: this.product.video,
      honored: this.product.honored,
      projectdetails: this.product.projectdetails,
      aboutproject: this.product.aboutproject,
      buttontext: this.product.buttontext,
      buttonlink: this.product.buttonlink,
      seotitle: this.product.seotitle,
      video_image:this.product.video_image,
      award_image:this.product.image,
      seodescription: this.product.seodescription,
      seokeyword: this.product.seokeyword,
      uploaded_files: this.uploaded_files,
      remaining_url: this.remaining_url
    }
    data.append("body", JSON.stringify(params));
    this.loading = true;
    this.commonService.addProject(data).subscribe((res: any) => {
      this.loading = false;

      if (res.status == 200 && res.data) {
        this._toastMessageService.alert("success", "Project added successfully.");
        this.router.navigate(['/projects']);
      }
    }, (error) => {
      this.loading = false;
      this.commonHelper.showError(error);
    })

    this.loading = false;

  }
}
