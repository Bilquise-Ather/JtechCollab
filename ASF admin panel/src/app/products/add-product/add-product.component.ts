import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from "src/environments/environment";
import { DomSanitizer } from '@angular/platform-browser';
import { CollectionService } from 'src/app/services/Collection.service';
import { ProductService } from 'src/app/services/product.service';
import { CommonService } from 'src/app/services/common.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CommonHelper } from 'src/app/helpers/common.helper';
import { ToastMessageService } from 'src/app/services/toast-message.service';
import { ActivatedRoute, Router } from '@angular/router';
import { findIndex } from 'lodash-es';

@Component({
  selector: 'add-product',
  templateUrl: './add-product.template.html',
  styleUrls: ['./add-product.component.css']
})

export class AddProductComponent implements OnInit {
  product: any = { colors: [] };
  base_url = environment.url;
  loading: boolean = false;
  collection_data = []
  urls = [];
  already_uploadedurls = [];
  remaining_url = []
  uploaded_files = [];
  category_data = []
  color_data = []
  thickness_data = []
  length_data = []
  files = []
  material_data = []
  type = "add";
  imgclr = false;
  err=false;
  @ViewChild('productImageFile') productImageFile: any;
  @ViewChild('productcolorImageFile') productcolorImageFile: any;
  public modalRef: BsModalRef;
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private productService: ProductService, private _toastMessageService: ToastMessageService, private modalService: BsModalService, private sanitizer: DomSanitizer, private collectionService: CollectionService, private commonHelper: CommonHelper, private commonService: CommonService) {
  }

  ngOnInit() {


    this.product._id = this.activatedRoute.snapshot.paramMap.get('id') ? this.activatedRoute.snapshot.paramMap.get('id') : "";
    if (this.product._id) {
      this.type = 'edit';
      this.getProductData();
    }
    this.getAllCollections();
    this.getAllCategory();
    // this.getAllColor();
    // this.getAllThickness();
    // this.getAllMaterial();
    // this.getAllLength();
    // this.product.selectedCategory = ["60c9f7b6ca101834202a8b30","60c9f78fca101834202a8b2f"]
  }
  getProductData() {
    this.loading = true;
    return new Promise((resolve, reject) => {
      this.commonService.getProduct({ _id: this.product._id }).subscribe((res: any) => {
        if (res.status == 200 && res.data) {
          this.product = res.data;
          this.product.productname = res.data.name;
          this.already_uploadedurls = res.data.option_images ? res.data.option_images : [];
          this.product.selectedCollection = res.data.collections;
          this.product.selectedCategory = res.data.category;
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

  getAllCategory() {
    this.loading = true;
    return new Promise((resolve, reject) => {
      let params = {
        page: 1,
        limit: 100
      };
      this.commonService.getAllProductCategory(params).subscribe((res: any) => {
        if (res.status == 200 && res.data) {
          this.category_data = [];
          this.category_data = JSON.parse(JSON.stringify(res.data));
          this.category_data = this.category_data.map((a) => { return { _id: a._id, name: a.name } })
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
  // onTagChange(event, color, i) {
  //   if (color == "color") {
  //     this.product.colors[i].errorselectedcolor = this.product.colors[i].selectedcolor.length > 0 ? false : true
  //   } else if (color == "thickness") {
  //     this.product.colors[i].errorselectedthickness = this.product.colors[i].selectedthickness.length > 0 ? false : true
  //   } else if (color == "length") {
  //     this.product.colors[i].errorselectedlength = this.product.colors[i].selectedlength.length > 0 ? false : true
  //   } else if (color == "material") {
  //     this.product.colors[i].errorselectedmaterial = this.product.colors[i].selectedmaterial.length > 0 ? false : true
  //   }

  // }
  // getAllColor() {
  //   this.loading = true;
  //   return new Promise((resolve, reject) => {
  //     this.commonService.getAllColors({}).subscribe((res: any) => {
  //       if (res.status == 200 && res.data) {
  //         this.color_data = [];
  //         this.color_data = JSON.parse(JSON.stringify(res.data));

  //       }
  //       this.loading = false;
  //       return resolve(true);
  //     }, (error) => {
  //       this.loading = false;
  //       this.commonHelper.showError(error);
  //       return resolve(false);
  //     })
  //   });
  // }
  // getAllThickness() {
  //   this.loading = true;
  //   return new Promise((resolve, reject) => {
  //     this.commonService.getAllThickness({}).subscribe((res: any) => {
  //       if (res.status == 200 && res.data) {
  //         this.thickness_data = [];
  //         this.thickness_data = JSON.parse(JSON.stringify(res.data));
  //       }
  //       this.loading = false;
  //       return resolve(true);
  //     }, (error) => {
  //       this.loading = false;
  //       this.commonHelper.showError(error);
  //       return resolve(false);
  //     })
  //   });
  // }
  // getAllLength() {
  //   this.loading = true;
  //   return new Promise((resolve, reject) => {
  //     this.commonService.getAllLength({}).subscribe((res: any) => {
  //       if (res.status == 200 && res.data) {
  //         this.length_data = [];
  //         this.length_data = JSON.parse(JSON.stringify(res.data));

  //       }
  //       this.loading = false;
  //       return resolve(true);
  //     }, (error) => {
  //       this.loading = false;
  //       this.commonHelper.showError(error);
  //       return resolve(false);
  //     })
  //   });
  // }
  // getAllMaterial() {
  //   this.loading = true;
  //   return new Promise((resolve, reject) => {
  //     this.commonService.getAllMaterial({}).subscribe((res: any) => {
  //       if (res.status == 200 && res.data) {
  //         this.material_data = [];
  //         this.material_data = JSON.parse(JSON.stringify(res.data));

  //       }
  //       this.loading = false;
  //       return resolve(true);
  //     }, (error) => {
  //       this.loading = false;
  //       this.commonHelper.showError(error);
  //       return resolve(false);
  //     })
  //   });
  // }



  // onClickAddNewColor(tab) {
  //   this.modalRef = this.modalService.show(AddColorModalComponent, { id: 3, class: 'add-update-import-modal', backdrop: 'static', keyboard: false });
  //   this.modalRef.content.decision = '';
  //   this.modalRef.content.type = 'Color';
  //   var tempSubObj: Subscription = this.modalService.onHide.subscribe(() => {
  //     if (this.modalRef.content.decision == "done") {
  //       this.loading = true;
  //       this.commonService.addColor(this.modalRef.content.dialogResult).subscribe((res: any) => {
  //         this.loading = false;
  //         if (res.status == 200 && res.data) {
  //           this._toastMessageService.alert("success", "Color added successfully.");
  //           let findI = findIndex(this.color_data, v => { return v._id == res.data._id})
  //           if(findI == -1) {
  //             this.color_data = [...this.color_data, { _id: res.data._id, name: res.data.name }];
  //           }
  //           tab.selectedcolor = [...tab.selectedcolor, res.data.name];
  //           tab.errorselectedcolor  = false
  //         }
  //       }, (error) => {
  //         this.loading = false;
  //         this.commonHelper.showError(error);
  //       })

  //       this.loading = false;
  //     }
  //     tempSubObj.unsubscribe();
  //   });

  // }
  generateSlug(event) {
    this.product.slug = event.target.value.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')
  }
  // onClickAddNewThickness(tab) {
  //   this.modalRef = this.modalService.show(AddColorModalComponent, { id: 3, class: 'add-update-import-modal', backdrop: 'static', keyboard: false });
  //   this.modalRef.content.decision = '';
  //   this.modalRef.content.type = 'Thickness';
  //   var tempSubObj: Subscription = this.modalService.onHide.subscribe(() => {
  //     if (this.modalRef.content.decision == "done") {
  //       this.loading = true;
  //       this.commonService.addThickness(this.modalRef.content.dialogResult).subscribe((res: any) => {
  //         this.loading = false;
  //         if (res.status == 200 && res.data) {
  //           this._toastMessageService.alert("success", "Thickness added successfully.");
  //           let findI = findIndex(this.color_data, v => { return v._id == res.data._id})
  //           if(findI == -1) {
  //             this.thickness_data = [...this.thickness_data, { _id: res.data._id, name: res.data.name }];
  //           }
  //           tab.selectedthickness = [...tab.selectedthickness, res.data.name];
  //           tab.errorselectedthickness  = false
  //         }
  //       }, (error) => {
  //         this.loading = false;
  //         this.commonHelper.showError(error);
  //       })

  //       this.loading = false;
  //     }
  //     tempSubObj.unsubscribe();
  //   });

  // }
  // onClickAddNewLength(tab) {
  //   this.modalRef = this.modalService.show(AddColorModalComponent, { id: 3, class: 'add-update-import-modal', backdrop: 'static', keyboard: false });
  //   this.modalRef.content.decision = '';
  //   this.modalRef.content.type = 'Length';
  //   var tempSubObj: Subscription = this.modalService.onHide.subscribe(() => {
  //     if (this.modalRef.content.decision == "done") {
  //       this.loading = true;
  //       this.commonService.addLength(this.modalRef.content.dialogResult).subscribe((res: any) => {
  //         this.loading = false;
  //         if (res.status == 200 && res.data) {
  //           this._toastMessageService.alert("success", "Thickness added successfully.");
  //           let findI = findIndex(this.color_data, v => { return v._id == res.data._id})
  //           if(findI == -1) {
  //             this.length_data = [...this.length_data, { _id: res.data._id, name: res.data.name }];
  //           }

  //           tab.selectedlength = [...tab.selectedlength, res.data.name];
  //           tab.errorselectedlength  = false
  //         }
  //       }, (error) => {
  //         this.loading = false;
  //         this.commonHelper.showError(error);
  //       })

  //       this.loading = false;
  //     }
  //     tempSubObj.unsubscribe();
  //   });

  // }

  // onClickAddNewMaterial(tab) {
  //   this.modalRef = this.modalService.show(AddColorModalComponent, { id: 3, class: 'add-update-import-modal', backdrop: 'static', keyboard: false });
  //   this.modalRef.content.decision = '';
  //   this.modalRef.content.type = 'Material';
  //   var tempSubObj: Subscription = this.modalService.onHide.subscribe(() => {
  //     if (this.modalRef.content.decision == "done") {
  //       this.loading = true;
  //       this.commonService.addMaterial(this.modalRef.content.dialogResult).subscribe((res: any) => {
  //         this.loading = false;
  //         if (res.status == 200 && res.data) {
  //           this._toastMessageService.alert("success", "Thickness added successfully.");
  //           let findI = findIndex(this.color_data, v => { return v._id == res.data._id})
  //           if(findI == -1) {
  //             this.material_data = [...this.material_data, { _id: res.data._id, name: res.data.name }];
  //           }


  //           tab.selectedmaterial = [...tab.selectedmaterial, res.data.name];
  //           tab.errorselectedmaterial  = false
  //         }
  //       }, (error) => {
  //         this.loading = false;
  //         this.commonHelper.showError(error);
  //       })

  //       this.loading = false;
  //     }
  //     tempSubObj.unsubscribe();
  //   });

  // }
  onCLUpload(event) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      this.product.productImageUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(event.target.files[0]));
      this.product.productImageFile = event.target.files[0]
      this.product.newImageUploaded = true;

    }
  }
  // onColorImageUpload(event, i) {
  //   if (event.target.files && event.target.files[0]) {
  //     this.product.colors[i].ImageUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(event.target.files[0]));
  //     this.product.colors[i].ImageFile = event.target.files[0]
  //     this.product.colors[i].errorimage = false;
  //     this.product.colors[i].newImageUploaded = true;
  //   }
  // }
  clearCLFile() {
    this.productImageFile.nativeElement.value = '';
    this.product.productImageUrl = '';
    this.product.productImageFile = null;
    this.product.newImageUploaded = false;
  }
  // clearColorFile(i) {
  //   this.productcolorImageFile.nativeElement.value = '';
  //   this.product.colors[i].ImageUrl = '';
  //   this.product.colors[i].ImageFile = null;
  //   this.product.colors[i].newImageUploaded = false;
  // }
  // addColorDetail() {
  //   let id = "DUMMY" + Math.floor(Math.random() * (9 * (Math.pow(10, 6)))) + (Math.pow(10, 6));
  //   this.product.colors.push({ _id: id, name: "", selectedcolor: [] });
  // }
  // deleteColorDetail(index) {
  //   // this.product.colors.splice(index, 1);
  //   this.product.colors[index].isdelete = 1
  // }
  onClickCancel() {
    this.router.navigate(['/products-options-pages/products']);
  }
  onClickSave() {
    // let error = 0;
    // for (let index in this.product.colors) {
    //   if ((this.type == "add" && !this.product.colors[index].ImageFile) || (!this.product.colors[index].isdelete && this.type == "edit" && ((!this.product.colors[index].newImageUploaded && !this.product.colors[index].image) || (this.product.colors[index].newImageUploaded && !this.product.colors[index].ImageFile)))) {
    //     this.product.colors[index].errorimage = true;

    //     error++;
    //   }
    //   if (!this.product.colors[index].name) {
    //     this.product.colors[index].errorname = true;

    //     error++;
    //   }

    //   if (!this.product.colors[index].selectedcolor || this.product.colors[index].selectedcolor.length == 0) {

    //     this.product.colors[index].errorselectedcolor = true;
    //     error++;
    //   }
    //   if (!this.product.colors[index].selectedthickness || this.product.colors[index].selectedthickness.length == 0) {
    //     this.product.colors[index].errorselectedthickness = true;
    //     error++;
    //   }
    //   if (!this.product.colors[index].selectedlength || this.product.colors[index].selectedlength.length == 0) {
    //     this.product.colors[index].errorselectedlength = true;
    //     error++;
    //   }
    //   if (!this.product.colors[index].selectedmaterial || this.product.colors[index].selectedmaterial.length == 0) {
    //     this.product.colors[index].errorselectedmaterial = true;
    //     error++;
    //   }

    // }

    // if (!error) {
      this.remaining_url = this.already_uploadedurls.filter(fl => { return !fl.isdelete }).map((a) => { return a.baseimage })
      this.uploaded_files = [];

    const data = new FormData();
    this.uploaded_files = [];
    if (this.product.productImageFile) {
      data.append('image', this.product.productImageFile);
      this.uploaded_files.push({ imageactualname: this.product.productImageFile.name, type: "product" })
    }
    // for (let index in this.product.colors) {
    //   if(this.product.colors[index].ImageFile && this.product.colors[index].newImageUploaded  && !this.product.colors[index].isdelete){
    //   data.append('company_logo', this.product.colors[index].ImageFile);
    //   this.product.colors[index].imagename = this.product.colors[index].ImageFile.name
    //   this.files.push({ imageactualname: this.product.colors[index].ImageFile.name, type: "productoption" })
    // }
    // }
    for (let index in this.files) {
      if (this.files[index].file && !this.files[index].isdelete) {
        data.append('image', this.files[index].file);
        this.uploaded_files.push({ imageactualname: this.files[index].file.name, type: "productoption" })
      }
    }
    let params = {
      _id: this.product._id,
      name: this.product.productname,
      slug: this.product.slug,
      newImageUploaded: this.product.newImageUploaded,
      files: this.files,
      collections: this.product.selectedCollection,
      category: this.product.selectedCategory,
      seotitle: this.product.seotitle,
      parentcollection: this.product.parentcollection,
      seodescription: this.product.seodescription,
      videolink: this.product.videolink,
      seokeyword: this.product.seokeyword,
      uploaded_files: this.uploaded_files,
      remaining_url: this.remaining_url
    }
    // colors: this.product.colors
    data.append("body", JSON.stringify(params));

    this.loading = true;
    this.commonService.addProduct(data).subscribe((res: any) => {
      this.loading = false;
      if (res.status == 200 && res.data) {
        this._toastMessageService.alert("success", "Product added successfully.");
        this.router.navigate(['/products-options-pages/products']);
      }
    }, (error) => {
      this.loading = false;
      this.commonHelper.showError(error);
    })

    this.loading = false;
    // } else {
    //   this._toastMessageService.alert("error", "Please add All Data");
    // }
  }
}
