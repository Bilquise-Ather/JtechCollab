import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonSettingsService } from 'src/app/services/common-settings.service';
import { CommonHelper } from 'src/app/helpers/common.helper';
import { ToastMessageService } from 'src/app/services/toast-message.service';
import { environment } from "src/environments/environment";
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'common-settings-management',
  templateUrl: './common-settings-management.component.html',
  styleUrls: ['./common-settings-management.component.css']
})
export class CommonSettingsManagementComponent implements OnInit {
  loading: boolean = false;
  hide: boolean = false;
  commondata: any;
  setting_Obj: any = {};
  data: any;
  editformdata = false;
  base_url = environment.url;
  newIconUploaded: boolean = false;
  @ViewChild('logoFile') logoFile: any;
  constructor(private commonSettingsService: CommonSettingsService, private commonHelper: CommonHelper,
    private _toastMessageService: ToastMessageService, private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.getData();

  }
  getData() {
    return new Promise((resolve, reject) => {
      this.commonSettingsService.getInitialData().subscribe(
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
  updateCommonSettings() {
    const data = new FormData();
    data.append('logo_icon', this.setting_Obj.logoUrl && !this.setting_Obj.logoFile ? 'current' : this.setting_Obj.logoFile ? this.setting_Obj.logoFile : null
    );
    let params = {
      facebook: this.setting_Obj.facebook,
      linkedin: this.setting_Obj.linkedin,
      instagram: this.setting_Obj.instagram,
      twitter: this.setting_Obj.twitter,
      call: this.setting_Obj.call,
      email: this.setting_Obj.email,
      address: this.setting_Obj.address,
      map: this.setting_Obj.map
    }
    data.append('body', JSON.stringify(params));
    this.loading = true;
    this.commonSettingsService.updateCommonSettings(data).subscribe((res: any) => {
      this.loading = false;
      if (res.status == 200 && res.data) {
        this._toastMessageService.alert("success", "link updated successfully.");
        this.setting_Obj = res.data;
        this.editformdata = false
      }
    }, (error) => {
      this.loading = false;
      this.commonHelper.showError(error);
    })
  }
  clearCLFile() {
    this.logoFile.nativeElement.value = '';
    this.setting_Obj.logoUrl = '';
    this.setting_Obj.logoFile = null;
    this.newIconUploaded = false;
  }

  onCLUpload(event) {
    if (event.target.files && event.target.files[0]) {
      this.newIconUploaded = true;
      this.setting_Obj.logoUrl = this.sanitizer.bypassSecurityTrustUrl(
        URL.createObjectURL(event.target.files[0])
      );
      this.setting_Obj.logoFile = event.target.files[0];
    }
  }
}




