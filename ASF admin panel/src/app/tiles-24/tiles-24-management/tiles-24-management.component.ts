import { Component, OnInit, ViewChild } from '@angular/core';
import { TilesService } from 'src/app/services/tiles.service';
import { CommonHelper } from 'src/app/helpers/common.helper';
import { ToastMessageService } from 'src/app/services/toast-message.service';
import { environment } from "src/environments/environment";
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'tiles-24',
  templateUrl: './tiles-24-management.component.html',
  styleUrls: ['./tiles-24-management.component.css']
})
export class Tiles24ManagementComponent implements OnInit {
  loading: boolean = false;
  hide: boolean = false;
  commondata: any;
  setting_Obj: any = {};
  newImage1Uploaded: boolean = false;
  data: any;
  editformdata = false;
  base_url = environment.url;
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
  uploaded_files = [];
  @ViewChild('bannerimageFile') bannerimageFile: any;
  @ViewChild('introimageFile') introimageFile: any;
  @ViewChild('image2') image2: any;
  constructor(private tilesService: TilesService, private commonHelper: CommonHelper,
    private _toastMessageService: ToastMessageService, private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.getData();

  }

  getData() {
    return new Promise((resolve, reject) => {
      this.tilesService.getTiles24({}).subscribe(
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
  clearCLFile() {
    this.bannerimageFile.nativeElement.value = '';
    this.setting_Obj.bannerimageUrl = '';
    this.setting_Obj.bannerimageFile = null;
    this.newImage1Uploaded = false;
  }

  onCLUpload(event) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      this.setting_Obj.bannerimageUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(event.target.files[0]));
      this.setting_Obj.bannerimageFile = event.target.files[0]
      this.newImage1Uploaded = true;
    }
  }
  addTiles() {
    const data = new FormData();
    this.uploaded_files = [];
    if (this.newImage1Uploaded) {
      data.append('image', this.setting_Obj.bannerimageFile);
      this.uploaded_files.push({ imageactualname: this.setting_Obj.bannerimageFile.name, type: "bannerimage" })
    }
    let params = {
      uploaded_files: this.uploaded_files,
      pagetitle: this.setting_Obj.pagetitle,
      seotitle: this.setting_Obj.seotitle,
      seodescription: this.setting_Obj.seodescription,
      seokeyword: this.setting_Obj.seokeyword,

    }
    data.append('body', JSON.stringify(params));
    this.loading = true;
    this.tilesService.addTiles24(data).subscribe((res: any) => {
      this.loading = false;
      if (res.status == 200 && res.data) {
        this.newImage1Uploaded = false;
        this._toastMessageService.alert("success", "Data updated successfully.");
        this.editformdata = false;
        this.getData();
      }
    }, (error) => {
      this.loading = false;
      this.commonHelper.showError(error);
     })
  }
}




