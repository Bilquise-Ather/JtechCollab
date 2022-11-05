import { Component, OnInit, ViewChild } from '@angular/core';
import { CEUService } from 'src/app/services/CEU.service';
import { CommonHelper } from 'src/app/helpers/common.helper';
import { ToastMessageService } from 'src/app/services/toast-message.service';
import { environment } from "src/environments/environment";

@Component({
  selector: 'CEU-seo-management',
  templateUrl: './CEU-seo-management.component.html',
  styleUrls: ['./CEU-seo-management.component.css']
})
export class CEUSeoManagementComponent implements OnInit {
  loading: boolean = false;
  hide: boolean = false;
  commondata: any;
  setting_Obj: any = {};
  data: any;
  editformdata = false;
  base_url = environment.url;

  constructor(private cEUService: CEUService, private commonHelper: CommonHelper,
    private _toastMessageService: ToastMessageService) {
  }

  ngOnInit(): void {
    this.getData();

  }

  getData() {
    return new Promise((resolve, reject) => {
      this.cEUService.getCEUSeo({}).subscribe(
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

  addPrivacyPolicy() {
    let params = {
      seotitle: this.setting_Obj.seotitle,
      seodescription: this.setting_Obj.seodescription,
      seokeyword: this.setting_Obj.seokeyword,
    }
    this.loading = true;
    this.cEUService.addCEUSeo(params).subscribe((res: any) => {
      this.loading = false;
      if (res.status == 200 && res.data) {
        this._toastMessageService.alert("success", "Faqs Seo data updated successfully.");
        this.editformdata = false;
        this.getData();
      }
    }, (error) => {
      this.loading = false;
      this.commonHelper.showError(error);
    })
  }
}




