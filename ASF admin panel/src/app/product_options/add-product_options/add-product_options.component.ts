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
  selector: 'add-product_options',
  templateUrl: './add-product_options.template.html',
  styleUrls: ['./add-product_options.component.css']
})

export class AddProductOptionsComponent implements OnInit {
  product: any = { selectedsize: [], selectedcolor: [], selectedmaterial: [], selectedthickness: [], selectedlength: [], selectedwearlayer: [], selectedpad: [], selectedcore: [] };
  base_url = environment.url;
  urls = [];
  already_uploadedurls = [];
  loading: boolean = false;
  collection_data = []
  category_data = []
  main_product_list = []
  size_data = []
  color_data = []
  thickness_data = []
  length_data = []
  material_data = []
  wear_layer_data = []
  pad_data = []
  core_data = []
  installatin_data = [{ _id: "Click", name: "Click" }, { _id: "Glue", name: "Glue" }];
  remaining_url = []
  files = []
  uploaded_files = [];
  type = "add";
  imgclr = false;
  err=false;
  @ViewChild('productImageFile') productImageFile: any;
  @ViewChild('productVisualiserImageFile') productVisualiserImageFile: any;

  @ViewChild('installationFile') installationFile: any;
  @ViewChild('warrantyFile') warrantyFile: any;
  @ViewChild('maintenanceFile') maintenanceFile: any;
  @ViewChild('productcolorImageFile') productcolorImageFile: any;
  public modalRef: BsModalRef;
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private productOptionsService: ProductOptionsService, private _toastMessageService: ToastMessageService, private modalService: BsModalService, private sanitizer: DomSanitizer, private collectionService: CollectionService, private commonHelper: CommonHelper, private commonService: CommonService) {
  }

  ngOnInit() {
    this.getAllProductListForSubProduct()
    this.product._id = this.activatedRoute.snapshot.paramMap.get('id') ? this.activatedRoute.snapshot.paramMap.get('id') : "";
    if (this.product._id) {
      this.type = 'edit';
      this.getProductData();
    }
    this.getAllCollections();
    this.getAllSize();
    this.getAllColor()
    this.getAllThickness()
    this.getAllLength()
    this.getAllMaterial()
    this.getAllWearLayer()
    this.getAllPad()
    this.getAllCore()
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
      this.commonService.getAllProductListForSubProduct({}).subscribe((res: any) => {
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
  getProductData() {
    this.loading = true;
    return new Promise((resolve, reject) => {
      this.commonService.getSubProduct({ _id: this.product._id }).subscribe((res: any) => {
        if (res.status == 200 && res.data) {
          this.product = res.data;
          this.product.mainproduct = res.data.productid;
          this.product.subproductname = res.data.name;
          this.already_uploadedurls = res.data.option_images;
          this.product.selectedCollection = res.data.collections;
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
  getAllColor() {
    this.loading = true;
    return new Promise((resolve, reject) => {
      this.commonService.getAllColors({}).subscribe((res: any) => {
        if (res.status == 200 && res.data) {
          this.color_data = [];
          this.color_data = JSON.parse(JSON.stringify(res.data));

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
  getAllThickness() {
    this.loading = true;
    return new Promise((resolve, reject) => {
      this.commonService.getAllThickness({}).subscribe((res: any) => {
        if (res.status == 200 && res.data) {
          this.thickness_data = [];
          this.thickness_data = JSON.parse(JSON.stringify(res.data));
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
  getAllLength() {
    this.loading = true;
    return new Promise((resolve, reject) => {
      this.commonService.getAllLength({}).subscribe((res: any) => {
        if (res.status == 200 && res.data) {
          this.length_data = [];
          this.length_data = JSON.parse(JSON.stringify(res.data));

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
  getAllMaterial() {
    this.loading = true;
    return new Promise((resolve, reject) => {
      this.commonService.getAllMaterial({}).subscribe((res: any) => {
        if (res.status == 200 && res.data) {
          this.material_data = [];
          this.material_data = JSON.parse(JSON.stringify(res.data));

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
  getAllSize() {
    this.loading = true;
    return new Promise((resolve, reject) => {
      let params = {
        page: 1,
        limit: 100
      };
      this.commonService.getAllProductSize(params).subscribe((res: any) => {
        if (res.status == 200 && res.data) {
          this.size_data = [];
          this.size_data = JSON.parse(JSON.stringify(res.data));
          this.size_data = this.size_data.map((a) => { return { _id: a._id, name: a.name } })
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
  getAllWearLayer() {
    this.loading = true;
    return new Promise((resolve, reject) => {
      this.commonService.getAllWearLayer({}).subscribe((res: any) => {
        if (res.status == 200 && res.data) {
          this.wear_layer_data = [];
          this.wear_layer_data = JSON.parse(JSON.stringify(res.data));

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
  getAllPad() {
    this.loading = true;
    return new Promise((resolve, reject) => {
      this.commonService.getAllPad({}).subscribe((res: any) => {
        if (res.status == 200 && res.data) {
          this.pad_data = [];
          this.pad_data = JSON.parse(JSON.stringify(res.data));

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
  getAllCore() {
    this.loading = true;
    return new Promise((resolve, reject) => {
      this.commonService.getAllCore({}).subscribe((res: any) => {
        if (res.status == 200 && res.data) {
          this.core_data = [];
          this.core_data = JSON.parse(JSON.stringify(res.data));

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
  onClickAddNewSize() {
    this.modalRef = this.modalService.show(AddColorModalComponent, { id: 3, class: 'add-update-import-modal', backdrop: 'static', keyboard: false });
    this.modalRef.content.decision = '';
    this.modalRef.content.type = 'Size';
    var tempSubObj: Subscription = this.modalService.onHide.subscribe(() => {
      if (this.modalRef.content.decision == "done") {
        this.loading = true;
        this.commonService.addSize(this.modalRef.content.dialogResult).subscribe((res: any) => {
          this.loading = false;
          if (res.status == 200 && res.data) {
            this._toastMessageService.alert("success", "Size added successfully.");
            let findI = findIndex(this.size_data, v => { return v._id == res.data._id })
            if (findI == -1) {
              this.size_data = [...this.size_data, { _id: res.data._id, name: res.data.name }];
            }
            this.product.selectedsize = [...this.product.selectedsize, res.data.name];

          }
        }, (error) => {
          this.loading = false;
          this.commonHelper.showError(error);
        })

        this.loading = false;
      }
      tempSubObj.unsubscribe();
    });
  }
  onClickAddNewColor() {
    this.modalRef = this.modalService.show(AddColorModalComponent, { id: 3, class: 'add-update-import-modal', backdrop: 'static', keyboard: false });
    this.modalRef.content.decision = '';
    this.modalRef.content.type = 'Color';
    var tempSubObj: Subscription = this.modalService.onHide.subscribe(() => {
      if (this.modalRef.content.decision == "done") {
        this.loading = true;
        this.commonService.addColor(this.modalRef.content.dialogResult).subscribe((res: any) => {
          this.loading = false;
          if (res.status == 200 && res.data) {
            this._toastMessageService.alert("success", "Color added successfully.");
            let findI = findIndex(this.color_data, v => { return v._id == res.data._id })
            if (findI == -1) {
              this.color_data = [...this.color_data, { _id: res.data._id, name: res.data.name }];
            }
            this.product.selectedcolor = [...this.product.selectedcolor, res.data.name];

          }
        }, (error) => {
          this.loading = false;
          this.commonHelper.showError(error);
        })

        this.loading = false;
      }
      tempSubObj.unsubscribe();
    });

  }

  onClickAddNewThickness() {
    this.modalRef = this.modalService.show(AddColorModalComponent, { id: 3, class: 'add-update-import-modal', backdrop: 'static', keyboard: false });
    this.modalRef.content.decision = '';
    this.modalRef.content.type = 'Thickness';
    var tempSubObj: Subscription = this.modalService.onHide.subscribe(() => {
      if (this.modalRef.content.decision == "done") {
        this.loading = true;
        this.commonService.addThickness(this.modalRef.content.dialogResult).subscribe((res: any) => {
          this.loading = false;
          if (res.status == 200 && res.data) {
            this._toastMessageService.alert("success", "Thickness added successfully.");
            let findI = findIndex(this.thickness_data, v => { return v._id == res.data._id })
            if (findI == -1) {
              this.thickness_data = [...this.thickness_data, { _id: res.data._id, name: res.data.name }];
            }
            this.product.selectedthickness = [...this.product.selectedthickness, res.data.name];

          }
        }, (error) => {
          this.loading = false;
          this.commonHelper.showError(error);
        })

        this.loading = false;
      }
      tempSubObj.unsubscribe();
    });

  }

  onClickAddNewWearLayer() {
    this.modalRef = this.modalService.show(AddColorModalComponent, { id: 3, class: 'add-update-import-modal', backdrop: 'static', keyboard: false });
    this.modalRef.content.decision = '';
    this.modalRef.content.type = 'Wear Layer';
    var tempSubObj: Subscription = this.modalService.onHide.subscribe(() => {
      if (this.modalRef.content.decision == "done") {
        this.loading = true;
        this.commonService.addWearLayer(this.modalRef.content.dialogResult).subscribe((res: any) => {
          this.loading = false;
          if (res.status == 200 && res.data) {
            this._toastMessageService.alert("success", "Wear Layer added successfully.");
            let findI = findIndex(this.wear_layer_data, v => { return v._id == res.data._id })
            if (findI == -1) {
              this.wear_layer_data = [...this.wear_layer_data, { _id: res.data._id, name: res.data.name }];
            }

            this.product.selectedwearlayer = [...this.product.selectedwearlayer, res.data.name];
          }
        }, (error) => {
          this.loading = false;
          this.commonHelper.showError(error);
        })

        this.loading = false;
      }
      tempSubObj.unsubscribe();
    });

  }

  onClickAddNewPad() {
    this.modalRef = this.modalService.show(AddColorModalComponent, { id: 3, class: 'add-update-import-modal', backdrop: 'static', keyboard: false });
    this.modalRef.content.decision = '';
    this.modalRef.content.type = 'Pad';
    var tempSubObj: Subscription = this.modalService.onHide.subscribe(() => {
      if (this.modalRef.content.decision == "done") {
        this.loading = true;
        this.commonService.addPad(this.modalRef.content.dialogResult).subscribe((res: any) => {
          this.loading = false;
          if (res.status == 200 && res.data) {
            this._toastMessageService.alert("success", "Pad added successfully.");
            let findI = findIndex(this.pad_data, v => { return v._id == res.data._id })
            if (findI == -1) {
              this.pad_data = [...this.pad_data, { _id: res.data._id, name: res.data.name }];
            }

            this.product.selectedpad = [...this.product.selectedpad, res.data.name];
          }
        }, (error) => {
          this.loading = false;
          this.commonHelper.showError(error);
        })

        this.loading = false;
      }
      tempSubObj.unsubscribe();
    });

  }

  onClickAddNewCore() {
    this.modalRef = this.modalService.show(AddColorModalComponent, { id: 3, class: 'add-update-import-modal', backdrop: 'static', keyboard: false });
    this.modalRef.content.decision = '';
    this.modalRef.content.type = 'Core';
    var tempSubObj: Subscription = this.modalService.onHide.subscribe(() => {
      if (this.modalRef.content.decision == "done") {
        this.loading = true;
        this.commonService.addCore(this.modalRef.content.dialogResult).subscribe((res: any) => {
          this.loading = false;
          if (res.status == 200 && res.data) {
            this._toastMessageService.alert("success", "Core added successfully.");
            let findI = findIndex(this.core_data, v => { return v._id == res.data._id })
            if (findI == -1) {
              this.core_data = [...this.core_data, { _id: res.data._id, name: res.data.name }];
            }

            this.product.selectedcore = [...this.product.selectedcore, res.data.name];
          }
        }, (error) => {
          this.loading = false;
          this.commonHelper.showError(error);
        })

        this.loading = false;
      }
      tempSubObj.unsubscribe();
    });

  }

  onClickAddNewLength() {
    this.modalRef = this.modalService.show(AddColorModalComponent, { id: 3, class: 'add-update-import-modal', backdrop: 'static', keyboard: false });
    this.modalRef.content.decision = '';
    this.modalRef.content.type = 'Length';
    var tempSubObj: Subscription = this.modalService.onHide.subscribe(() => {
      if (this.modalRef.content.decision == "done") {
        this.loading = true;
        this.commonService.addLength(this.modalRef.content.dialogResult).subscribe((res: any) => {
          this.loading = false;
          if (res.status == 200 && res.data) {
            this._toastMessageService.alert("success", "Thickness added successfully.");
            let findI = findIndex(this.length_data, v => { return v._id == res.data._id })
            if (findI == -1) {
              this.length_data = [...this.length_data, { _id: res.data._id, name: res.data.name }];
            }

            this.product.selectedlength = [...this.product.selectedlength, res.data.name];
          }
        }, (error) => {
          this.loading = false;
          this.commonHelper.showError(error);
        })

        this.loading = false;
      }
      tempSubObj.unsubscribe();
    });

  }

  onClickAddNewMaterial() {
    this.modalRef = this.modalService.show(AddColorModalComponent, { id: 3, class: 'add-update-import-modal', backdrop: 'static', keyboard: false });
    this.modalRef.content.decision = '';
    this.modalRef.content.type = 'Material';
    var tempSubObj: Subscription = this.modalService.onHide.subscribe(() => {
      if (this.modalRef.content.decision == "done") {
        this.loading = true;
        this.commonService.addMaterial(this.modalRef.content.dialogResult).subscribe((res: any) => {
          this.loading = false;
          if (res.status == 200 && res.data) {
            this._toastMessageService.alert("success", "Material added successfully.");
            let findI = findIndex(this.material_data, v => { return v._id == res.data._id })
            if (findI == -1) {
              this.material_data = [...this.material_data, { _id: res.data._id, name: res.data.name }];
            }


            this.product.selectedmaterial = [...this.product.selectedmaterial, res.data.name];

          }
        }, (error) => {
          this.loading = false;
          this.commonHelper.showError(error);
        })

        this.loading = false;
      }
      tempSubObj.unsubscribe();
    });

  }
  onCLUpload(event) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      this.product.productImageUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(event.target.files[0]));
      this.product.productImageFile = event.target.files[0]
      this.product.newImageUploaded = true;
    }
  }
  onVisualiserCLUpload(event) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      this.product.productVisualiserImageUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(event.target.files[0]));
      this.product.productVisualiserImageFile = event.target.files[0]
      this.product.newVisualiserImageUploaded = true;
    }
  }

  clearCLFile() {
    this.productImageFile.nativeElement.value = '';
    this.product.productImageUrl = '';
    this.product.productImageFile = null;
    this.product.newImageUploaded = false;
  }
  clearVisualiserCLFile() {
    this.productVisualiserImageFile.nativeElement.value = '';
    this.product.productVisualiserImageUrl = '';
    this.product.productVisualiserImageFile = null;
    this.product.newVisualiserImageUploaded = false;
  }

  clearInstallationFile() {
    this.installationFile.nativeElement.value = '';
    this.product.installationFileUrl = '';
    this.product.installationFile = null;
    this.product.installationFileUploaded = false;
  }

  deleteInstallationFile() {
    this.product.deleteInstallationFile = true;
    this.installationFile.installationimage = "";
  }
  deleteWarrantyFile() {
    this.product.deleteWarrantyFile = true;
    this.installationFile.warrantyimage = "";
  }
  deleteMaintenancenFile() {
    this.product.deleteMaintenanceFile = true;
    this.installationFile.maintenanceimage = "";
  }

  clearWarrantyFile() {
    this.warrantyFile.nativeElement.value = '';
    this.product.warrantyFileUrl = '';
    this.product.warrantyFile = null;
    this.product.warrantyFileUploaded = false;
  }
  clearMaintenanceFile() {
    this.maintenanceFile.nativeElement.value = '';
    this.product.maintenanceFileUrl = '';
    this.product.maintenanceFile = null;
    this.product.maintenanceFileUploaded = false;
  }
  onInstallationUpload(event) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      this.product.installationFileUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(event.target.files[0]));
      this.product.installationFile = event.target.files[0]
      this.product.installationFileUploaded = true;
    }
  }
  onWarrantyUpload(event) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      this.product.warrantyFileUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(event.target.files[0]));
      this.product.warrantyFile = event.target.files[0]
      this.product.warrantyFileUploaded = true;
    }
  }
  onMaintenanceUpload(event) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      this.product.maintenanceFileUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(event.target.files[0]));
      this.product.maintenanceFile = event.target.files[0]
      this.product.maintenanceFileUploaded = true;
    }
  }
  onClickCancel() {
    this.router.navigate(['/products-options-pages/product_options']);
  }
  onClickSave() {
    this.remaining_url = this.already_uploadedurls.filter(fl => { return !fl.isdelete }).map((a) => { return a.baseimage })
    const data = new FormData();
    this.uploaded_files = [];

    if (this.product.productImageFile) {
      data.append('image', this.product.productImageFile);
      this.uploaded_files.push({ imageactualname: this.product.productImageFile.name, type: "product" })
    }
    if (this.product.productVisualiserImageFile) {
      data.append('image', this.product.productVisualiserImageFile);
      this.uploaded_files.push({ imageactualname: this.product.productVisualiserImageFile.name, type: "productvisualiser" })
    }

    if (this.product.installationFile) {
      data.append('image', this.product.installationFile);
      this.uploaded_files.push({ imageactualname: this.product.installationFile.name, type: "installationimage" })
    }
    if (this.product.warrantyFile) {
      data.append('image', this.product.warrantyFile);
      this.uploaded_files.push({ imageactualname: this.product.warrantyFile.name, type: "warrantyimage" })
    }
    if (this.product.maintenanceFile) {
      data.append('image', this.product.maintenanceFile);
      this.uploaded_files.push({ imageactualname: this.product.maintenanceFile.name, type: "maintenanaceimage" })
    }


    for (let index in this.files) {
      if (this.files[index].file && !this.files[index].isdelete) {
        data.append('image', this.files[index].file);
        this.uploaded_files.push({ imageactualname: this.files[index].file.name, type: "productoption" })
      }
    }
    let params = {
      _id: this.product._id,
      parentproduct: this.product.mainproduct,
      name: this.product.subproductname,
      slug: this.product.slug,
      text: this.product.text,
      warranty: this.product.warranty,
      installation: this.product.installation,
      installationdelete : this.product.deleteInstallationFile ? this.product.deleteInstallationFile : false ,
      warrantydelete : this.product.deleteWarrantyFile ? this.product.deleteWarrantyFile : false ,
      maintenanacedelete : this.product.deleteMaintenanceFile ? this.product.deleteMaintenanceFile : false ,
      maintenanace: this.product.maintenanace,
      embossedinregister: this.product.embossedinregister,
      packaging: this.product.packaging,
      itemno: this.product.itemno,
      seotitle: this.product.seotitle,
      seodescription: this.product.seodescription,
      seokeyword: this.product.seokeyword,
      returntocollectionlink: this.product.returntocollectionlink,
      selectedsize: this.product.selectedsize,
      selectedcolor: this.product.selectedcolor,
      selectedmaterial: this.product.selectedmaterial,
      selectedthickness: this.product.selectedthickness,
      selectedlength: this.product.selectedlength,
      selectedwearlayer: this.product.selectedwearlayer,
      selectedpad: this.product.selectedpad,
      selectedcore: this.product.selectedcore,
      uploaded_files: this.uploaded_files,
      remaining_url: this.remaining_url
    }
    data.append("body", JSON.stringify(params));
    this.loading = true;
    this.commonService.addSubProduct(data).subscribe((res: any) => {
      this.loading = false;

      if (res.status == 200 && res.data) {
        this._toastMessageService.alert("success", "Sub-Product added successfully.");
        this.router.navigate(['/products-options-pages/product_options']);
      }
    }, (error) => {
      this.loading = false;
      this.commonHelper.showError(error);
    })

    this.loading = false;

  }
}
