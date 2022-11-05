import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from "src/environments/environment";
import { DomSanitizer } from '@angular/platform-browser';
import { ResourceService } from 'src/app/services/resources.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { CommonHelper } from 'src/app/helpers/common.helper';
import { ToastMessageService } from 'src/app/services/toast-message.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'add-resource',
  templateUrl: './add-resource.template.html',
  styleUrls: ['./add-resource.component.css']
})

export class AddResourceComponent implements OnInit {
  resource_Obj: any = {};
  base_url = environment.url;
  loading: boolean = false;
  files = []
  decision: string = '';
  dialogType: string = "";
  dialogResult: any;

  type = "add";
  @ViewChild('resourceImageFile') resourceImageFile: any;
  @ViewChild('resourceLogoImageFile') resourceLogoImageFile: any;
  public modalRef: BsModalRef
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private resourceService: ResourceService, private _toastMessageService: ToastMessageService, private sanitizer: DomSanitizer, private commonHelper: CommonHelper) {
  }

  ngOnInit() {
    this.resource_Obj._id = this.activatedRoute.snapshot.paramMap.get('id') ? this.activatedRoute.snapshot.paramMap.get('id') : "";

    if (this.resource_Obj._id) {
      this.type = 'edit';
      this.getResourceData();
    }
  }
  getResourceData() {
    this.loading = true;
    return new Promise((resolve, reject) => {
      this.resourceService.getResourceToEdit({ _id: this.resource_Obj._id }).subscribe((res: any) => {
        if (res.status == 200 && res.data) {
          this.resource_Obj = res.data;
          this.resource_Obj.resourceName = res.data.resourcename;
          this.resource_Obj.resourceContent = res.data.resourcecontent;
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

  onCLUpload1(event) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      this.resource_Obj.resourceImageUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(event.target.files[0]));
      this.resource_Obj.resourceImageFile = event.target.files[0]
      this.resource_Obj.newImageUploaded = true;
    }
  }
  clearCLFile1() {
    this.resourceImageFile.nativeElement.value = '';
    this.resource_Obj.resourceImageUrl = '';
    this.resource_Obj.resourceImageFile = null;
    this.resource_Obj.newImageUploaded = false;
  }

  onCLUpload2(event) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      this.resource_Obj.resourceLogoUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(event.target.files[0]));
      this.resource_Obj.resourceLogoImageFile = event.target.files[0]
      this.resource_Obj.newImageUploaded = true;

    }
  }
  clearCLFile2() {
    this.resourceLogoImageFile.nativeElement.value = '';
    this.resource_Obj.resourceLogoUrl = '';
    this.resource_Obj.resourceLogoImageFile = null;
    this.resource_Obj.newImageUploaded = false;
  }

  onClickCancel() {
    this.router.navigate(['/resource-page/resource']);
  }
  onClickSave() {

    const data = new FormData();
    this.files = [];
    if (this.resource_Obj.resourceImageFile) {
      data.append('resource_image', this.resource_Obj.resourceImageFile);
      this.files.push({ imageactualname: this.resource_Obj.resourceImageFile.name, type: "resource_image" })
    }
    if (this.resource_Obj.resourceLogoImageFile) {
      data.append('resource_logo', this.resource_Obj.resourceLogoImageFile);
      this.files.push({ imageactualname: this.resource_Obj.resourceLogoImageFile.name, type: "resource_logo" })
    }

    let params = {
      _id: this.resource_Obj._id,
      resourceName: this.resource_Obj.resourcename,
      resourceContent: this.resource_Obj.resourceContent,
      newImageUploaded: this.resource_Obj.newImageUploaded,
      files: this.files,
    }
    data.append("body", JSON.stringify(params));

    this.loading = true;
    this.resourceService.addResource(data).subscribe((res: any) => {
      this.loading = false;
      if (res.status == 200 && res.data) {
        this._toastMessageService.alert("success", "Resource added successfully.");
        this.router.navigate(['/resource-page/resource']);
      }
    }, (error) => {
      this.loading = false;
      this.commonHelper.showError(error);
    })
    this.loading = false;
  }
}
