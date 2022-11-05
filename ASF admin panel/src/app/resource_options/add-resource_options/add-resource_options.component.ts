import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from "src/environments/environment";
import { DomSanitizer } from '@angular/platform-browser';
import { CollectionService } from 'src/app/services/Collection.service';
import { ResourceOptionsService } from 'src/app/services/resource_options.service';
import { CommonService } from 'src/app/services/common.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CommonHelper } from 'src/app/helpers/common.helper';
import { ToastMessageService } from 'src/app/services/toast-message.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'add-resource_options',
  templateUrl: './add-resource_options.template.html',
  styleUrls: ['./add-resource_options.component.css']
})

export class AddResourceOptionsComponent implements OnInit {
  resource_Options: any = {};
  product: any = { selectedsize: [], selectedcolor: [], selectedmaterial: [], selectedthickness: [], selectedlength: [], selectedwearlayer: [], selectedpad: [], selectedcore: [] };
  base_url = environment.url;
  loading: boolean = false;
  main_product_list = []
  files = []
  type = "add";
  newImageUploaded: boolean = false;
  @ViewChild('pdfFile') pdfFile: any;
  public modalRef: BsModalRef;
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private resourceOptionsService: ResourceOptionsService, private _toastMessageService: ToastMessageService, private modalService: BsModalService, private sanitizer: DomSanitizer, private collectionService: CollectionService, private commonHelper: CommonHelper, private commonService: CommonService) {
  }

  ngOnInit() {
    this.resource_Options._id = this.activatedRoute.snapshot.paramMap.get('id') ? this.activatedRoute.snapshot.paramMap.get('id') : "";
    if (this.resource_Options._id) {
      this.type = 'edit';
      this.getResourceData();
    }
    this.getAllResourceListForResourceOptions();
  }
  getAllResourceListForResourceOptions() {
    this.loading = true;
    return new Promise((resolve, reject) => {
      this.resourceOptionsService.getAllResourceListForResourceOptions({}).subscribe((res: any) => {
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
  getResourceData() {
    this.loading = true;
    return new Promise((resolve, reject) => {
      this.resourceOptionsService.getResourceOptionsToEdit({ _id: this.resource_Options._id }).subscribe((res: any) => {
        if (res.status == 200 && res.data) {
          this.resource_Options.resourcename = res.data.resourceid;
          this.resource_Options.title = res.data.title;
          this.resource_Options.pdfactualname = res.data.pdfactualname;
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
  onClickCancel() {
    this.router.navigate(['/resource-page/resource_options']);
  }
  onClickSave() {
    const data = new FormData();
    if (this.resource_Options.pdfFile) {
      data.append('pdfFile', this.resource_Options.pdfFile);
    }
    let params = {
      _id: this.resource_Options._id,
      resourcename: this.resource_Options.resourcename,
      newImageUploaded: this.resource_Options.newImageUploaded,
      title: this.resource_Options.title,
    }
    data.append("body", JSON.stringify(params));
    this.loading = true;
    this.resourceOptionsService.addResourceOption(data).subscribe((res: any) => {
      this.loading = false;
      if (res.status == 200 && res.data) {
        this._toastMessageService.alert("success", "Resource option added successfully.");
        this.router.navigate(['/resource-page/resource_options']);
      }
    }, (error) => {
      this.loading = false;
      this.commonHelper.showError(error);
    })

    this.loading = false;

  }

  onCLUpload(event) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      this.resource_Options.pdfUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(event.target.files[0]))
      this.resource_Options.pdfFile = event.target.files[0]
      this.resource_Options.newImageUploaded = true;
    }
  }
  clearCLFile() {
    this.pdfFile.nativeElement.value = '';
    this.resource_Options.pdfUrl = '';
    this.resource_Options.pdfFile = null;
    this.resource_Options.newImageUploaded = false;
  }
}
