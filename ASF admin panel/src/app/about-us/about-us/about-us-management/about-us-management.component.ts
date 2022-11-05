import { Component, OnInit, ViewChild } from '@angular/core';
import { AboutUsService } from 'src/app/services/about-us.service';
import { CommonHelper } from 'src/app/helpers/common.helper';
import { ToastMessageService } from 'src/app/services/toast-message.service';
import { environment } from "src/environments/environment";
import { DomSanitizer } from '@angular/platform-browser';
import { findIndex } from 'lodash-es';

@Component({
  selector: 'about-us-management',
  templateUrl: './about-us-management.component.html',
  styleUrls: ['./about-us-management.component.css']
})
export class AboutUsManagementComponent implements OnInit {
  loading: boolean = false;
  hide: boolean = false;
  commondata: any;
  setting_Obj: any = {};
  data: any;
  editformdata = false;
  base_url = environment.url;
  files = [];
  uploaded_files = [];
  newImage1Uploaded: boolean = false;
  newImage2Uploaded: boolean = false;
  @ViewChild('bannerimageFile') bannerimageFile: any;
  @ViewChild('introimageFile') introimageFile: any;
  @ViewChild('image2') image2: any;
  constructor(private aboutUsService: AboutUsService, private commonHelper: CommonHelper,
    private _toastMessageService: ToastMessageService, private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.getData();

  }

  onCLUpload(event) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      this.setting_Obj.bannerimageUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(event.target.files[0]));
      this.setting_Obj.bannerimageFile = event.target.files[0]
      this.newImage1Uploaded = true;
    }
  }

  clearCLFile() {
    this.bannerimageFile.nativeElement.value = '';
    this.setting_Obj.bannerimageUrl = '';
    this.setting_Obj.bannerimageFile = null;
    this.newImage1Uploaded = false;
  }

  onCLUploadIntro(event) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      this.setting_Obj.introimageUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(event.target.files[0]));
      this.setting_Obj.introimageFile = event.target.files[0]
      this.newImage2Uploaded = true;
    }
  }

  clearCLFileIntro() {
    this.bannerimageFile.nativeElement.value = '';
    this.setting_Obj.introimageUrl = '';
    this.setting_Obj.introimageFile = null;
    this.newImage2Uploaded = false;
  }


  getData() {
    return new Promise((resolve, reject) => {
      this.aboutUsService.getAboutUs().subscribe(
        (res: any) => {
          if (res.status == 200 && res.data) {
            this.setting_Obj = JSON.parse(JSON.stringify(res.data));
          }
          else {
            this.editformdata = true;
          }
          return resolve(true);
        },
        (error) => {
          this.commonHelper.showError(error);
          return resolve(false);
        }
      );
    });
  }
  addAboutUs() {

    const data = new FormData();
    this.uploaded_files = [];
    if (this.newImage1Uploaded) {
      data.append('image', this.setting_Obj.bannerimageFile);
      this.uploaded_files.push({ imageactualname: this.setting_Obj.bannerimageFile.name, type: "bannerimage" })
    }

    if (this.newImage2Uploaded) {
      data.append('image', this.setting_Obj.introimageFile);
      this.uploaded_files.push({ imageactualname: this.setting_Obj.introimageFile.name, type: "introimage" })
    }

    let params = {
      uploaded_files: this.uploaded_files,
      pagetitle: this.setting_Obj.pagetitle,
      subtitle: this.setting_Obj.subtitle,
      content: this.setting_Obj.content,
      introtitle: this.setting_Obj.introtitle,
      introcontent: this.setting_Obj.introcontent,
      countericon1: this.setting_Obj.countericon1,
      countertitle1: this.setting_Obj.countertitle1,
      counternumber1: this.setting_Obj.counternumber1 ? this.setting_Obj.counternumber1 : 0,
      countericon2: this.setting_Obj.countericon2,
      countertitle2: this.setting_Obj.countertitle2,
      counternumber2: this.setting_Obj.counternumber2 ? this.setting_Obj.counternumber2 : 0,
      countericon3: this.setting_Obj.countericon3,
      countertitle3: this.setting_Obj.countertitle3,
      counternumber3: this.setting_Obj.counternumber3 ? this.setting_Obj.counternumber3 : 0,
      countericon4: this.setting_Obj.countericon4,
      countertitle4: this.setting_Obj.countertitle4,
      counternumber4: this.setting_Obj.counternumber4 ? this.setting_Obj.counternumber4 : 0,
      seotitle: this.setting_Obj.seotitle,
      seodescription: this.setting_Obj.seodescription,
      seokeyword: this.setting_Obj.seokeyword
    }
    data.append('body', JSON.stringify(params));
    this.loading = true;
    this.aboutUsService.addAboutUs(data).subscribe((res: any) => {
      this.loading = false;
      if (res.status == 200 && res.data) {
        this._toastMessageService.alert("success", "about us data updated successfully.");
        this.editformdata = false;
        this.getData();
      }
    }, (error) => {
      this.loading = false;
      this.commonHelper.showError(error);
    })
  }
}




