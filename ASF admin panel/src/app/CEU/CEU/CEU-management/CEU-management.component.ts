import { Component, OnInit, ViewChild } from '@angular/core';
import { CEUService } from 'src/app/services/CEU.service';
import { CommonHelper } from 'src/app/helpers/common.helper';
import { ToastMessageService } from 'src/app/services/toast-message.service';
import { environment } from "src/environments/environment";
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'CEU-management',
  templateUrl: './CEU-management.component.html',
  styleUrls: ['./CEU-management.component.css']
})
export class CEUManagementComponent implements OnInit {
  loading: boolean = false;
  hide: boolean = false;
  commondata: any;
  setting_Obj: any = {};
  data: any;
  editformdata = false;
  base_url = environment.url;
  newImageUploaded: boolean = false;
  @ViewChild('sliderImageFile') sliderImageFile: any;
  constructor(private cEUService: CEUService, private commonHelper: CommonHelper,
    private _toastMessageService: ToastMessageService, private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.getData();

  }
  getData() {
    return new Promise((resolve, reject) => {
      this.cEUService.getCEUData().subscribe(
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
  updateCEU() {
    const data = new FormData();
    data.append('slider_image', this.setting_Obj.sliderImageUrl && !this.setting_Obj.sliderImageFile ? 'current' : this.setting_Obj.sliderImageFile ? this.setting_Obj.sliderImageFile : null
    );
    let params = {
      text: this.setting_Obj.text,
    }
    data.append('body', JSON.stringify(params));
    this.loading = true;
    this.cEUService.updateCEU(data).subscribe((res: any) => {
      this.loading = false;
      if (res.status == 200 && res.data) {
        this._toastMessageService.alert("success", "CEU updated successfully.");
        this.setting_Obj = res.data;
        this.editformdata = false
      }
    }, (error) => {
      this.loading = false;
      this.commonHelper.showError(error);
    })
  }
  clearCLFile() {
    this.sliderImageFile.nativeElement.value = '';
    this.setting_Obj.sliderImageUrl = '';
    this.setting_Obj.sliderImageFile = null;
    this.newImageUploaded = false;
  }

  onCLUpload(event) {
    if (event.target.files && event.target.files[0]) {
      this.newImageUploaded = true;
      this.setting_Obj.sliderImageUrl = this.sanitizer.bypassSecurityTrustUrl(
        URL.createObjectURL(event.target.files[0])
      );
      this.setting_Obj.sliderImageFile = event.target.files[0];
    }
  }
}




